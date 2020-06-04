<template>
  <div class="column q-ma-md">
    <div class="row justify-between">
      <div class="row items-center justify-center">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Home" icon="home"/>
        </q-breadcrumbs>
      </div>
      <div class="row justify-center items-center">
        <div class="text-subtitle2">
          视图样式：
        </div>
        <q-btn v-if="viewMode === 'column'" flat round color="white" text-color="primary" icon="view_list"
               @click="changeView"></q-btn>
        <q-btn v-else flat round color="white" text-color="primary" icon="view_module"
               @click="changeView"></q-btn>
      </div>
    </div>
    <!--       文件卡片-->
    <div :class="viewMode">
      <!--            列表视图-->
      <q-card class="col-3 q-ma-xs" v-for="file in fileList" :key="file.index">
        <q-card-section v-if="viewMode === 'column'">
          <q-checkbox dense v-model="checked[file.index]" label="" color="cyan"/>
          <div class="row justify-between items-center">
            <div class="col-auto q-ma-md justify-center items-center text-center">
              <q-icon name="local_movies" color="purple-3" size="md"></q-icon>
            </div>
            <div class="col file-title text-h6 items-center ellipsis">
              {{file.filename}}
            </div>
            <div class="col-1 text-subtitle2">{{parseFloat(file.fileSize).toFixed(2)}} MB</div>
            <div class="c0l-2 text-weight-light">{{file.upMan}} - {{file.upTime}}</div>
            <div class="col-auto">
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu cover auto-close>
                  <q-list>
                    <q-item v-for="item in rightMenu" :key="item.index" clickable>
                      <q-item-section>{{item}}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
          </div>
        </q-card-section>
        <!--                缩略图视图-->
        <q-card-section class="column" v-else>
          <div class="row">
            <q-checkbox dense v-model="checked[n]" label="" color="cyan"/>
          </div>
          <div class="row items-center">
            <div class="col file-title text-h6 items-center ellipsis">
              【高清特辑】苍井空与她的学生们 ({{n}}).avi
            </div>
            <div class="col-2">
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu cover auto-close>
                  <q-list>
                    <q-item v-for="item in rightMenu" :key="item.index" clickable>
                      <q-item-section>{{item}}</q-item-section>
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
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            content-style="font-size: 16px; margin: 10px"
            content-class="bg-purple text-white"
          >
            <div class="col file-title text-h6 items-center ellipsis">
              【高清特辑】苍井空与她的学生们 ({{n}}).avi
            </div>
          </q-tooltip>
        </q-card-section>
        <q-separator/>
        <q-card-actions>
          <q-btn flat icon="open_in_new" color="purple" label="打  开"/>
          <q-btn flat icon="cloud_download" color="primary" label="下  载"/>
        </q-card-actions>

      </q-card>

    </div>
    <!--      快速返回顶部-->
    <q-page-scroller expand position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="accent"></q-btn>
    </q-page-scroller>
  </div>
</template>

<script>
import request from 'src/axios/request'
import _ from 'lodash'

export default {
  name: 'FileView',
  // 向父组件获取 是否展示顶部选中操作 的数据
  props: ['showTop'],
  data () {
    return {
      // 视图样式
      viewMode: 'column',
      // 文件列表
      fileList: {},
      // 选择框
      checked: new Array(100).fill(false),
      rightMenu: [
        '重命名',
        '移动到',
        '复制到',
        '详细信息',
        '删除文件'
      ]
    }
  },
  async mounted () {
    // 选择框初始化
    this.checked.fill(false)
    // 获取文件列表
    const res = await request.get(
      'https://www.lshyj1234.xyz:8443/drive/fileOperate/lookFileListInfor'
    ).then(result => {
      return result
    }).catch(() => {
    })
    if (!_.isUndefined(res)) {
      if (_.isEqual(res.flag, true)) {
        this.fileList = res.list
        this.$store.commit('registerFileList', res.list)
      }
    }
    this.$q.loading.hide()
  },
  methods: {
    // 改变视图
    changeView () {
      if (this.viewMode === 'column') {
        this.viewMode = 'row'
      } else if (this.viewMode === 'row') {
        this.viewMode = 'column'
      }
    }

  },
  watch: {
    // 监听选择数组变化 以便动态显示顶底操作
    checked: {
      handler (checked) {
        if (checked.indexOf(true) !== -1) {
          this.$emit('change', true)
        } else {
          this.$emit('change', false)
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
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
