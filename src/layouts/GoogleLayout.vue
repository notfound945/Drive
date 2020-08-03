<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated reveal class="bg-primary text-white" height-hint="120">
      <q-toolbar class="GNL__toolbar">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          class="q-mr-sm"
        />

        <q-toolbar-title v-if="$q.screen.gt.xs" shrink class="row items-center no-wrap">
          <q-icon name="cloud" size="md"></q-icon>
          <span class="q-ml-sm">Drive</span>
        </q-toolbar-title>

        <q-space/>

        <q-input class="GNL__toolbar-input bg-white" dense v-model="search" color="bg-grey-1 shadow-1"
                 placeholder="Search your file">
          <template v-slot:prepend>
            <q-icon v-if="search === ''" name="search"/>
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''"/>
          </template>
        </q-input>

        <q-space/>

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-tooltip>Notifications</q-tooltip>
          </q-btn>
          <q-btn class="q-ml-md" flat round>
            <q-avatar size="md">
              <q-icon
                v-if="sessionDriveUser.headImg === null || sessionDriveUser.headImg === '' || sessionDriveUser.headImg === undefined"
                name="person"></q-icon>
              <img v-else :src="sessionDriveUser.headImg">
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
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
        </div>
      </q-toolbar>
      <!--     top operation bar-->
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

              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon color="primary" name="folder"></q-icon>
                </q-item-section>
                <q-item-section>
                  <q-item-label>上传文件夹</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
          <q-btn outline color="primary" icon="create_new_folder" label="新建文件夹" @click="createFolder"></q-btn>
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

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-white"
      :width="280"
    >
      <q-scroll-area class="fit">
        <q-list padding class="text-grey-8">
          <q-item class="GNL__drawer-item" v-ripple v-for="link in links1" :key="link.text" clickable>
            <q-item-section avatar>
              <q-icon class="text-primary" :name="link.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset class="q-my-sm"/>

          <q-item class="GNL__drawer-item" v-ripple v-for="link in links2" :key="link.text" clickable>
            <q-item-section avatar>
              <q-icon class="text-primary" :name="link.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator inset class="q-my-sm"/>

          <q-item class="GNL__drawer-item" v-ripple v-for="link in links3" :key="link.text" clickable>
            <q-item-section>
              <q-item-label>{{ link.text }}
                <q-icon v-if="link.icon" size="xs" :name="link.icon"/>
              </q-item-label>
            </q-item-section>
          </q-item>

          <div class="q-mt-md">
            <div class="flex flex-center q-gutter-xs">
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="Privacy">Privacy</a>
              <span> · </span>
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="Terms">Terms</a>
              <span> · </span>
              <a class="GNL__drawer-footer-link" href="javascript:void(0)" aria-label="About">About Drive</a>
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <FileView v-if="refresh === true" ref="demo" :showTop="showTopOperation" @change="changeShowTopOperation($event)"></FileView>
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

import FileView from 'components/FileView'
export default {
  name: 'GoogleLayout',
  components: {
    FileView
  },
  data () {
    return {
      // new folder name
      folderName: 'New Folder',
      // show operation bar
      bar: false,
      // file upload component prompt
      prompt: false,
      // page refresh
      refresh: true,
      showTopOperation: false,
      sessionDriveUser: [],
      sessionId: [],
      leftDrawerOpen: false,
      search: '',
      links1: [
        {
          icon: 'folder',
          text: 'All Files'
        },
        {
          icon: 'audiotrack',
          text: 'Audio'
        },
        {
          icon: 'movie_creation',
          text: 'Video'
        },
        {
          icon: 'image',
          text: 'Image'
        },
        {
          icon: 'description',
          text: 'Document'
        },
        {
          icon: 'apps',
          text: 'Application'
        },
        {
          icon: 'insert_drive_file',
          text: 'Other'
        }
      ],
      links2: [
        {
          icon: 'folder_shared',
          text: 'Share space'
        },
        {
          icon: 'delete',
          text: 'Trash'
        }
      ],
      links3: [
        {
          icon: '',
          text: 'Language & region'
        },
        {
          icon: 'email',
          text: 'Contact Us'
        }
      ],
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
  methods: {
    createFolder () {
      this.prompt = true
    },
    changeShowTopOperation (value) {
      console.log('changeShowTopOperation ', value)
      this.showTopOperation = value[0]
      this.selectedFile = value[1]
    },
    operationItem (index) {
      console.log('operation name ', this.topMenu[index].name)
      console.log('operation object ', this.selectedFile)
    },
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
    // 注销
    async exit () {
      if (this.$q.sessionStorage.getLength() > 0) {
        this.$q.sessionStorage.clear()
        await this.$router.replace('/')
        return window.location.reload()
      }
    }
  },
  mounted () {
    // 从store中获取 sessionDriveUser
    this.sessionDriveUser = this.$store.getters.getSessionDriveUser()
    // 从store中获取 sessionId
    this.sessionId = this.$store.getters.getSessionId()
  }
}
</script>

<style lang="sass">
.GNL
  &__toolbar
    height: 64px

  &__toolbar-input
    width: 55%

  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px

    .q-item__section--avatar
      .q-icon
        color: #5f6368

    .q-item__label
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem

  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem

    &:hover
      color: #000
</style>
