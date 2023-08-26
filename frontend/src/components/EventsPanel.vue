<script lang="ts">
import {defineComponent} from 'vue'
import EventCard from "@/components/EventCard.vue";
import {server} from "@/consts/appConsts";
import axios from "axios";

export interface Event {
  title: string;
  image: string | ArrayBuffer;
  date: string;
  description: string;
  price: number;
  location: string;
}

export default defineComponent({
  name: "EventsPanel",
  components: {EventCard},
  data () {
    return {
      events: [] as Event[],
      title: "",
      date: "",
      location: "",
      description: "",
      price: 0,
      image: "",
      error: "",
    }
  },
  mounted() {
    this.setAuthorizationKey();
    this.updateEvents();
  },
  methods: {
    setAuthorizationKey() : void {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; key=`);
      const key = parts?.pop()?.split(';').shift();
      axios.defaults.headers.common['Authorization'] =  "Bearer " + key;
    },
    updateEvents(): void {
      axios.get(`${server.baseURL}/get-events/all`).then(response => {
        if (response && response.data.success) {
          this.events = response.data.message;
        } else {
          this.error = response.data.error;
        }
      });
    },
    addEvent(): void {
      const event = {
        title: this.title,
        image: this.image,
        date: this.date,
        description: this.description,
        price: this.price,
        location: this.location
      };
      axios.post(`${server.baseURL}/add-event`, event).then(response => {
        if (response && response.data.success) {
          this.events.push(event);
          this.clearForm();
        } else {
          this.error = response.data.error;
        }
      });
    },
    clearForm(): void {
      this.title = "";
      this.price = 0;
      this.date = "";
      this.location = "";
      this.image = "";
      this.description = "";
    },
  }
})
</script>

<template>
  <v-card class="events-panel">
    <v-card class="d-flex-column mt-10 rounded-1 events-panel__card">
      <v-card-title class="d-flex align-center justify-center">Latest Events</v-card-title>
      <div class="d-flex">
        <event-card
          v-for="evt in events"
          :key="evt.title"
          :title="evt.title"
          :date="evt.date"
          :image="evt.image"
          :price="evt.price"
          :description="evt.description"
          :location="evt.location"
          class="ma-10 mt-5"/>
      </div>
    </v-card>
    <v-card class="d-flex-column mt-10 mb-10 rounded-1 events-panel__card">
      <v-card-title class="d-flex align-center justify-center">Add an event</v-card-title>
      <v-form @submit.prevent="addEvent" class="ma-10">
        <div class="events-panel__form-category d-flex">
          <v-label>Title</v-label>
          <v-text-field class="ml-2" v-model="title" type="text" />
        </div>
        <div class="events-panel__form-category  d-flex">
          <v-label>Date</v-label>
          <v-text-field class="ml-2" v-model="date" type="date" />
        </div>
        <div class="events-panel__form-category  d-flex">
          <v-label>Location</v-label>
          <v-text-field class="ml-2" v-model="location" type="text" />
        </div>
        <div class="events-panel__form-category  d-flex">
          <v-label>Price</v-label>
          <v-text-field class="ml-2" v-model="price" type="text" />
        </div>
        <div class="events-panel__form-category  d-flex">
          <v-label>Upload Image</v-label>
          <v-text-field class="ml-2" v-model="image" type="text" />
        </div>
        <div class="events-panel__form-category  d-flex">
          <v-label>Description</v-label>
          <v-text-field class="ml-2" v-model="description" type="text" />
        </div>
        <v-btn type="submit" color="#52b3d9" class="events-panel__button d-flex justify-center">Add event</v-btn>
      </v-form>
    </v-card>
  </v-card>
</template>

<style scoped lang="scss">
.events-panel {
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: #eeeeee;

  &__card {
    max-width: 80%;
    margin: auto;
    background-color:	#F8F8FF;
  }

  &__button {
    color: #eeeeee;
    margin: auto;
  }
}
</style>
