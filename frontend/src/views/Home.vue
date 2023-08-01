<template>
  <header-bar/>
  <div class="panels mt-5">
    <div class="panels__left ml-10 mr-10">
      <map-panel/>
    </div>
    <div class="panels__right mr-10">
      <weather-panel/>
    </div>
  </div>

</template>

<script lang="ts" setup>
import HeaderBar from "@/components/HeaderBar.vue";
import WeatherPanel from "@/components/WeatherPanel.vue";
import MapPanel from "@/components/MapPanel.vue";
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
