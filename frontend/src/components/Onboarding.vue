<template>
  <div class="onboarding">
    <v-card-text class="onboarding-container">
      <go-skydiving-logo class="mt-10"/>
      <v-card-title class="mt-5 mb-10">LET'S GO SKYDIVING</v-card-title>
      <v-form class="onboarding-form" @submit.prevent="next">
        <div class="d-flex flex-row justify-space-between">
          <div class="onboarding-form__item">
            <v-label>First Name</v-label>
            <v-text-field
              name="firstName"
              placeholder="Ioana"
              type="text"
              variant="solo"
            ></v-text-field>
          </div>
          <div class="onboarding-form__item">
            <v-label>Last Name</v-label>
            <v-text-field
              name="lastName"
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
              placeholder="Italy"
              type="text"
              variant="solo"
            ></v-text-field>
          </div>
          <div class="onboarding-form__item">
            <v-label>City</v-label>
            <v-text-field
              name="city"
              placeholder="Verona"
              type="text"
              variant="solo"
            ></v-text-field>
          </div>
        </div>
        <v-label>Address</v-label>
        <v-text-field
          name="address"
          placeholder="street Bla, nr 2, floor 3, apartment 23"
          type="text"
          variant="solo"
        ></v-text-field>
        <v-label>Phone</v-label>
        <v-text-field
          name="phone"
          placeholder="+401234567890"
          type="text"
          variant="solo"
        ></v-text-field>
        <v-label>Birthdate</v-label>
        <v-text-field
          name="birthdate"
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
export default {
  name: "Onboarding",
  components: {
    GoSkydivingLogo
  },
  data() {
    return {
      firstForm: false,
    }
  },
  methods: {
    next(): void {
      console.log("nextt")
    }
  }
}
</script>

<style  lang="scss">
.onboarding {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  &-container {
    background: #76BAF9;
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
