<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="120">
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-weight-bold">
            <q-avatar>
              <q-icon name="cloud" size="md"></q-icon>
            </q-avatar>
            Drive v 1.0
          </div>
        </q-toolbar-title>
        <div class="text-weight-medium">
          {{sessionDriveUser.username}}
        </div>
        &nbsp;
        <q-btn dense flat round>
          <q-avatar size="md">
            <q-icon v-if="sessionDriveUser.headImg != null || sessionDriveUser.headImg !== '' || sessionDriveUser.headImg !== undefined" name="person"></q-icon>
            <img v-else :src="sessionDriveUser.headImg">
          </q-avatar>
          <q-menu fit>
            <q-list>
              <q-item clickable style="min-width: 100px">
                <q-item-section>个人中心</q-item-section>
              </q-item>
              <q-item clickable style="min-width: 100px">
                <q-item-section>修改密码</q-item-section>
              </q-item>
              <q-item clickable style="min-width: 100px">
                <q-item-section>注销账户</q-item-section>
              </q-item>
              <q-separator></q-separator>
              <q-item clickable @click="exit" style="min-width: 100px">
                <q-item-section>退 出</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <!--        TODO 右上角菜单-->
      </q-toolbar>
      <div class="row bg-white fit shadow-1 q-pa-md justify-between items-center">
        <div class="q-ml-md q-gutter-md">
          <q-btn-dropdown icon="cloud_upload" color="primary" label="上  传">
            <q-list>
              <q-item clickable v-close-popup @click="bar = true">
                <q-item-section avatar>
                  <q-icon color="primary" name="insert_drive_file"></q-icon>
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    上传文件
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section avatar>
                  <q-icon color="primary" name="folder"></q-icon>
                </q-item-section>
                <q-item-section>
                  <q-item-label>上传文件夹</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn outline color="primary" icon="create_new_folder" label="新建文件夹"></q-btn>
          <transition
            name="share"
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <q-btn v-if="showTopOperation" outline color="primary" icon="share" key="share" label="分 享"></q-btn>
          </transition>
          <transition
            name="share"
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <q-btn v-if="showTopOperation" outline color="primary" icon="cloud_download" label="下 载"></q-btn>
          </transition>
          <transition
            name="share"
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <q-btn v-if="showTopOperation" outline color="primary" icon="delete" label="删 除"></q-btn>
          </transition>
          <transition
            name="share"
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <q-btn v-if="showTopOperation" outline color="primary" icon="file_copy" label="复制到"></q-btn>
          </transition>
          <transition
            name="share"
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <q-btn v-if="showTopOperation" outline color="primary" icon="forward" label="移动到"></q-btn>
          </transition>
        </div>
        <!--        TODO 可添加搜索框-->
      </div>
    </q-header>
    <q-page-container class="q-ma-md">
      <FileView :showTop="showTopOperation" @change="changeShowTopOperation($event)"></FileView>
    </q-page-container>
    <router-view/>
    <!--      上传文件对话框-->
    <q-dialog v-model="bar" persistent transition-show="flip-down" transition-hide="flip-up">
      <q-card class="bg-white text-primary">
        <q-bar>
          <q-icon name="cloud_upload"/>
          <div class="text-subtitle2">上传文件</div>
          <q-space/>

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">关 闭</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="q-pt-none">
          <!--            文件上传组件-->
          <div class="q-pa-md">
            <q-uploader
                    :factory="factoryFn"
                    multiple
                    style="max-width: 600px"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="取  消" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { page } from 'vue-analytics'
import FileView from 'components/FileView'

export default {
  name: 'Index',
  components: {
    FileView
  },
  // Google Analytics
  track () {
    page('/')
  },
  data () {
    return {
      // 文件上传弹窗
      bar: false,
      right: false,
      // 选择文件时，顶部操作动态显示
      showTopOperation: false,
      // 视图样式
      viewMode: 'column',
      // 用户信息
      sessionDriveUser: {
      }
    }
  },
  async mounted () {
    // 从store中获取 sessionDriveUser
    this.sessionDriveUser = this.$store.getters.getSessionDriveUser()
    console.log('sessionDriveUser.headImg ', this.sessionDriveUser.headImg)
    // 从store中获取 sessionId
    this.sessionId = this.$store.getters.getSessionId()
    this.$q.loading.hide()
    if (!this.sessionId) {
      this.$q.notify({
        message: '请先登录！',
        color: 'red-4',
        textColor: 'white',
        position: 'top',
        icon: 'error_outline'
      })
      return await this.$router.replace('/')
    }
  },
  methods: {
    onItemClick () {
      console.log('onItemClick')
    },
    // 注销
    async exit () {
      if (this.$q.sessionStorage.getLength() > 0) {
        this.$q.sessionStorage.clear()
        await this.$router.replace('/')
        return window.location.reload()
      }
    },
    // 监听子组件变化
    changeShowTopOperation (value) {
      this.showTopOperation = value
      console.log('change show top operation ', this.showTopOperation)
      console.log('value ', value)
    },
    // 文件上传表彰
    factoryFn (files) {
      return {
        url: '/fileUp',
        method: 'POST'
      }
    }
  }

}
</script>
<style lang="sass" scoped>
  .my
    border: 1px solid red
    height: 100px
    width: 100px
    min-width: 150px
    max-width: 150px

</style>
