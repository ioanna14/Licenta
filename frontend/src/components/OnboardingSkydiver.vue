<template>
  <div class="onboarding">
    <v-card-text class="onboarding-container">
      <go-skydiving-logo class="mt-10"/>
      <v-card-title class="mt-5" :class="{'mb-10': currentFormIndex !== 0 && !error, 'mb-0': error}">{{currentForm.title}}</v-card-title>
      <v-card-text class="pa-0 onboarding-form__error mb-5" v-if="error">{{error}}</v-card-text>
      <v-form class="onboarding-form">
        <div v-for="item in currentForm.options" class="onboarding-form__item">
          <v-label>{{ item.label }}</v-label>
          <v-select
            v-if="item.type === 'dropdown'"
            placeholder="skydiver"
            variant="solo"
            :items="item.items"
            v-model="answers[item.name]"
          ></v-select>
          <v-file-input
            v-else-if="item.type === 'file'"
            :placeholder="item.placeholder"
            v-model="answers[item.name]"
          ></v-file-input>
          <v-text-field
            v-else
            :placeholder="item.placeholder"
            :type="item.type"
            variant="solo"
            v-model="answers[item.name]"
          ></v-text-field>
        </div>
        <v-btn @click="next" class="onboarding-form__button mb-10">Continue</v-btn>
      </v-form>
    </v-card-text>
  </div>
</template>

<script lang="ts">

import GoSkydivingLogo from "@/icons/GoSkydivingLogo.vue";
import onboardingSkydiverForm from "@/resources/onboarding.json";
import {defineComponent} from "vue";
import router from "@/router";
import axios from "axios";
import {server} from "@/consts/appConsts";
import Tesseract from "tesseract.js";

export default defineComponent({
  name: "OnboardingSkydiver",
  components: {
    GoSkydivingLogo
  },
  data() {
    return {
      currentForm: onboardingSkydiverForm[0],
      currentFormIndex: 0,
      answers: {} as any,
      error: "",
      userId: 0,
    };
  },
  mounted() {
    this.setAuthorizationKey();
    this.setUserId()
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
    next(): void {
      this.currentFormIndex = this.currentFormIndex + 1;
      // let foldings = null;
      // if (this.answers && this.answers.parachuteFolding) {
      //   foldings = this.performOcr(this.answers.parachuteFolding);
      // }
      this.answers['userId'] =this.userId;
      axios.post(`${server.baseURL}/${this.currentForm.request}`, this.answers).then(response => {
        console.log("response", response.data);
        if (response && response.data.success) {
          if (this.currentFormIndex < 5) {
            this.currentForm = onboardingSkydiverForm[this.currentFormIndex];
            this.answers = {};
          } else {
            console.log("nu ajunge aici???");
            router.push("/");
          }
        } else {
          this.error = response.data.error;
        }
      });
    },
    async performOcr(imagePath: File): Promise<string> {
      const result = await Tesseract.recognize(
        imagePath,
        'eng', // Language code for English
        {
          logger: (info) => console.log(info),
        },
      );
      return result.data.text;
    }
  },
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
    max-width: 600px;
    border-radius: 10px;
    min-height:400px;
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

  .v-field.v-field--appended {
    background: white;
  }
}
</style>
