<script lang="ts">
import {defineComponent} from 'vue'
import ParachuteCard from "@/components/ParachuteCard.vue";
import FoldingsCard from "@/components/FoldingsCard.vue";
import JumpsCard from "@/components/JumpsCard.vue";
import {server} from "@/consts/appConsts";
import router from "@/router";
import axios from "axios";

export interface Jump {
  id: number,
  altitude: number,
  exercise: string,
  date: Date,
  plane: string,
  dropzone: string
}

export interface Incident {
  id: number,
  type: string,
  date: Date,
  image: string,
  description: string,
  dropzone: string
}

export interface Folding {
  id: number,
  date: Date,
  folderName: string
}

export default defineComponent({
  name: "UserProfile",
  components: {JumpsCard, FoldingsCard, ParachuteCard},
  data () {
    return {
      mainParachute: {
        id: 1,
        type: "Manta",
        lastFolding: "12-07-2023"
      },
      reserveParachute: {
        id: 2,
        type: "Round Pulled-Down Apex",
        lastFolding: "14-03-2023"
      },
      foldingsMainParachute: [] as Folding[],
      foldingsReserveParachute: [] as Folding[],
      jumps: [] as Jump[],
      jump: {} as Jump,
      incident: {} as Incident,
      userId: 0,
      error: ""
    }
  },
  mounted () {
    this.setAuthorizationKey();
    this.setUserId();

    // get data
    this.getParachutes();

    this.$nextTick( () => {
      this.getMainParachuteFoldings();
      this.getReserveParachuteFoldings();
    });
    this.getJumps();
  },
  methods: {
    setAuthorizationKey() : void {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; key=`);
      const key = parts?.pop()?.split(';').shift();
      if (key) {
        axios.defaults.headers.common['Authorization'] =  "Bearer " + key;
      } else {
        router.push("/login");
      }
    },
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
    getParachutes() {
      axios.get(`${server.baseURL}/get-parachutes/${this.userId}`,).then(response => {
        if (response && response.data.success) {
          // this.mainParachute = response.data.message.mainParachute;
          // this.reserveParachute = response.data.message.reserveParachute;
        } else {
          this.error = response.data.error;
        }
      });
    },
    getMainParachuteFoldings() {
      axios.get(`${server.baseURL}/get-foldings/${this.mainParachute.id}`, ).then(response => {
        if (response && response.data.success) {
          this.foldingsMainParachute= response.data.message;
        } else {
          this.error = response.data.error;
        }
      });
    },
    getReserveParachuteFoldings() {
      axios.get(`${server.baseURL}/get-foldings/${this.reserveParachute.id}`, ).then(response => {
        if (response && response.data.success) {
          this.foldingsReserveParachute= response.data.message;
        } else {
          this.error = response.data.error;
        }
      });
    },
    getJumps() {
      axios.get(`${server.baseURL}/get-jumps/${this.userId}`, ).then(response => {
        if (response && response.data.success) {
          this.jumps= response.data.message;
        } else {
          this.error = response.data.error;
        }
      });
    },
    addFoldingMainParachute() {
      const folding = {
        id: 0,
        date: new Date(),
        folder: this.userId,
        parachute: this.mainParachute.id
      };
      axios.post(`${server.baseURL}/add-folding`, folding).then(response => {
        if (response && response.data.success) {
          folding.id = response.data.message.id;
          const newFolding: Folding = {
            id: folding.id,
            date: folding.date,
            folderName: response.data.message.folder,
          }
          this.foldingsMainParachute.push(newFolding);
        } else {
          this.error = response.data.error;
        }
      });
    },
    addFoldingReserveParachute() {
      const folding = {
        id: 0,
        date: new Date(),
        folder: this.userId,
        parachute: this.reserveParachute.id
      };
      axios.post(`${server.baseURL}/add-folding`, folding).then(response => {
        if (response && response.data.success) {
          folding.id = response.data.message.id;
          const newFolding: Folding = {
            id: folding.id,
            date: folding.date,
            folderName: response.data.message.folder,
          }
          this.foldingsReserveParachute.push(newFolding);
        } else {
          this.error = response.data.error;
        }
      });
    },
    addJump() {
      const jump = {
        id: 0,
        exercise: this.jump.exercise,
        altitude: this.jump.altitude,
        plane: this.jump.plane,
        date: this.jump.date,
        dropzone: this.jump.dropzone,
        userId: this.userId,
      };
      axios.post(`${server.baseURL}/add-jump`, jump).then(response => {
        if (response && response.data.success) {
          jump.id = response.data.message;
          const newJump = {
            id: jump.id,
            exercise: this.jump.exercise,
            altitude: this.jump.altitude,
            plane: this.jump.plane,
            date: this.jump.date,
            dropzone: this.jump.dropzone,
          };
          this.jumps.push(newJump);
        } else {
          this.error = response.data.error;
        }
      });
    },
    addIncident() {
      const incident = {
        id: 0,
        type: this.incident.type,
        date: this.incident.date,
        image: this.incident.image,
        description: this.incident.description,
        dropzone: this.incident.dropzone,
        userId: this.userId,
      };
      axios.post(`${server.baseURL}/add-incident`, incident).then(response => {
        if (response && response.data.success) {
          incident.id = response.data.message;
          this.incident.type = "";
          this.incident.date = new Date();
          this.incident.image = "";
          this.incident.description = "";
          this.incident.dropzone = "";
        } else {
          this.error = response.data.error;
        }
      });
    },
    logOut() {
      document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "key=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.push("/login");
    },
  }
})
</script>

<template>
  <v-card class="user-profile__panel pa-10 d-flex-column">
    <div class="d-flex mb-10 justify-center">
      <parachute-card
        class="mr-10"
        :main-parachute="this.mainParachute"
        :reserve-parachute="this.reserveParachute"
        @addFoldingMainParachute="addFoldingMainParachute"
        @addFoldingReserveParachute="addFoldingReserveParachute"
      ></parachute-card>
      <foldings-card :is-reserve="false" :foldings="this.foldingsMainParachute" class="mr-10"></foldings-card>
      <foldings-card :is-reserve="true" :foldings="this.foldingsReserveParachute"></foldings-card>
    </div>
    <div class="d-flex mb-10 justify-center">
      <jumps-card :jumps="this.jumps"></jumps-card>
    </div>
    <div class="d-flex justify-center user-profile__panel-forms">
      <v-card class="mr-10 user-profile__panel-form">
        <v-card-title class="d-flex align-center justify-center">Add Jump</v-card-title>
        <v-form @submit.prevent="addJump" class="ma-10">
          <div class="d-flex">
            <v-label>Exercise</v-label>
            <v-text-field class="ml-2" v-model="jump.exercise" type="text" />
          </div>
          <div class="d-flex">
            <v-label>Altitude</v-label>
            <v-text-field class="ml-2" v-model="jump.altitude" type="text" />
          </div>
          <div class="d-flex">
            <v-label>Date</v-label>
            <v-text-field class="ml-2" v-model="jump.date" type="date" />
          </div>
          <div class="d-flex">
            <v-label>Plane</v-label>
            <v-text-field class="ml-2" v-model="jump.plane" type="text" />
          </div>
          <div class="d-flex">
            <v-label>Dropzone</v-label>
            <v-text-field class="ml-2" v-model="jump.dropzone" type="text" />
          </div>
          <v-btn type="submit" color="#52b3d9" class="user-profile__panel-btn d-flex justify-center">Add Jump</v-btn>
        </v-form>
      </v-card>
      <v-card class="user-profile__panel-form">
        <v-card-title class="d-flex align-center justify-center">Add Incident</v-card-title>
        <v-form @submit.prevent="addIncident" class="ma-10">
          <div class="d-flex">
            <v-label>Title</v-label>
            <v-text-field class="ml-2" v-model="incident.type" type="text" />
          </div>
          <div class="d-flex">
            <v-label>Date</v-label>
            <v-text-field class="ml-2" v-model="incident.date" type="date" />
          </div>
          <div class="d-flex">
            <v-label>Dropzone</v-label>
            <v-text-field class="ml-2" v-model="incident.dropzone" type="text" />
          </div>
          <div class="d-flex">
            <v-label>Description</v-label>
            <v-text-field class="ml-2" v-model="incident.description" type="text" />
          </div>
          <div class="d-flex">
            <v-label>Upload Image</v-label>
            <v-text-field class="ml-2" v-model="incident.image" type="text" />
          </div>
          <v-btn type="submit" color="#52b3d9" class="user-profile__panel-btn d-flex justify-center">Add incident</v-btn>
        </v-form>
      </v-card>
    </div>
    <div class="d-flex">
      <v-btn color="#52b3d9" width="150" height="55" class="mt-5 user-profile__panel-btn" @click="logOut()">Log Out</v-btn>
    </div>
  </v-card>
</template>

<style scoped lang="scss">
.user-profile__panel {
  height: 100%;
  width: 100%;
  overflow: auto;
  background-color: #eeeeee;

  &-btn {
    color: #eeeeee;
    margin: auto;
  }

  &-forms {
    max-width: 1230px;
    width: 100%;
    margin: auto;
  }

  &-form {
    width: 50%;
    background-color: #F8F8FF;
  }
}
</style>
