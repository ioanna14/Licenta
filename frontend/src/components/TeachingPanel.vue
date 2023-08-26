<script lang="ts">
import {defineComponent} from 'vue'
import PdfForm from "@/components/PdfForm.vue";

export default defineComponent({
  name: "TeachingPanel",
  components: {
    PdfForm,
  },
  methods: {
    exportToPDF() {
      console.log("blaaaaa");
    },
  },
})
</script>

<template>
  <v-card class="teaching-panel">
    <v-card class="d-flex-column mt-10 rounded-1 videos-card">
      <v-card-title class="d-flex align-center justify-center">Check out some videos</v-card-title>
      <iframe class="ma-10 mt-5" width="600" height="355" src="https://www.youtube.com/embed/YTQzXokpv3Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      <iframe class="ma-10 mt-0" width="600" height="355" src="https://www.youtube.com/embed/cUOKHqVGOuE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      <iframe class="ma-10 mt-0" width="600" height="355" src="https://www.youtube.com/embed/z4BVeNwa_88" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      <iframe class="ma-10 mt-0" width="600" height="355" src="https://www.youtube.com/embed/or3MhI4MhAc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      <iframe class="ma-10 mt-0" width="600" height="355" src="https://www.youtube.com/embed/ChxrSeGj2jE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </v-card>
    <div id="element-to-convert" class="mb-10">
      <PdfForm />
    </div>
  </v-card>
</template>

<style scoped lang="scss">
.teaching-panel {
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: #eeeeee;
}

.videos-card {
  max-height: 490px;
  max-width: 700px;
  overflow: auto;
  margin: auto;
  background-color:	#F8F8FF;
}

</style>
