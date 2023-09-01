<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "JumpsCard",
  props: {
    jumps: Object,
  }
})
</script>

<template>
  <v-card class="jumps-card">
    <v-card-title class="d-flex align-center justify-center">My jumps</v-card-title>
    <v-card-text v-if="!jumps.length">No jumps registered!</v-card-text>
    <v-list v-else class="d-flex-column jumps-card__table">
      <v-list-item class="jumps-card__table-title mb-2">
        <v-list-item-title class="font-weight-bold ml-5"> Exercise</v-list-item-title>
        <v-list-item-title class="font-weight-bold ml-8"> Altitude</v-list-item-title>
        <v-list-item-title class="font-weight-bold"> Date </v-list-item-title>
        <v-list-item-title class="font-weight-bold"> Plane </v-list-item-title>
        <v-list-item-title class="font-weight-bold mr-8"> Dropzone </v-list-item-title>
      </v-list-item>
      <v-list-item v-for="jump in jumps" :key="jump.id" class="ma-3 mt-0">
        <v-list-item-title>{{ jump.exercise }}</v-list-item-title>
        <v-list-item-title>{{ jump.altitude }} m</v-list-item-title>
        <v-list-item-title>{{ jump.date }}</v-list-item-title>
        <v-list-item-title>{{ jump.plane }}</v-list-item-title>
        <v-list-item-title>{{ jump.dropzone }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style lang="scss">
.jumps-card {
  background-color: #F8F8FF;
  max-width: 1230px;
  width: 100%;

  .v-list-item__content {
    display: flex;
    justify-content: space-between;
  }

  &__table{
    background-color: #F8F8FF;

    :hover:not(:first-child) {
        background-color: #eaf6fa;
    }

    &-title {
      :hover {
        background-color: #c0e3f1 !important;
      }

      margin: 20px;
      background-color: #c0e3f1;
    }
  }
}
</style>
