<template>
    <div class="col">
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
                    <q-btn v-else flat round color="white" text-color="primary" icon="view_module"
                           @click="changeView"></q-btn>
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

            <!--      快速返回顶部-->
            <q-page-scroller expand position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
                <q-btn fab icon="keyboard_arrow_up" color="accent"></q-btn>
            </q-page-scroller>
        </div>
    </div>
</template>

<script>
export default {
  name: 'FileView',
  // 向父组件获取 是否展示顶部选中操作 的数据
  props: ['showTop'],
  data () {
    return {
      // 视图样式
      viewMode: 'column',
      // 选择框
      checked: new Array(100).fill(false)
    }
  },
  mounted () {
    // 选择框初始化
    this.checked.fill(false)
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
