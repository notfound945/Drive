<template>
  <div class="column q-ma-md justify-center">
    <div class="row justify-between">
      <div class="row items-center justify-center">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="Home" class="text-primary" icon="home"/>
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
    <div class="row q-mx-md q-mt-md justify-between">
      <q-checkbox dense v-model="checkAll" label="All / Not all" color="cyan"/>
      <div class="text-subtitle1">Total {{totalFileNumber}} files.</div>
    </div>
    <div class="row" v-if="fileList.length > 0">
      <!--列表视图-->
      <div class="col justify-center q-gutter-md q-ma-md" v-if="viewMode === 'column'">
        <q-card class="col-3 q-ma-md" v-for="(file, index) in fileList[currentPage-1]" :key="index">
          <q-card-section v-if="viewMode === 'column'">
            <q-checkbox dense v-model="checked[index]" label="" color="cyan"/>
            <div class="row justify-between items-center">
              <div class="col-auto q-ma-md justify-center items-center text-center">
                <q-icon name="local_movies" color="purple-3" size="md"></q-icon>
              </div>
              <div class="col file-title text-h6 items-center ellipsis">
                {{ file.filename }}
              </div>
              <div class="col-1 text-subtitle2">{{ parseFloat(file.fileSize).toFixed(2) }} MB</div>
              <div class="c0l-2 text-weight-light">{{ file.upMan }} - {{ file.upTime }}</div>
              <div class="col-auto">
                <q-btn color="grey-7" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item v-for="item in rightMenu" :key="item.index" clickable>
                        <q-item-section>{{ item }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>
          <q-separator/>
          <q-card-actions>
<!--            <q-btn flat icon="open_in_new" color="purple" label="打  开" />-->
            <q-btn flat icon="cloud_download" color="primary" label="下  载" @click="downloadFile(index)"/>
          </q-card-actions>
        </q-card>
      </div>
      <!--缩略图视图-->
<!--      thumbnail view display-->
      <div class="row justify-center q-gutter-md q-ma-md" v-else>
        <q-card class="thumbnail-item-card col-2" v-for="(file, index) in fileList[currentPage-1]" :key="index">
          <q-card-section class="column">
            <div class="row">
              <q-checkbox dense v-model="checked[index]" label="" color="cyan"/>
            </div>
            <div class="row items-center">
              <div class="col file-title text-h6 items-center ellipsis">
                {{ file.filename }}
              </div>
              <div class="col-2">
                <q-btn color="grey-7" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item v-for="item in rightMenu" :key="item.index" clickable>
                        <q-item-section>{{ item }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
            <div class="q-ma-md justify-center items-center text-center">
              <q-icon name="local_movies" color="purple-3" size="60px"></q-icon>
            </div>
            <div class="text-subtitle2">{{ file.fileSize }}</div>
            <div class="text-weight-light">{{ file.upTime }}</div>
<!--            <div class="text-weight-medium">{{ file.upMan }}</div>-->
            <q-tooltip
              transition-show="scale"
              transition-hide="scale"
              content-style="font-size: 14px"
              content-class="bg-purple text-white"
            >
              <div class="col title-tip text-h6 items-center ellipsis">
                {{ file.filename }}
              </div>
            </q-tooltip>
          </q-card-section>
          <q-separator/>
          <q-card-actions>
<!--            <q-btn flat icon="open_in_new" color="purple" label="打  开"/>-->
            <q-btn flat icon="cloud_download" color="primary" label="下  载" @click="downloadFile(index)"/>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div class="flex-center" v-else>
      <h2 class="text-center text-teal-6"> No Items </h2>
    </div>
    <!--      快速返回顶部-->
    <q-page-scroller expand position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="accent"></q-btn>
    </q-page-scroller>
    <!--  split page-->
    <div class="q-pa-lg flex flex-center" v-if="fileList.length > 1">
      <q-pagination
        v-model="currentPage"
        :max="fileList.length"
        :max-pages="5"
        :direction-links="true"
        :boundary-numbers="true"
      >
      </q-pagination>
    </div>
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
      // current page
      currentPage: 1,
      // total file number
      totalFileNumber: 0,
      // 选择框
      checkAll: false,
      // checked: new Array(20).fill(false),
      checked: _.fill(Array(20), false),
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
        this.totalFileNumber = res.list.length
        this.fileList = _.chunk(res.list, 20)
        console.log('fileList ', this.fileList)
        this.$store.commit('registerFileList', this.fileList)
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
    },
    async downloadFile (index) {
      const fileid = this.fileList[this.currentPage][index].fileid
      console.log('download fileid is ', fileid)
      const params = {
        fileid: this.fileid
      }
      const res = await request.post(
        'https://www.lshyj1234.xyz:8443/drive/fileOperate/downloadbyfileid',
        params
      ).then(result => {
        const content = result.data
        const blob = new Blob([content])
        const fileName = 'tesxt.exe'
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.download(fileName)
        link.click()
        return 'ok'
      }).catch(() => {
      })
      console.log(res)
    },
    // find all select file index
    findAllSelect (array, condition) {
      const result = []
      array.filter((item, index) => {
        if (item === condition) {
          result.push(this.fileList[this.currentPage][index].fileid)
        }
      })
      return result
    }
  },
  watch: {
    // 监听选择数组变化 以便动态显示顶底操作
    checked: {
      handler (checked) {
        const selectedList = this.findAllSelect(this.checked, true)
        if (checked.indexOf(true) !== -1) {
          this.$emit('change', [true, selectedList])
          // const array = this.findAllSelect(this.checked, true)
          // console.log('checkall ', array)
        } else {
          this.$emit('change', [false, selectedList])
        }
      }
    },
    checkAll: {
      handler (checkAll) {
        // this.checked = new Array(20).fill(checkAll)
        this.checked = _.fill(Array(20), checkAll)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.file-title
  width: 100px
  /*根据自己项目进行定义宽度*/
  overflow: hidden
  /*设置超出的部分进行影藏*/
  text-overflow: ellipsis
  /*设置超出部分使用省略号*/
  white-space: nowrap
  font-size: 18px

.title-tip
  text-align: center
  width: 100%
  white-space: nowrap
  font-size: 14px

.thumbnail-item-card
  min-width: 200px
  max-width: 250px
</style>
