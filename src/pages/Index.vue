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
        <div class="text-subtitle2">
          {{user.uname}}
          <span class="text-italic">Lv. {{user.ugrade}}</span>
        </div>
        &nbsp;
        <q-btn dense flat round>
          <q-avatar size="md">
            <img v-if="user.headImg != null" :src="user.headImg">
            <q-icon v-else name="person"></q-icon>
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
              <q-item clickable style="min-width: 100px">
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
          <q-btn outline color="primary" icon="share" label="分 享"></q-btn>
          <q-btn outline color="primary" icon="cloud_download" label="下 载"></q-btn>
          <q-btn outline color="primary" icon="delete" label="删 除"></q-btn>
          <q-btn outline color="primary" icon="file_copy" label="复制到"></q-btn>
          <q-btn outline color="primary" icon="forward" label="移动到"></q-btn>
        </div>
        <!--        TODO 可添加搜索框-->
      </div>
    </q-header>
    <q-page-container class="q-ma-md">

      <q-breadcrumbs gutter="xs" class="q-ma-lg">
        <!--        TODO 导航栏-->
        <q-breadcrumbs-el label="Home"/>
        <q-breadcrumbs-el label="Components"/>
        <q-breadcrumbs-el label="Breadcrumbs"/>
      </q-breadcrumbs>
      <div class="column q-ma-lg">
        <q-card class="col q-ma-xs" v-for="n in 20" v-bind:key="n">
          <q-card-section>
            <q-icon name="folder" color="primary" size="md"></q-icon>
            Folder {{n}}
          </q-card-section>
        </q-card>
        <q-card class="col q-ma-xs" v-for="n in [21, 22, 23, 24, 25]" v-bind:key="n">
          <q-card-section>
            <q-icon name="insert_drive_file" color="primary" size="md"></q-icon>
            File {{n}}
          </q-card-section>
        </q-card>
      </div>

<!--      弹出对话框-->
      <q-dialog v-model="bar" persistent transition-show="flip-down" transition-hide="flip-up">
        <q-card class="bg-white text-primary">
          <q-bar>
            <q-icon name="cloud_upload"/>
            <div class="text-subtitle2">上传文件</div>
            <q-space/>

            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip content-class="bg-white text-primary">关  闭</q-tooltip>
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
            <q-btn flat label="取  消" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
<!--      快速返回顶部-->
      <q-page-scroller expand position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="accent"></q-btn>
      </q-page-scroller>
    </q-page-container>
    <router-view/>
  </q-layout>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      right: false,
      bar: false,
      user: {
        uname: '',
        upgrade: 0,
        headImg: ''
      }
    }
  },
  mounted () {
    this.user = this.$store.getters.getUser()
    this.$q.loading.hide()
  },
  methods: {
    add () {
      console.log('add()')
      this.$store.commit('increment')
    },
    onItemClick () {
      console.log('click the item')
    },
    factoryFn (files) {
      return {
        url: 'http://localhost:4444/upload',
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
