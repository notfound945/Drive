<template>
  <q-layout view="hhh lpr lfr" class="column justify-center items-center">
    <Login/>
    <q-page-container>
      <router-view/>
    </q-page-container>
    <div class="fixed-bottom relative-position">
      <div class="q-pa-sm text-weight-thin text-center">
        <q-icon name="copyright"/>
        2020 notfound945 | <a href="https://www.notfound945.cn/oneindex">湘ICP备19005461号</a> | 隐私声明和Cookie
      </div>
    </div>
  </q-layout>
</template>

<script>
import Login from 'components/Login'

export default {
  name: 'HomeLayout',
  components: {
    Login
  },
  data () {
    return {}
  }
}
</script>

<style lang="sass" scoped>

</style>
