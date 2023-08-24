<template>
  <div class="onboarding">
    <v-card-text class="onboarding-container">
      <go-skydiving-logo class="mt-10"/>
      <v-card-title class="mt-5" :class="{'mb-0': error, ' mb-10': !error}">LET'S GO SKYDIVING</v-card-title>
      <v-card-text class="pa-0 onboarding-form__error mb-5" v-if="error">{{error}}</v-card-text>
      <v-form class="onboarding-form" @submit.prevent="next">
        <div class="d-flex flex-row justify-space-between">
          <div class="onboarding-form__item">
            <v-label>First Name</v-label>
            <v-text-field
              name="firstName"
              v-model="firstName"
              placeholder="Ioana"
              type="text"
              variant="solo"
            ></v-text-field>
          </div>
          <div class="onboarding-form__item">
            <v-label>Last Name</v-label>
            <v-text-field
              name="lastName"
              v-model="lastName"
              placeholder="Popa"
              type="text"
              variant="solo"
            ></v-text-field>
          </div>
        </div>
        <div class="d-flex flex-row justify-space-between">
          <div class="onboarding-form__item">
            <v-label>Country</v-label>
            <v-text-field
              name="country"
              v-model="country"
              placeholder="Italy"
              type="text"
              variant="solo"
            ></v-text-field>
          </div>
          <div class="onboarding-form__item">
            <v-label>City</v-label>
            <v-text-field
              name="city"
              v-model="city"
              placeholder="Verona"
              type="text"
              variant="solo"
            ></v-text-field>
          </div>
        </div>
        <v-label>Address</v-label>
        <v-text-field
          name="address"
          v-model="address"
          placeholder="street Bla, nr 2, floor 3, apartment 23"
          type="text"
          variant="solo"
        ></v-text-field>
        <v-label>Phone</v-label>
        <v-text-field
          name="phone"
          v-model="phone"
          placeholder="+401234567890"
          type="text"
          variant="solo"
        ></v-text-field>
        <v-label>Birthdate</v-label>
        <v-text-field
          name="birthdate"
          v-model="birthdate"
          placeholder="14/01/2000"
          type="date"
          variant="solo"
        ></v-text-field>
        <v-btn @click="next" class="onboarding-form__button">Continue</v-btn>
      </v-form>
    </v-card-text>
  </div>
</template>

<script lang="ts">

import GoSkydivingLogo from "@/icons/GoSkydivingLogo.vue";
import axios from "axios";
import {server} from "@/consts/appConsts";
import router from "@/router";
import {defineComponent} from "vue";
export default defineComponent({
  name: "Onboarding",
  components: {
    GoSkydivingLogo
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      country: "",
      city: "",
      address: "",
      phone: "",
      birthdate: "",
      error: "",
    }
  },
  methods: {
    next(): void {
      const data = {
        name: this.firstName + " " + this.lastName,
        address: this.country + ", " + this.city + ", " + this.address,
        phone: this.phone,
        birthDate: this.birthdate
      };
      axios.post(`${server.baseURL}/add-user-data`, data).then(response => {
        if (response && response.data.success) {
          router.push("/onboarding-skydiver");
        } else {
          this.error = response.data.error;
        }
      });
    }
  }
});
</script>

<style  lang="scss">
.onboarding {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  &-container {
    background: #52b3d9;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    min-height: 700px;
    max-width: 600px;
    border-radius: 10px;
  }
  &-form {
    width: 400px;

    &__error {
      color: red;
      max-height: 20px;
      background: mistyrose;
      border-radius: 4px;
      padding: 0 4px !important;
      opacity: 0.8;
    }

    &__item {
      min-width: 190px;
    }

    &__button {
      display: flex;
      margin: auto;
      height: 56px !important;
    }

    .v-text-field input {
      background: white;
      border-radius: 4px;
    }
  }
}
</style>
