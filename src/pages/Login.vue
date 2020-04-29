<template>
  <q-layout view="hhh lpr lfr" class="column justify-center items-center">
    <LoginForm></LoginForm>
  </q-layout>
</template>

<script>
import LoginForm from 'components/LoginForm'

export default {
  name: 'Login',
  components: {
    LoginForm
  }
}
</script>

<style scoped>

</style>
