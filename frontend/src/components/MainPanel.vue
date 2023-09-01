<script lang="ts">
import {defineComponent} from 'vue'
import IncidentsCard from "@/components/IncidentsCard.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import WeatherPanel from "@/components/WeatherPanel.vue";
import MapPanel from "@/components/MapPanel.vue";

export default defineComponent({
  name: "MainPanel",
  components: {MapPanel, WeatherPanel, HeaderBar, IncidentsCard}
})
</script>

<template>
  <div>
    <header-bar></header-bar>
    <div class="panels pa-10">
      <div class="d-flex mb-10 justify-center">
        <map-panel/>
      </div>
      <div class="panels__news d-flex">
        <incidents-card class="mr-10"/>
        <weather-panel/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.panels {
  display: flex;
  flex-direction: column;
  background-color: #eeeeee;
  height: 100vh;
  align-items: center;

  &__news {
    max-width: 1400px;
    width: 100%;
  }
}
</style>
