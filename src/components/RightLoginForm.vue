<template>
  <div class="q-gutter-xs">
    <q-card class="col my-card q-pa-md fixed-right items-center">
      <div class="title">
        <transition
                appear
                enter-active-class="animated fadeIn"
                leave-active-class="animated fadeOut"
        >
          <div class="q-mt-md text-h5 text-center" style="height: 50px">{{hello}}</div>
        </transition>
      </div>
<!--      <div class="row justify-center absolute-center" style="top: -20px">-->
<!--        &lt;!&ndash;        <q-avatar size="100px" font-size="52px" color="teal" text-color="white" icon="network" />&ndash;&gt;-->
<!--        <q-avatar class="shadow-3" size="100px" color="primary" text-color="white">Drive</q-avatar>-->
<!--      </div>-->
      <q-card-section class="col q-pa-xl items-center">
        <q-form ref="loginForm"
                @submit="onSubmit"
                class="q-gutter-md"
        >
          <!--           用户名框-->
          <div>
            <q-input outlined v-model="username" label="用户名"
                     :rules="[
                      val => val && val.length > 0 || '请输入用户名',
                      val => val && val.length <= 10 || '用户名长度不应为10个字符以上']">
            </q-input>
          </div>
          <!--           密码框-->
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
          </div>
          <!--           验证码框-->
          <transition
            appear
            enter-active-class="animated fadeInUp"
            leave-active-class="animated fadeOutDown"
          >
            <div v-if="password.length >= 6">
              <div class="row justify-between items-start">
                <div class="col-6">
                  <q-input outlined v-model="verifyCode" label="验证码" :rules="[
                     val => val && val.length > 0 || '请输入验证码',
                     val => val && val.length >= 4 || '验证码为4位',
                     val => val && val.length <= 4 || '验证码为4位'
                     ]">
                  </q-input>
                </div>
                <div class="col-6 text-right">
                  <q-img
                    v-if="imgUrl !== null"
                    @click="changeCode"
                    :src="imgUrl"
                    style="width: 120px"
                    title="看不清？点击重新获取"
                  >
                    <template v-slot:error>
                      <div class="absolute-full flex flex-center bg-negative text-white">
                        加载失败
                      </div>
                    </template>
                  </q-img>
                </div>
              </div>
              <div class="q-pt-md">
                <div class="text-override">
                  <q-checkbox v-model="remember"/>
                  7天内记住用户名
                </div>
              </div>
            </div>
          </transition>
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
          <q-btn flat style="color: #FF0080" text-color="primary" label="复  制" @click="copyTo"/>
          <q-btn flat v-close-popup style="color: #FF0080" label="取  消"/>
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

  </div>
</template>

<script>
import request from 'src/axios/request'
import _ from 'lodash'
import { copyToClipboard, uid, date } from 'quasar'
import { page } from 'vue-analytics'

export default {
  name: 'Login',
  data () {
    return {
      // 记录的用户名
      prevName: '',
      // 表单用户名
      username: '',
      // 表单密码
      password: '',
      // 验证码
      verifyCode: '',
      // 验证图片
      verifyImage: null,
      // 显示密码
      text: '',
      isPwd: true,
      // 记住密码
      remember: false,
      // 底部弹出用户名复制窗口
      seamless: false,
      // 验证码图片地址
      imgUrl: null,
      // 问候语
      hello: ''
    }
  },
  async mounted () {
    // 页面加载完成 读入 Cookies 中用户名
    if (this.$q.cookies.has('userName')) {
      this.$set(this, 'prevName', this.$q.cookies.get('userName'))
      this.seamless = true
    }
    // 判断 store 是否存在 sessionId  存在表明已登录 自动跳转
    const sessionId = this.$store.getters.getSessionId()
    if (sessionId) {
      return await this.$router.replace('/home')
    }
    // 加载验证码
    this.verifyImage = await request.get('https://www.lshyj1234.xyz:8443/drive/getCode', {
      responseType: 'blob',
      withCredentials: true
    }).then(result => {
      return result
    }).catch(() => {
      return null
    })
    const blob = new Blob([this.verifyImage], { type: 'image/png;charset=utf-8' })
    this.imgUrl = window.URL.createObjectURL(blob)
    // 加载问候语
    let nowTime = date.formatDate(Date.now(), 'HH')
    nowTime = parseInt(nowTime)
    if (nowTime <= 5 && nowTime >= 0) {
      this.hello = '夜深了，睡觉吧~'
    } else if (nowTime >= 6 && nowTime <= 7) {
      this.hello('又是元气满满的一天，冲鸭！！')
    } else if (nowTime >= 8 && nowTime <= 9) {
      this.hello = '清早起床，运动一下吧——'
    } else if (nowTime >= 10 && nowTime <= 11) {
      this.hello = '上午好，今天忙什么呢?'
    } else if (nowTime >= 12 && nowTime <= 13) {
      this.hello = '中午了，吃个饭休息一下。'
    } else if (nowTime >= 14 && nowTime <= 17) {
      this.hello = '下午茶时间到啦！'
    } else if (nowTime >= 18 && nowTime <= 20) {
      this.hello = '一天要结束了，世界安静下来了'
    } else if (nowTime >= 21 && nowTime <= 23) {
      this.hello = '早点睡觉觉，熬夜伤身体鸭~'
    } else {
      this.hello = '欢迎使用，请登录'
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
      // 请求 params 参数
      const params = {
        userid: this.username,
        password: this.password,
        sureCode: this.verifyCode
      }
      // axios 请求
      const res = await request.post(
        'https://www.lshyj1234.xyz:8443/drive/userLogin',
        params).then(result => {
        return result
      }).catch(() => {
      })
      // console.log('get response result: ', res)
      // 验证
      if (!_.isUndefined(res)) {
        if (_.isEqual(res.flag, true)) {
          this.$q.notify({
            position: 'top',
            color: 'green-4',
            textColor: 'white',
            icon: 'sentiment_very_satisfied',
            message: res.message
          })
          console.log('result get ', res)
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
          // const user = res.user
          // 写入 随机生成的 sessionId 到 store
          this.$store.commit('registerSessionId', uid())
          // 写入当前会话用户信息到 store
          this.$store.commit('registerSessionDriveUser', res.driveUser)
          // 重定向主界面
          return await this.$router.replace('/home')
        } else {
          this.$q.notify({
            position: 'top',
            color: 'red-4',
            textColor: 'white',
            icon: 'warning',
            message: res.message
          })
        }
      }
    },
    // 重新获取验证码
    async changeCode () {
      this.verifyImage = null
      this.imgUrl = null
      // 加载验证码
      this.verifyImage = await request.get('https://lshyj1234.xyz:8443/drive/getCode', {
        responseType: 'blob'
      }).then(result => {
        return result
      }).catch(() => {
        return null
      })
      const blob = new Blob([this.verifyImage], { type: 'image/png;charset=utf-8' })
      this.imgUrl = window.URL.createObjectURL(blob)
    }
  }
}
</script>

<style lang="sass" scoped>
  .my-card
    height: 100%
    width: 400px
    max-width: 400px
</style>
