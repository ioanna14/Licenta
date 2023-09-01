<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ParachuteCard",
  props: {
    mainParachute: {} as Object,
    reserveParachute: {} as Object,
  },
})
</script>

<template>
  <v-card class="parachute__card pa-10">
    <v-card-title class="d-flex align-center justify-center">My Parachute</v-card-title>
    <div class="d-flex">
      <v-img :width="270" :height="200" src="https://skydivemonroe.com/wp-content/uploads/parachute-size-and-shape_mini.jpg"></v-img>
      <div class="d-flex-column ml-10 align-self-center">
        <v-list-item-title>Main Parachute</v-list-item-title>
        <v-list-item-subtitle>Type: {{this.mainParachute.type}}</v-list-item-subtitle>
        <v-list-item-subtitle>Last Folding: {{this.mainParachute.lastFolding}}</v-list-item-subtitle>
        <v-btn color="#52b3d9" class="mt-5 parachute__card-btn" @click="$emit('addFoldingMainParachute')">Add Folding</v-btn>
      </div>
    </div>
    <div class="d-flex mt-10">
      <v-img :width="270" :height="200" src="https://img.aeroexpo.online/images_ar/photo-mg/173704-16194308.jpg"></v-img>
      <div class="d-flex-column ml-10 align-self-center">
        <v-list-item-title>Reserve Parachute</v-list-item-title>
        <v-list-item-subtitle>Type: {{this.reserveParachute.type}}</v-list-item-subtitle>
        <v-list-item-subtitle>Last Folding: {{this.reserveParachute.lastFolding}}</v-list-item-subtitle>
        <v-btn color="#52b3d9" class="mt-5  parachute__card-btn" @click="$emit('addFoldingReserveParachute')">Add Folding</v-btn>
      </div>
    </div>
  </v-card>
</template>

<style scoped lang="scss">
.parachute__card {
  max-width: 550px;
  background-color: #F8F8FF;

  &-btn {
    color: #eeeeee;
  }
}
</style>
