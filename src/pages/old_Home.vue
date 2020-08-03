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
          {{ sessionDriveUser.username }}
        </div>
        &nbsp;
        <q-btn class="q-ml-md" dense flat round>
          <q-avatar size="md">
            <q-icon
              v-if="sessionDriveUser.headImg === null || sessionDriveUser.headImg === '' || sessionDriveUser.headImg === undefined"
              name="person"></q-icon>
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
          <q-btn outline color="primary" icon="create_new_folder" label="新建文件夹" @click="prompt = true" ></q-btn>
          <transition
            name="share"
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            v-for="(item, index) in topMenu"
            :key="index"
          >
            <q-btn v-if="showTopOperation" outline color="primary" :icon="item.icon"
                   :label="item.label" @click="operationItem(index)"></q-btn>
          </transition>
        </div>
        <!--        TODO 可添加搜索框-->
      </div>
    </q-header>
    <q-page-container>
      <!--            占位符 将整个页面撑大 统一样式-->
      <div class="row">
        <div v-for="n in 12" :key="n.index" class="col" style="height: 10px;width: 500px"></div>
      </div>
      <!--            父子组件通信-->
      <FileView v-if="refresh === true" ref="demo" :showTop="showTopOperation"
                @change="changeShowTopOperation($event)"></FileView>
    </q-page-container>
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
              label="请选择文件（无大小限制）"
              multiple
              field-name="files"
              :factory="factoryFn"
              with-credentials
              @start="startUpload"
              @uploaded="upLoaded"
              @factory-failed="factoryFailed"
              @finish="finishUploaded"
              :headers="[{name: 'Access-Control-Allow-Origin', value: '*'}]"
              style="max-width: 600px"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="取  消" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">New Folder Name</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="folderName" autofocus @keyup.enter="prompt = false"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup/>
          <q-btn flat label="Create Folder" v-close-popup @click="createFolder"/>
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
      // create folder prompt
      prompt: false,
      // folder name of new create
      folderName: 'New Folder',
      // 上传文件完成后自动重载子组件
      refresh: true,
      // 文件上传弹窗
      bar: false,
      right: false,
      // 选择文件时，顶部操作动态显示
      showTopOperation: false,
      // 视图样式
      viewMode: 'column',
      // 用户信息
      sessionDriveUser: {},
      // 用户文件
      fileList: {},
      // select file
      selectedFile: [],
      // 顶部按钮
      topMenu: [
        {
          name: 'download',
          label: '下 载',
          icon: 'cloud_download'
        },
        {
          name: 'share',
          label: '分 享',
          icon: 'share'
        },
        {
          name: 'delete',
          label: '删 除',
          icon: 'delete'
        },
        {
          name: 'copyTo',
          label: '复制到',
          icon: 'file_copy'
        },
        {
          name: 'moveTo',
          label: '移动到',
          icon: 'forward'
        }
      ]
    }
  },
  async mounted () {
    // 从store中获取 sessionDriveUser
    this.sessionDriveUser = this.$store.getters.getSessionDriveUser()
    // 从store中获取 sessionId
    this.sessionId = this.$store.getters.getSessionId()
    // 判断是否登录
    if (!this.sessionId) {
      this.$q.notify({
        message: '请先登录！',
        color: 'red-4',
        textColor: 'white',
        position: 'top',
        icon: 'error_outline'
      })
      this.$q.loading.hide()
      return await this.$router.replace('/')
    }
  },
  methods: {
    // 开始上传
    startUpload () {
      this.$q.notify({
        position: 'top',
        color: 'green-3',
        textColor: 'white',
        icon: 'access_time',
        message: '开始上传文件...'
      })
    },
    // 文件上传成功
    upLoaded (info) {
      console.log('upLoaded info ', info)
      const response = JSON.parse(info.xhr.response)
      if (response.flag) {
        this.$q.notify({
          position: 'top',
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_upload',
          message: response.message
        })
      } else {
        this.$q.notify({
          position: 'top',
          color: 'red-4',
          textColor: 'white',
          icon: 'cloud_off',
          message: response.message
        })
      }
    },
    // 文件上传失败
    factoryFailed () {
      this.$q.notify({
        position: 'top',
        color: 'red-3',
        textColor: 'white',
        icon: 'error',
        message: '未知的错误发生'
      })
    },
    // 所有请求完成
    finishUploaded (info) {
      console.log('所有文件上传完成 ', info)
      this.$q.notify({
        position: 'top',
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: '所有上传请求完成'
      })
      // 重载子组件
      this.refresh = false
      this.$nextTick(() => {
        this.refresh = true
      })
    },
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
      this.showTopOperation = value[0]
      this.selectedFile = value[1]
    },
    // upload file factory function
    factoryFn (files) {
      return new Promise((resolve) => {
        resolve({
          url: 'https://www.lshyj1234.xyz:8443/drive/fileOperate/fileUpload',
          method: 'POST'
        })
        console.log('上传成功？？')
      })
    },
    createFolder () {
      console.log('create folder name is ', this.folderName)
    },
    // operation button function
    operationItem (index) {
      console.log('operation name ', this.topMenu[index].name)
      console.log('operation object ', this.selectedFile)
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
