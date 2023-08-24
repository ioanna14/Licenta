<template>
  <div>
    <header-bar></header-bar>
    <div class="panels pa-0">
      <div class="panels__left ml-10 mr-10">
        <map-panel/>
      </div>
      <div class="panels__right mr-10">
        <weather-panel/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import WeatherPanel from "@/components/WeatherPanel.vue";
import MapPanel from "@/components/MapPanel.vue";
import HeaderBar from "@/components/HeaderBar.vue";
</script>

<style scoped lang="scss">
.panels {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &__right {
    width: 100%;
  }

  &__left {
    width: 100%;
  }
}
</style>
