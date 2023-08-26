<template>
  <v-card class="briefing-card mt-10 pa-10">
    <v-card-title class="d-flex align-center justify-center">Briefing</v-card-title>
    <v-card-subtitle class="d-flex align-center justify-center">Date: {{ currentDate }}</v-card-subtitle>
    <v-form @submit.prevent="saveAsPdf">
      <v-label class="briefing-card__category-title">1. Jumping responsible:</v-label>
      <div>
        <div class="briefing-card__category d-flex">
          <v-label for="name">Your name:</v-label>
          <v-text-field class="ml-2" v-model="formData.name" type="text" id="name" />
        </div>
        <div class="briefing-card__category d-flex">
          <v-label for="instructorName">Instructor name:</v-label>
          <v-text-field class="ml-2"  v-model="formData.instructorName" type="text" id="instructorName" />
        </div>
        <div class="briefing-card__category d-flex">
          <v-label for="pilotName">Pilot name:</v-label>
          <v-text-field class="ml-2"  v-model="formData.pilotName" type="text" id="pilotName" />
        </div>
      </div>

      <v-label class="briefing-card__category-title">2. General data of the activities:</v-label>
      <div class="briefing-card__category">
        <div class="briefing-card__category d-flex">
          <v-label for="dropzone">Dropzone:</v-label>
          <v-text-field class="ml-2" v-model="formData.dropzone" type="text" id="dropzone" />
        </div>
        <v-label class="briefing-card__category-title mt-0">Weather:</v-label>
        <div class="briefing-card__category d-flex">
          <v-label for="wind">Wind:</v-label>
          <v-text-field class="ml-2 mr-2" v-model="formData.wind" type="text" id="wind" />
          <v-label for="temperature">Temperature:</v-label>
          <v-text-field class="ml-2 mr-2" v-model="formData.temperature" type="text" id="temperature" />
          <v-label for="humidity">Humidity:</v-label>
          <v-text-field class="ml-2" v-model="formData.humidity" type="text" id="humidity" />
        </div>
        <div class="briefing-card__category d-flex">
          <v-label for="pressure">Pressure:</v-label>
          <v-text-field class="ml-2 mr-2" v-model="formData.pressure" type="text" id="pressure" />
          <v-label for="visibility">Visibility:</v-label>
          <v-text-field class="ml-2 mr-2" v-model="formData.visibility" type="text" id="visibility" />
          <v-label for="ceiling">Cloud Ceiling:</v-label>
          <v-text-field class="ml-2" v-model="formData.ceiling" type="text" id="ceiling" />
        </div>
        <div class="briefing-card__category d-flex">
          <v-label for="plane">Plane:</v-label>
          <v-text-field class="ml-2" v-model="formData.plane" type="text" id="plane" />
        </div>
        <div class="briefing-card__category d-flex">
          <v-label for="landingZone">Landing zone:</v-label>
          <v-text-field class="ml-2" v-model="formData.landingZone" type="text" id="landingZone" />
        </div>
      </div>

      <v-label class="briefing-card__category-title" for="specificData">3. Specific data of the activities (jumping types):</v-label>
      <v-text-field v-model="formData.specificData" type="text" id="specificData" />

      <v-label class="briefing-card__category-title" for="aerodromeRegulation">4. Regulation of the aerodrome / skydivers launch activity:</v-label>
      <v-text-field v-model="formData.aerodromeRegulation" type="text" id="aerodromeRegulation" />

      <v-btn type="submit" color="#52b3d9" class="briefing-card__button d-flex justify-center">Save as PDF</v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { defineComponent, ref } from 'vue';
import jsPDF from 'jspdf';

export default defineComponent({
  setup() {
    const formData = ref({
      name: "",
      instructorName: "",
      pilotName: "",
      dropzone: "",
      wind: "",
      temperature: "",
      humidity: "",
      pressure: "",
      visibility: "",
      ceiling: "",
      plane: "",
      landingZone: "",
      specificData: "",
      aerodromeRegulation: "",
    });

    const isNameValid = ref(true); // Flag to track name validation

    const saveAsPdf = () => {
      if (formData.value.name.trim() === '') {
        isNameValid.value = false;
        return;
      }

      isNameValid.value = true;

      const pdf = new jsPDF();
      pdf.setFontSize(20).text("Breifing", 100, 10,"center");
      pdf.setFontSize(14).text(`Date: 22/8/2023`, 100, 20,"center");
      pdf.setFontSize(14).text("1. Jumping responsible:", 10, 30);
      pdf.setFontSize(12).text(`Your name: ${formData.value.name}`,15, 38);
      pdf.setFontSize(12).text(`Instructor name: ${formData.value.instructorName}`,15, 46);
      pdf.setFontSize(12).text(`Pilot name: ${formData.value.pilotName}`, 15, 54);

      pdf.setFontSize(14).text("2. General data of the activities:",10, 64);
      pdf.setFontSize(12).text(`Dropzone: ${formData.value.dropzone}`,15, 72);
      pdf.text("Weather:", 10, 80);
      pdf.text(`Wind: ${formData.value.wind}   Temperature: ${formData.value.temperature}   Humidity: ${formData.value.humidity}`,15, 88);
      pdf.text(`Pressure: ${formData.value.pressure}   Visibility: ${formData.value.visibility}   Cloud Ceiling: ${formData.value.ceiling}`, 15, 96);
      pdf.text(`Plane: ${formData.value.plane}`, 15, 104);
      pdf.text(`Landing zone: ${formData.value.landingZone}`, 15, 112);


      pdf.setFontSize(14).text("3. Specific data of the activities (jumping types):", 10, 122);
      pdf.setFontSize(12).text(`${formData.value.specificData}`,10, 130);

      pdf.setFontSize(14).text("4. Regulation of the aerodrome / skydivers launch activity:", 10, 140);
      pdf.setFontSize(12).text(`${formData.value.aerodromeRegulation}`,10, 148);

      pdf.save('breifing.pdf');
    };

    return {
      formData,
      isNameValid,
      saveAsPdf,
    };
  },
  computed: {
  },
  data() {
    return {
      currentDate: new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()
    }
  }
});
</script>

<style lang="scss" scoped>
.briefing-card {
  width: 80%;
  margin: auto;
  background-color:	#F8F8FF;

  &__category {
    width: 100%;

    &-title {
      font-weight: 500;
      font-size: 16px;
      color: black;
      margin-top: 20px;
    }
  }

  &__button {
    color: #eeeeee;
    margin: auto;
  }
}
.error {
  border: 1px solid red;
}

.error-message {
  color: red;
}

.v-field__input {
  min-width: 200px;
}
</style>
