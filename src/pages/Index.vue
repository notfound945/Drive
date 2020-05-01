<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="120">
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-weight-bold">
            <q-avatar>
              <q-icon name="cloud"></q-icon>
            </q-avatar>
            Drive
          </div>
          <!--          TODO 用户名和头像在此展示-->
        </q-toolbar-title>
        <div class="text-subtitle2">用户名</div>
        <q-btn dense flat round icon="person" @click="right = !right"/>
        <!--        TODO 右上角菜单-->
      </q-toolbar>

    </q-header>
    <q-page-container class="q-ma-md">

      <q-breadcrumbs gutter="xs" class="q-ma-lg">
        <!--        TODO 导航栏-->
        <q-breadcrumbs-el label="Home"/>
        <q-breadcrumbs-el label="Components"/>
        <q-breadcrumbs-el label="Breadcrumbs"/>
      </q-breadcrumbs>
      <div class="column q-ma-lg">
        <q-card class="col q-ma-xs" v-for="n in 20" v-bind:key="n">
          <q-card-section>
            <q-icon name="folder"></q-icon>
            Hello {{n}}
          </q-card-section>
        </q-card>
      </div>
      <q-page-scroller expand position="top" :scroll-offset="-100" :offset="[0, 0]">
        <div class="row bg-white fit shadow-3 q-pa-md justify-between items-center">
          <div class="q-ml-md q-gutter-md">
            <q-btn-dropdown icon="cloud_upload" color="primary" label="上  传">
              <q-list>
                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section avatar>
                    <q-avatar icon="insert_drive_file" color="primary" text-color="white"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>上传文件</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="onItemClick">
                  <q-item-section avatar>
                    <q-avatar icon="folder" color="primary" text-color="white"/>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>上传文件夹</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <q-btn outline color="primary" icon="create_new_folder" label="新建文件夹"></q-btn>
            <q-btn outline color="primary" icon="share" label="分 享"></q-btn>
            <q-btn outline color="primary" icon="cloud_download" label="下 载"></q-btn>
            <q-btn outline color="primary" icon="delete" label="删 除"></q-btn>
            <q-btn outline color="primary" icon="file_copy" label="复制到"></q-btn>
            <q-btn outline color="primary" icon="forward" label="移动到"></q-btn>
          </div>
          <!--        TODO 可添加搜索框-->
        </div>
      </q-page-scroller>
    </q-page-container>
    <router-view/>

  </q-layout>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      right: false
    }
  },
  mounted () {
    this.$q.loading.hide()
  },
  methods: {
    add () {
      console.log('add()')
      this.$store.commit('increment')
    },
    onItemClick () {
      console.log('click the item')
    }
  }
}
</script>
<style lang="sass" scoped>
  .my
    border: 1px solid red
    height: 100px
    width: 100px
    min-width: 150px
    max-width: 150px
</style>
