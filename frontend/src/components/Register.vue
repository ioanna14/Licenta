<template>
  <div class="register">
    <v-card-text class="register-container">
      <go-skydiving-logo class="mt-10"/>
      <v-card-title class="mt-5 mb-10">REGISTER</v-card-title>
      <v-form class="register-form" @submit.prevent="register">
        <v-label>Email</v-label>
        <v-text-field
          name="email"
          placeholder="email@adress.com"
          type="text"
          variant="solo"
        ></v-text-field>
        <v-label>Password</v-label>
        <v-text-field
          id="password"
          name="password"
          placeholder="passWord123!"
          type="password"
          variant="solo"
        ></v-text-field>
        <v-label>Confirm Password</v-label>
        <v-text-field
          id="confirmPassword"
          name="confirmPassword"
          placeholder="passWord123!"
          type="password"
          variant="solo"
        ></v-text-field>
        <v-btn @click="register" class="register-form__button">Register</v-btn>
      </v-form>
    </v-card-text>
  </div>
</template>

<script lang="ts">

import GoSkydivingLogo from "@/icons/GoSkydivingLogo.vue";
export default {
  name: "Register",
  components: {
    GoSkydivingLogo
  },
  methods: {
    register(): void {
      console.log("register")
    }
  }
}
</script>

<style  lang="scss">
.register {
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
    height: 700px;
    max-width: 600px;
    border-radius: 10px;
  }
  &-form {
    width: 400px;
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
