<template>
  <div class="login">
    <v-card-text class="login-container">
      <go-skydiving-logo class="mt-10"/>
      <v-card-title class="mt-5 mb-10">LOGIN</v-card-title>
      <v-form class="login-form" @submit.prevent="login">
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
        <v-card-text @click="forgotPassword" class="d-flex justify-end pt-0 login-form__link login-form__link-position">Forgot your password?</v-card-text>
        <v-btn @click="login" class="login-form__button">Login</v-btn>
        <v-divider class="mt-8 mb-8"></v-divider>
        <v-card-subtitle class="d-flex justify-center login-form__subtitle">Need an account,<a href="/register"  class="login-form__link">register</a>?</v-card-subtitle>
      </v-form>
    </v-card-text>
  </div>
</template>

<script lang="ts">

import GoSkydivingLogo from "@/icons/GoSkydivingLogo.vue";
export default {
  name: "Login",
  components: {
    GoSkydivingLogo
  },
  methods: {
    login(): void {
      console.log("login")
    },
    forgotPassword(): void {
      console.log("forgot password");
    }
  }
}
</script>

<style  lang="scss">
.login {
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

    &__subtitle{
      color: black;
      font-weight: 500;
      font-size: 17px;
      opacity: 1;
    }

    &__link {
      text-decoration: none;
      color: #0055FF;
    }

    &__link-position {
      margin-top: -15px;
    }

    .v-text-field input {
      background: white;
      border-radius: 4px;
    }
  }
}
</style>
