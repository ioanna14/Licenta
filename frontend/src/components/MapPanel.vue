<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "MapPanel",
  data () {
    return {
      dropzones: [
        {id: 1, name: "Skydive Transilvania Club Sportiv", location: "Luncani, Romania"},
        {id: 2, name: "TNT Brothers Office", location: "Bucharest, Romania"},
        {id: 3, name: "TNT Brothers Seaside", location: "Tuzla, Romania"},
        {id: 4, name: "Hungary Skydive - Őcsény", location: "Őcsény, Repülőtér, Ungaria"},
        {id: 5, name: "Skydive Serbia", location: "Zrenjaninski put, Beograd, Serbia"},
        {id: 6, name: "SKYDIVE VENICE", location: "San Stino di Livenza VE, Italia"},
        {id: 7, name: "EICEPS Frétoy-le-Château - Skydiving Club", location: "Frétoy-le-Château, France"},
        {id: 8, name: "Tandem Skydive Barcelona City", location: "Barcelona, Spain"}],
      searchDropzone: "",
      mapLocation: "Skydive+Transilvania+Club+Sportiv,Luncani",
      mapLocationPrefix: "https://www.google.com/maps/embed/v1/place?key=AIzaSyBgRX5AjhJ5FkiWW49iVc9Y-UVJL60Ugig&q="
    }
  },
  methods: {
    showOnMap(title: string): void {
      this.mapLocation = title.replace(" ", "+");
    },
    searchForDropzone(): void {
      this.mapLocation = this.searchDropzone.replace(" ", "+");
      this.$nextTick(() => {
        this.searchDropzone = "";
      });
    }
  }
})
</script>

<template>
  <div class="d-flex map-panels">
    <v-card class="map-panels__map mr-10">
      <iframe
        width="100%"
        height="100%"
        style="border:0"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        :src=mapLocationPrefix+mapLocation>
      </iframe>
    </v-card>
    <v-card class="map-panels__dropzone">
      <v-text-field class="ma-2 mt-4 mb-4" placeholder="Search" v-model="searchDropzone" @keydown.enter.prevent="searchForDropzone()"></v-text-field>
      <v-divider/>
      <v-list class="map-panels__dropzone-list mt-2 mb-2">
        <v-list-item v-for="dropzone in dropzones" :key="dropzone.id" class="map-panels__dropzone-list-item" @click="showOnMap(dropzone.name)">
          <v-list-item-title>{{ dropzone.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ dropzone.location }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<style lang="scss">
.map-panels {
  background-color: #eeeeee;
  max-width: 1400px;

  &__map {
    width: 1000px !important;
    height: 500px;
    border: 1px solid lightgrey;
  }

  &__dropzone {
    max-width: 400px;
    width: 100%;
    background-color:	#F8F8FF;

    &-list {
      background-color:#F8F8FF;

      &-item {
        background-color: #F8F8FF;
      }
    }

    .v-text-field .v-input__details {
      display: none !important;
    }
  }
}
</style>
