<template>
  <div class="fit column wrap justify-center items-center content-center q-gutter-md">
    <q-card class="my-card relative-position q-pa-lg">
      <div class="row justify-center absolute-center" style="top: -20px">
        <!--        <q-avatar size="100px" font-size="52px" color="teal" text-color="white" icon="network" />-->
        <q-avatar class="shadow-3" size="100px" color="primary" text-color="white">Drive</q-avatar>
      </div>
      <q-card-section class="col q-pa-xl">
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <div>
            <q-input outlined v-model="username" label="用户名"
                     :rules="[
                      val => val && val.length > 0 || '请输入用户名',
                      val => val && val.length <= 10 || '用户名长度不应为10个字符以上']"/>
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
                记住我
              </div>
            </div>
          </div>
          <div class="row justify-center">
            <q-btn class="full-width" label="登录" type="submit" size="lg" color="primary"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
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
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      text: '',
      isPwd: true,
      remember: false
    }
  },
  methods: {
    async onSubmit () {
      // this.$axios.defaults.baseURL = 'https://www.lshyj1234.xyz/drive'
      const bar = this.$refs.bar
      bar.start()
      const params = {
        'user.uid': this.username,
        'user.upassword': this.password
      }
      // const res = await post('/drive/login', params)
      // const res = await this.$axios.post(
      const res = await request.post(
        '/login',
        params).then(result => {
        bar.stop()
        return result
      }).catch(() => {
        bar.stop()
      })
      if (!_.isUndefined(res)) {
        if (_.isEqual(res.msg, '登录成功')) {
          this.$q.notify({
            position: 'top',
            color: 'green-4',
            textColor: 'white',
            message: '登录成功'
          })
        } else {
          this.$q.notify({
            position: 'top',
            color: 'red-4',
            textColor: 'white',
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
