<template>
  <q-layout view="hHh lpR fFf" :style="{backgroundImage: imageUrl, backgroundPosition: 'center', backgroundSize: 'cover'}">
    <q-header elevated class="header bg-primary text-white">
      <q-toolbar>
        <q-btn v-if="!left" dense flat round icon="menu" @click="left = !left" />
        <q-btn v-else dense flat round icon="cancel" color="primary" @click="left = !left" />
        <q-toolbar-title>
        </q-toolbar-title>
        <q-btn v-if="!right" dense flat round icon="person" @click="right = !right" />
        <q-btn v-else dense flat round icon="cancel" color="primary"  @click="right = !right" />
      </q-toolbar>
    </q-header>
    <q-drawer v-model="left" side="left" :width="400" bordered>
      <h5 class="text-center">常用导航</h5>
      <div class="row">
        <div class="col">
          <a href="https://www.eec-cn.com/si/student/group" target="_blank">
            <q-card class="nav-card q-ma-md">
              <q-img
                src="https://cdn.quasar.dev/img/parallax2.jpg"
                basic
              >
                <div class="absolute-bottom text-weight-medium text-center" style="height: 30px">
                  所有课程
                </div>
              </q-img>
            </q-card>
          </a>
        </div>
      </div>
    </q-drawer>

    <q-drawer v-model="right" side="right" :width="1" bordered>
      <div v-if="right">
        <router-view/>
      </div>
    </q-drawer>
    <q-page-container style="padding-bottom: 0">
      <div class="row justify-around items-center">
        <div class="fixed-bottom-left">
          <h1 class="now-time text-white">{{nowTime}}</h1>
          <div class="image-description q-pa-md q-mb-xl text-subtitle1">
            <div>
              {{imageCopyright}}
            </div>
            <div class="q-mt-md items-center justify-between row">
              <div class="text-subtitle2">
                喜欢这张壁纸吗?
              </div>
              <q-btn outline style="color: white;" label="保 存" @click="downloadByBlob(originUrl, 'th')" />
            </div>
          </div>
        </div>
      </div>
    </q-page-container>
    <q-footer class="trans bg-grey-8 text-white">
      <q-toolbar class="justify-center">
        <!--    底部版权信息-->
        <div class="text-weight-light text-center">
          <q-icon name="copyright"/>
          2020 notfound945 | <a href="https://www.notfound945.cn/oneindex">湘ICP备19005461号</a> | 隐私声明和Cookie
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { date } from 'quasar'
import request from 'src/axios/request'

export default {
  name: 'MainLayout',

  components: {},

  data () {
    return {
      // 背景图片下载链接
      originUrl: null,
      // 展示图片所有字符
      imageUrl: null,
      // 图片描述
      imageDescription: null,
      // 图片版权
      imageCopyright: null,
      // 当前时间
      nowTime: null,
      // 左侧栏
      left: false,
      // 右侧栏
      right: false
    }
  },
  mounted () {
    // 获取Bing每日一图
    request.get('/getBing/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN')
      .then(result => {
        // 原始链接
        this.originUrl = 'https://cn.bing.com' + result.images[0].url
        // 图片版权描述
        this.imageCopyright = result.images[0].copyright
        // 样式所用变量
        this.imageUrl = 'url(' + this.originUrl + ')'
      })
      .catch(error => {
        console.log('error ', error)
      })
    // 实时时间
    this.timer = setInterval(() => {
      this.nowTime = date.formatDate(Date.now(), 'HH:mm:ss')
    }, 1000)
  },
  methods: {
    // 下载图片文件
    download (href, name) {
      const eleLink = document.createElement('a')
      eleLink.download = name
      eleLink.href = href
      eleLink.click()
      eleLink.remove()
    },
    downloadByBlob (url, name) {
      const image = new Image()
      image.setAttribute('crossOrigin', 'anonymous')
      image.src = url
      image.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, image.width, image.height)
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob)
          this.download(url, name)
          // 用完释放URL对象
          URL.revokeObjectURL(url)
        })
      }
    }
  },
  // 销毁定时器
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>
<style lang="sass" scoped>
  /*取消顶部 header 高度*/
  .header
    height: 0
  /*底部透明*/
  .trans
    height: 40px
    opacity: 0.7
    -moz-opacity: 0.7
    /*a 标签去默认样式*/
  a
    color: white
    text-decoration: none
    /*图片描述框样式*/
  .image-description
    max-height: 300px
    max-width: 50%
    background-color: black
    opacity: 0.4
    -moz-opacity: 0.4
    color: white
  /*导航卡片*/
  .nav-card
    max-width: 150px
</style>
