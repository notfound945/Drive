<template>
  <div class="bg">
    <router-view/>
  </div>
</template>

<script>

import request from 'src/axios/request'
export default {
  name: 'MainLayout',

  components: {},

  data () {
    return {}
  },
  mounted () {
    request.get('/getBing/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN')
      .then(result => {
        console.log('get result', result)
      })
      .catch(error => {
        console.log('error ', error)
      })
  }
}
</script>
<style lang="sass" scoped>

  .bg
    background-image: url('https://cn.bing.com/th?id=OHR.OldPatriarchTree_ZH-CN8818146190_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp')
    background-size: cover
    background-position: center
    -webkit-font-smoothing: antialiased
</style>
