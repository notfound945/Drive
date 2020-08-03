<template>
  <q-dialog v-model="dialog_prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">New Folder Name</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="folderName" autofocus @keyup.enter="dialog_prompt = false"/>
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup/>
        <q-btn flat label="Create Folder" v-close-popup @click="createFolder"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'SampleComponent',
  props: {
    tips: String,
    folderName: String,
    prompt: Boolean
  },
  mounted () {
    console.log('prompt ', prompt)
    this.dialog_prompt = this.props[prompt]
    console.log('dialog_prompt ', this.dialog_prompt)
  },
  data () {
    return {
      dialog_prompt: false
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
