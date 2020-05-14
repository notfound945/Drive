<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container style="padding-bottom: 0">
      <div class="row justify-around items-center"
           :style="{backgroundImage: imageUrl, backgroundPosition: 'center', backgroundSize: 'cover'}">
        <div class="fixed-bottom-left">
          <div class="image-description q-pa-md text-subtitle1">
            {{imageCopyright}}
          </div>
          <h1 class="now-time text-white">{{nowTime}}</h1>
        </div>
        <router-view/>
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
// const moment = require('moment')

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
      nowTime: null
    }
  },
  mounted () {
    // 获取Bing每日一图
    request.get('/getBing/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN')
      .then(result => {
        this.originUrl = 'https://cn.bing.com' + result.images[0].url
        this.imageCopyright = result.images[0].copyright
        console.log('get result', result)
        this.imageUrl = 'url(' + this.originUrl + ')'
        console.log('origin url ', this.originUrl)
      })
      .catch(error => {
        console.log('error ', error)
      })
    // 实时时间
    this.timer = setInterval(() => {
      this.nowTime = date.formatDate(Date.now(), 'HH:mm:ss')
    }, 1000)
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
  .trans
    height: 40px
    opacity: 0.7
    -moz-opacity: 0.7

  a
    color: white
    text-decoration: none

  .image-description
    max-height: 300px
    max-width: 50%
    background-color: black
    opacity: 0.4
    -moz-opacity: 0.4
    color: white
</style>
