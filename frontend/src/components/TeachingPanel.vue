<script lang="ts">
import {defineComponent} from 'vue'

import html2pdf from 'html2pdf.js';

export default defineComponent({
  name: "TeachingPanel",
  methods: {
    exportToPDF() {
      console.log("blaaaaa");
      html2pdf(document.getElementById('element-to-convert'));
    },
  },
})
</script>

<template>
  <v-card class="teaching-panel">
    <div id="element-to-convert">
      <div style="text-align: center;">
        <img width="400" src="frontend/src/assets/logo.png"  alt="nothing"/>
      </div>
    </div>
    <v-button @click="exportToPDF">Export to PDF</v-button>
  </v-card>
</template>

<style scoped lang="scss">
.teaching-panel {
  height: 100%;
  width: 100%;
  overflow: auto;
  border: 1px solid lightgrey;
}
</style>
