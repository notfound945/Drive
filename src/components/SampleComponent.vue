<template>
  <span>
    <q-btn color="white" text-color="black" label="Standard" @click="prompt = true"/>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">New Folder Name</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="folderName" autofocus @keyup.enter="prompt = false"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup/>
          <q-btn flat label="Create Folder" v-close-popup @click="createFolder"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </span>
</template>

<script>
export default {
  name: 'SampleComponent',
  props: {
    tips: String,
    folderName: String
  },
  data () {
    return {
      prompt: true
    }
  },
  methods: {
    createFolder () {
      console.log('create folder ')
    }
  }
}
</script>

<style scoped>

</style>
