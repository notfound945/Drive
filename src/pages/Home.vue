<template>
  <q-layout>
    <q-page-container>
      <!--            占位符 将整个页面撑大 统一样式-->
      <div class="row">
        <div v-for="n in 12" :key="n.index" class="col" style="height: 10px;width: 500px"></div>
      </div>
      <GoogleLayout></GoogleLayout>
    </q-page-container>
  </q-layout>
</template>

<script>
import GoogleLayout from 'layouts/GoogleLayout'
export default {
  name: 'Home',
  components: { GoogleLayout },
  async mounted () {
    // 从store中获取 sessionDriveUser
    this.sessionDriveUser = this.$store.getters.getSessionDriveUser()
    // 从store中获取 sessionId
    this.sessionId = this.$store.getters.getSessionId()
    // 判断是否登录
    const sessionParams = this.$route.params.id
    if (!this.sessionId || this.sessionId !== sessionParams) {
      this.$q.notify({
        message: '请先登录！',
        color: 'red-4',
        textColor: 'white',
        position: 'top',
        icon: 'error_outline'
      })
      this.$q.loading.hide()
      return await this.$router.replace({ name: 'index' })
    }
  }
}
</script>

<style scoped>

</style>
