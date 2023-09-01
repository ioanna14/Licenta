<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "FoldingsCard",
  props: {
    foldings: Object,
    isReserve: Boolean,
  }
})
</script>

<template>
  <v-card class="foldings-card">
    <v-card-title class="d-flex align-center justify-center"> {{this.isReserve ? "Reserve" : "Main" }} Parachute Foldings</v-card-title>
    <v-card-text v-if="!foldings.length">No foldings registered!</v-card-text>
    <v-list-item v-for="folding in foldings" :key="folding.id">
      <v-list-item-title>{{ folding.folderName }}</v-list-item-title>
      <v-list-item-subtitle>{{ folding.date }}</v-list-item-subtitle>
    </v-list-item>
  </v-card>

</template>

<style scoped lang="scss">
.foldings-card {
  width: 300px;
  background-color: #F8F8FF;
}
</style>
