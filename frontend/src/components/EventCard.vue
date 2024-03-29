<script lang="ts">
import {defineComponent} from 'vue'
import axios from "axios";
import {server} from "@/consts/appConsts";
import router from "@/router";

export default defineComponent({
  name: "EventCard",
  props: {
    id: Number,
    title: String,
    description: String,
    date: String,
    price: Number,
    image: null,
    location: String,
    canJoin: Boolean,
  },
  data () {
    return {
      defaultImage: "https://skydivebuckeye.com/wp-content/uploads/elementor/thumbs/IMG_2879-q8txhxskh4eurujj966yjecyaar2br2zftbc05jhc8.jpg",
      selectedFile: null,
      userId: 0,
    }
  },
  mounted() {
    this.setUserId();
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
    joinEvent(): void {
      axios.post(`${server.baseURL}/add-participant-to-event`, {userId: this.userId, eventId: this.id}).then(response => {
        if (response && response.data.success) {
          const event = {
            id: this.id,
            title: this.title,
            image: this.image,
            date: this.date,
            description: this.description,
            price: this.price,
            location: this.location
          }
          this.$emit("joinedEvent", event);
        }
      });
    }
  }
})
</script>

<template>
  <v-card class="event-card d-flex-column">
    <v-img class="event-card__image" :src="image ? image : defaultImage" :width="400"/>
    <div class="event-card__details d-flex justify-space-between">
      <div class="mt-5 ml-5">
        <v-card-subtitle class="pl-0">{{ date.slice(0,10) }}</v-card-subtitle>
        <v-card-title class="pl-0">{{ title }}</v-card-title>
        <v-card-text class="pl-0">{{ description }}</v-card-text>
      </div>
      <div class="mt-5 mr-5 event-card__details-right">
        <v-btn v-if="this.canJoin" class="event-card__btn justify-center" color="#52b3d9" @click="joinEvent()">Join</v-btn>
        <v-card-text class="pa-0 pt-4">from <b>$ {{ price }}</b></v-card-text>
        <v-card-subtitle class="pa-0 pt-4 pb-4"><v-icon icon="mdi-map-marker-outline"></v-icon> {{ location }}</v-card-subtitle>
      </div>
    </div>
  </v-card>
</template>

<style scoped lang="scss">
.event-card {
  background-color: #eaf6fa;
  max-width: 400px;

  &__details {
    border-top: 3px solid #ffcc00;

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
