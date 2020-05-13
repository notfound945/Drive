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
      <div class="row justify-between">
        <q-breadcrumbs gutter="xs" class="q-ma-lg justify-center items-center">
          <!--        TODO 导航栏-->
          <q-breadcrumbs-el label="Home"/>
          <q-breadcrumbs-el label="Components"/>
          <q-breadcrumbs-el label="Breadcrumbs"/>
        </q-breadcrumbs>
        <div class="q-ma-lg">
          <div class="text-subtitle2">
            视图样式：
            <q-btn v-if="viewMode === 'column'" flat round color="white" text-color="primary" icon="view_list"
                   @click="changeView"></q-btn>
            <q-btn v-else flat round color="white" text-color="primary" icon="view_module" @click="changeView"></q-btn>
          </div>
        </div>
      </div>
      <!--       文件卡片-->
      <div :class="viewMode">
        <q-card class="col q-ma-sm" style="min-width: 220px" v-for="n in 20" v-bind:key="n">
          <q-card-section>
            <!--        缩略图样式-->
            <div v-if="viewMode === 'row'" class="row no-wrap">
              <div class="col">
                <div class="row justify-center items-center q-mt-md">
                  <q-checkbox class="absolute-top-left q-ma-sm" dense v-model="checked[n]" color="cyan"/>
                  <div class="col file-title text-h6 items-center">
                    【高清特辑】苍井空与她的学生们 ({{n}}).avi
                  </div>
                  <!--                按钮菜单-->
                  <div class="col-auto">
                    <q-btn color="grey-7" round flat icon="more_vert">
                      <q-menu cover auto-close>
                        <q-list>
                          <q-item clickable>
                            <q-item-section>重命名</q-item-section>
                          </q-item>
                          <q-item clickable>
                            <q-item-section>复制到</q-item-section>
                          </q-item>
                          <q-item clickable>
                            <q-item-section>移动到</q-item-section>
                          </q-item>
                          <q-item clickable>
                            <q-item-section>分享文件</q-item-section>
                          </q-item>
                          <q-separator/>
                          <q-item clickable>
                            <q-item-section><span class="text-red">删除文件</span></q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                </div>
                <div class="q-ma-md justify-center items-center text-center">
                  <q-icon name="local_movies" color="purple-3" size="100px"></q-icon>
                </div>
                <div class="text-subtitle2">2.3 GB</div>
                <div class="text-weight-light">2020/05/01 16:09</div>
              </div>
              <!--              工具提示-->
              <q-tooltip
                transition-show="scale"
                transition-hide="scale"
                content-style="font-size: 16px; margin: 10px"
                content-class="bg-purple text-white"
              >
                【高清特辑】苍井空与她的学生们 ({{n}}).avi
              </q-tooltip>
            </div>
            <!--            列表样式-->
            <div v-else class="row justify-between items-center">
              <div class="row col-6">
                <div class="row q-ma-md items-center">
                  <div class="col file-title text-h6 items-center">
                    <q-checkbox dense v-model="checked[n]" label="" color="cyan"/>
                    【高清特辑】苍井空与她的学生们 ({{n}}).avi
                  </div>
                </div>
              </div>

              <div class="row col-4 items-center justify-end">
                <div class="col-3 text-subtitle2">2.3 GB</div>
                <div class="col-4 text-weight-light">2020/05/01 16:09</div>
                <!--                按钮菜单-->
                <div class="col-1">
                  <q-btn color="grey-7" round flat icon="more_vert">
                    <q-menu cover auto-close>
                      <q-list>
                        <q-item clickable>
                          <q-item-section>重命名</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>复制到</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>移动到</q-item-section>
                        </q-item>
                        <q-item clickable>
                          <q-item-section>分享文件</q-item-section>
                        </q-item>
                        <q-separator/>
                        <q-item clickable>
                          <q-item-section><span class="text-red">删除文件</span></q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </div>
            </div>
          </q-card-section>
          <q-separator/>

          <q-card-actions>
            <q-btn flat icon="open_in_new" color="purple" label="打  开"/>
            <q-btn flat icon="cloud_download" color="primary" label="下  载"/>
          </q-card-actions>
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
      <!--      快速返回顶部-->
      <q-page-scroller expand position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
        <q-btn fab icon="keyboard_arrow_up" color="accent"></q-btn>
      </q-page-scroller>
    </q-page-container>
    <router-view/>
  </q-layout>
</template>

<script>
import { page } from 'vue-analytics'

export default {
  name: 'Index',
  // Google Analytics
  track () {
    page('/')
  },
  data () {
    return {
      right: false,
      bar: false,
      // 选择文件时，顶部操作动态显示
      showTopOperation: false,
      // 视图样式
      viewMode: 'column',
      // 选择框
      checked: new Array(100).fill(false),
      // 用户信息
      user: {
        uname: '',
        upgrade: 0,
        headImg: ''
      }
    }
  },
  async mounted () {
    this.checked.fill(false)
    this.user = this.$store.getters.getUser()
    this.$q.loading.hide()
    if (this.$q.sessionStorage.getLength() === 0) {
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
    add () {
      console.log('add()')
      this.$store.commit('increment')
    },
    onItemClick () {
      console.log('click the item')
    },
    // 改变视图
    changeView () {
      if (this.viewMode === 'column') {
        this.viewMode = 'row'
      } else if (this.viewMode === 'row') {
        this.viewMode = 'column'
      }
    },
    // 文件上传表单
    factoryFn (files) {
      return {
        url: '/fileUp',
        method: 'POST'
      }
    },
    // 注销
    async exit () {
      if (this.$q.sessionStorage.getLength() > 0) {
        this.$q.sessionStorage.clear()
        return await this.$router.replace('/')
      }
    }
  },
  watch: {
    // 监听选择数组变化 以便动态显示顶底操作
    checked: {
      handler (check) {
        this.showTopOperation = check.indexOf(true) !== -1
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

  .file-title
    width: 100%
    /*根据自己项目进行定义宽度*/
    overflow: hidden
    /*设置超出的部分进行影藏*/
    text-overflow: ellipsis
    /*设置超出部分使用省略号*/
    white-space: nowrap
    font-size: 18px
</style>
