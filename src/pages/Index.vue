<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            头像
          </q-avatar>
          用户名
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right"/>
      </q-toolbar>
      <q-breadcrumbs gutter="xs">
        <q-breadcrumbs-el label="Home" />
        <q-breadcrumbs-el label="Components" />
        <q-breadcrumbs-el label="Breadcrumbs" />
      </q-breadcrumbs>
    </q-header>
    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      right: false
    }
  }
}
</script>
