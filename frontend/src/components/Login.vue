<template>
  <div class="login">
    <v-card-text class="login-container">
      <go-skydiving-logo class="mt-10"/>
      <v-card-title class="mt-5" :class="{'mb-0': error, ' mb-10': !error}">LOGIN</v-card-title>
      <v-card-text class="pa-0 login-form__error mb-5" v-if="error">{{error}}</v-card-text>
      <v-form class="login-form" @submit.prevent="login">
        <v-label>Email</v-label>
        <v-text-field
          v-model="email"
          name="email"
          placeholder="email@adress.com"
          type="text"
          variant="solo"
        ></v-text-field>
        <v-label>Password</v-label>
        <v-text-field
          v-model="password"
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
import {defineComponent} from "vue";

import {validateEmail, validatePassword} from "@/helpers/validators";
import axios from "axios";
import { server } from "@/consts/appConsts";
import router from "@/router";
import {setAxiosHeader} from "@/helpers/userSession";
export default defineComponent({
  name: "Login",
  components: {
    GoSkydivingLogo
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
    }
  },
  methods: {
    login(): void {
      if (validateEmail(this.email) && validatePassword(this.password)) {
        const data = {email: this.email, password: this.password};
        axios.post(`${server.baseURL}/login`, data).then(response => {
          if (response && response.data.success) {
            if (response.data.access_token) {
              document.cookie="key=" + response.data.access_token;
            }
            if (response.data.user_id) {
              document.cookie="user_id=" + response.data.user_id;
            }
            router.push("/");
          } else {
            this.error = response.data.error;
          }
        });
      } else {
        this.error = "Invalid email or password!";
      }
    },
    forgotPassword(): void {
      console.log("forgot password");
    }
  }
});
</script>

<style  lang="scss">
.login {
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

    &__error {
      color: red;
      max-height: 20px;
      background: mistyrose;
      border-radius: 4px;
      padding: 0 4px !important;
      opacity: 0.8;
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
