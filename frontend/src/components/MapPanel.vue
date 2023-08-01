<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "MapPanel"
})
</script>

<template>
<v-card class="map-panel">
  <iframe
    width="100%"
    height="100%"
    style="border:0"
    loading="lazy"
    allowfullscreen
    referrerpolicy="no-referrer-when-downgrade"
    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBgRX5AjhJ5FkiWW49iVc9Y-UVJL60Ugig
    &q=Skydive+Transilvania+Club+Sportiv,Luncani">
  </iframe>
</v-card>
</template>

<style scoped lang="scss">
.map-panel {
  max-width: 1000px;
  height: 500px;
  border: 1px solid lightgrey;
}
</style>
