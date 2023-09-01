<script lang="ts">
import {defineComponent} from 'vue'
import router from "@/router";
import axios from "axios";
import {server} from "@/consts/appConsts";

export interface Incident {
  id: number,
  title: string,
  description: string,
  date: Date,
  image: string,
  dropzone: string
}

export default defineComponent({
  name: "IncidentsCard",
  props: {
  },
  data () {
    return {
      defaultImage: "https://skydivebuckeye.com/wp-content/uploads/elementor/thumbs/IMG_2879-q8txhxskh4eurujj966yjecyaar2br2zftbc05jhc8.jpg",
      selectedFile: null,
      userId: 0,
      incident: {
        id: 1,
        type: "Collision (Canopy)",
        description: "In a crowded landing pattern, an instructor initiated a speed-inducing maneuver either just before or just after turning onto final. At about 100 feet AGL, his legs collided with the nose of another jumper's canopy. Fortunately, both canopies remained inflated and both jumpers landed safely. No further information about this incident or the jumpers involved was reported.",
        date: "12-05-2023",
        image: "https://cloudfront-us-east-1.images.arcpublishing.com/archetype/ZLSEU4OZANCWRDRWZ2HAY66VWA.jpg",
        dropzone: "USA"
      },
      error: "",
    }
  },
  mounted() {
    this.setUserId();
    this.getIncidents()
  },
  methods: {
    setUserId() : void {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; user_id=`);
      const key = parts?.pop()?.split(';').shift();
      if (key) {
        this.userId = +key;
      } else {
        router.push("/login");
      }
    },
    getIncidents() {
      axios.get(`${server.baseURL}/get-incidents/all`, ).then(response => {
        if (response && response.data.success) {
          const incidents = response.data.message
          this.incident= incidents[incidents.length-1];
        } else {
          this.error = response.data.error;
        }
      });
    },
  }
})
</script>

<template>
  <v-card class="incident-card d-flex ml-3">
    <v-img class="incident-card__image" :src="this.incident.image ? this.incident.image : defaultImage" :width="450"/>
    <div class="incident-card__details d-flex justify-space-between">
      <div class="pa-5">
        <v-card-subtitle class="pl-0">{{ this.incident.date.slice(0,10) }}</v-card-subtitle>
        <v-card-subtitle class="pa-0 pt-4 pb-4"><v-icon icon="mdi-map-marker-outline"></v-icon> {{ this.incident.dropzone }}</v-card-subtitle>
        <v-card-title class="pl-0">{{ this.incident.type }}</v-card-title>
        <v-card-text class="pl-0 pr-10">{{ this.incident.description }}</v-card-text>
      </div>
    </div>
  </v-card>
</template>

<style scoped lang="scss">
.incident-card {
  background-color: #F8F8FF;
  max-width: 1000px;
  width: 100%;

  &__details {
    border-left: 3px solid #ffcc00;

    &-right {
      align-items: center;
      display: flex;
      flex-direction: column;
      align-self: flex-start;
    }
  }

  &__btn {
    color: #eeeeee;
    margin: auto;
  }
}
</style>
