<template>
  <q-layout view="hhh lpr lfr" class="column justify-center items-center">
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'HomeLayout',
  components: {
  },
  data () {
    return {}
  }
}
</script>

<style lang="sass" scoped>

</style>
