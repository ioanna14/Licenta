<script lang="ts">
import {defineComponent} from 'vue'
import { ref } from 'vue'
import { VueOpenWeather, convertTimeZone, utcToDate, utcToTime } from "vue-openweather";

export default defineComponent({
  name: "WeatherPanel",
  components: {
    'weather': VueOpenWeather
  },
  data () {
    return {
      weatherData: ref<any>(''),
    }
  },
  methods: {
    updateWeatherData(event: any) {
      return this.weatherData = event[0];
    },
    getAdjustedTime() {
      return convertTimeZone(this.weatherData.value.hourly[0].dt, this.weatherData.value.timezone_offset)
    }
  }
})


</script>

<template>
  <v-card class="weather-panel">
    <weather
      apiKey="dbd3b02d8958d62185d02e944cd5f522"
      lat="46,7667"
      long="23,6"
      daily
      @weatherData="updateWeatherData">
    </weather>
  </v-card>
</template>

<style scoped lang="scss">
.weather-panel {
  max-width: 400px;
  max-height: 300px;
  width: 100%;
  overflow: auto;
  border: 1px solid lightgrey;
  background-color: #F8F8FF;
}
</style>
