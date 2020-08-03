<template>
  <q-layout>
    <div class="row">
    </div>
    <q-page-container>
      <q-page>
        <h1>Flex Layout</h1>
        <div class="q-pa-lg q-gutter-lg justify-center row">
          <q-card class="bg-secondary text-white" v-for="n in 11" :key="n.index">
            <q-card-section>
              <div class="text-h6">Our Changing Planet</div>
              <div class="text-subtitle2">by John Doe</div>
            </q-card-section>

            <q-card-section>
              Hello world {{ n }}
            </q-card-section>

            <q-separator dark/>

            <q-card-actions>
              <q-btn flat>Action 1</q-btn>
              <q-btn flat>Action 2</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'FlexPage'
}
</script>

<style scoped>

</style>
