<template>
  <div class="onboarding">
    <v-card-text class="onboarding-container">
      <go-skydiving-logo class="mt-10"/>
      <v-card-title class="mt-5" :class="{' mb-10': currentFormIndex !== 0}">{{currentForm.title}}</v-card-title>
      <v-form class="onboarding-form" @submit.prevent="next">
        <div v-for="item in currentForm.options" class="onboarding-form__item">
          <v-label>{{ item.label }}</v-label>
          <v-select
            v-if="item.type === 'dropdown'"
            placeholder="skydiver"
            variant="solo"
            :items="item.items"
          ></v-select>
          <v-text-field
            v-else
            :placeholder="item.placeholder"
            :type="item.type"
            variant="solo"
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

export default defineComponent({
  name: "OnboardingSkydiver",
  components: {
    GoSkydivingLogo
  },
  data() {
    return {
      currentForm: onboardingSkydiverForm[0],
      currentFormIndex: 0,
    };
  },
  methods: {
    next(): void {
      this.currentFormIndex = this.currentFormIndex + 1;
      if (this.currentFormIndex < 5) {
        this.currentForm = onboardingSkydiverForm[this.currentFormIndex];
      } else {
        router.push("/");
      }
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
    background: #76BAF9;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
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
