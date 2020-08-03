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
  components: { GoogleLayout }
}
</script>

<style scoped>

</style>
