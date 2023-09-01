<template>
  <div class="register">
    <v-card-text class="register-container">
      <go-skydiving-logo class="mt-10"/>
      <v-card-title class="mt-5" :class="{'mb-0': error, ' mb-10': !error}">REGISTER</v-card-title>
      <v-card-text class="pa-0 register-form__error mb-5" v-if="error">{{error}}</v-card-text>
      <v-form class="register-form" @submit.prevent="register">
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
        <v-label>Confirm Password</v-label>
        <v-text-field
          v-model="confirmPassword"
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
import {validateEmail, validatePassword} from "@/helpers/validators";
import axios from "axios";
import {server} from "@/consts/appConsts";
import router from "@/router";
import {defineComponent} from "vue";
export default defineComponent({
  name: "Register",
  components: {
    GoSkydivingLogo
  },
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
    }
  },
  methods: {
    register(): void {
      if (validateEmail(this.email) && validatePassword(this.password) && this.password === this.confirmPassword) {
        const data = {email: this.email, password: this.password};
        axios.post(`${server.baseURL}/register`, data).then(response => {
          if (response && response.data.success) {
            if (response.data.access_token) {
              document.cookie="key=" + response.data.access_token;
            }
            if (response.data.user_id) {
              document.cookie="user_id=" + response.data.user_id;
            }
            router.push("/onboarding");
          } else {
            this.error = response.data.error;
          }
        });
      } else {
        this.error = "Invalid email or password!";
      }
    }
  }
});
</script>

<style  lang="scss">
.register {
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

    .v-text-field input {
      background: white;
      border-radius: 4px;
    }
  }
}
</style>
