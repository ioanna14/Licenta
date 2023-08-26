<template>
  <div>
    <header-bar></header-bar>
    <div class="panels pa-10">
      <div class="panels__left d-flex mr-10">
        <map-panel/>
      </div>
      <div class="panels__right ">
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
  background-color: #eeeeee;
  height: 100%;

  &__right {
    width: 100%;
  }

  &__left {
    width: 100%;
  }
}
</style>
