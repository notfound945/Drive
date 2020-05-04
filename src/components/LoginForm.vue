<template>
  <div class="fit column wrap justify-center items-center content-center q-gutter-md">
    <q-card class="my-card relative-position q-pa-lg">
      <div class="row justify-center absolute-center" style="top: -20px">
        <!--        <q-avatar size="100px" font-size="52px" color="teal" text-color="white" icon="network" />-->
        <q-avatar class="shadow-3" size="100px" color="primary" text-color="white">Drive</q-avatar>
      </div>
      <q-card-section class="col q-pa-xl">
        <q-form ref="loginForm"
                @submit="onSubmit"
                class="q-gutter-md"
        >
          <div>
            <q-input outlined v-model="username" label="用户名"
                     :rules="[
                      val => val && val.length > 0 || '请输入用户名',
                      val => val && val.length <= 10 || '用户名长度不应为10个字符以上']">
            </q-input>
          </div>
          <div>
            <q-input v-model="password" outlined label="密码" :type="isPwd ? 'password' : 'text'" lazy-rules
                     :rules="[
                     val => val && val.length > 0 || '请输入密码',
                     val => val && val.length >= 6 || '密码最少为6位',
                     val => val && val.length <= 20 || '密码长度不会超过20位']">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <div class="q-pt-md">
              <div class="text-override">
                <q-checkbox v-model="remember"/>
                7天内记住用户名
              </div>
            </div>
          </div>
          <div class="row justify-center">
            <q-btn class="full-width" label="登录" type="submit" size="lg" color="primary"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <!--    记录用户名复制-->
    <q-dialog v-model="seamless" seamless transition-show="scale" transition-hide="fade" position="bottom">
      <q-card style="width: 450px">
        <q-card-section class="row items-center no-wrap">
          <q-icon name="help_outline" color="primary" size="md"></q-icon>
          <div class="q-ma-md text-subtitle1">上次登录用户名 <span class="text-bold">{{prevName}}</span></div>
          <q-btn flat style="color: #FF0080" text-color="primary" label="复  制" @click="copyTo" />
          <q-btn flat v-close-popup style="color: #FF0080" label="取  消" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!--    ajax 栏-->
    <q-ajax-bar
      ref="bar"
      position="bottom"
      color="accent"
      size="5px"
      skip-hijack
    />
    <!--    底部版权信息-->
    <div class="fixed-bottom">
      <div class="text-weight-thin text-center">
        <q-icon name="copyright"/>
        2020 notfound945 | <a href="https://www.notfound945.cn/oneindex">湘ICP备19005461号</a> | 隐私声明和Cookie
      </div>
    </div>
  </div>
</template>

<script>
import request from 'src/axios/request'
import _ from 'lodash'
import { copyToClipboard } from 'quasar'
import { page } from 'vue-analytics'

export default {
  name: 'Login',
  data () {
    return {
      prevName: '',
      username: '',
      password: '',
      text: '',
      isPwd: true,
      remember: false,
      seamless: false
    }
  },
  async mounted () {
    // 页面加载完成 读入 Cookies 中用户名
    if (this.$q.cookies.has('userName')) {
      this.$set(this, 'prevName', this.$q.cookies.get('userName'))
      this.seamless = true
    }
    if (this.$q.sessionStorage.getLength() > 0) {
      return await this.$router.replace('/home')
    }
  },
  methods: {
    // Google Analytics
    track () {
      page('/')
    },
    // 复制到剪贴板
    copyTo () {
      copyToClipboard(this.prevName)
        .then(() => {
          this.seamless = false
          // 成功!
        })
        .catch(() => {
          // 失败
        })
    },
    async onSubmit () {
      // 复制用户名密码框关闭
      this.seamless = false
      // this.$axios.defaults.baseURL = 'https://www.lshyj1234.xyz/drive'
      const bar = this.$refs.bar
      bar.start()
      // 请求 params 参数
      const params = {
        'user.uid': this.username,
        'user.upassword': this.password
      }
      // axios 请求
      const res = await request.post(
        '/login',
        params).then(result => {
        bar.stop()
        return result
      }).catch(() => {
        bar.stop()
      })
      // 验证
      if (!_.isUndefined(res)) {
        if (_.isEqual(res.msg, '登录成功')) {
          this.$q.notify({
            position: 'top',
            color: 'green-4',
            textColor: 'white',
            icon: 'sentiment_very_satisfied',
            message: '登录成功'
          })
          // 加载 Loading
          this.$q.loading.show()
          // Cookies 记录用户名
          if (this.remember === true) {
            this.$q.cookies.set('userName', this.username,
              {
                expires: 7
              }
            )
          }
          const user = res.user
          // 写入 store
          this.$store.commit('register', user)
          // 重定向主界面
          return await this.$router.replace('/home')
        } else {
          this.$q.notify({
            position: 'top',
            color: 'red-4',
            textColor: 'white',
            icon: 'warning',
            message: res.msg
          })
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .my-card
    width: 100%
    max-width: 400px
</style>
