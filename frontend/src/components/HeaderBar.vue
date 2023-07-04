<script lang="ts">
import {defineComponent} from 'vue'
import GoSkydivingLogo from "@/icons/GoSkydivingLogo.vue";

export default defineComponent({
  name: "HeaderBar",
  components: {GoSkydivingLogo},
  data () {
    return {
      headerBarItems: [{ title: "home"}, { title: "teaching"}, { title: "events"}, { title: "blabla"}, {title: "my profile"}],
    }
  }
})
</script>

<template>
  <v-app-bar class="header-bar" color="#76BAF9" height="60">
    <go-skydiving-logo class="header-bar__icon"/>
    <v-app-bar-title class="header-bar__title" v-for="item in headerBarItems">{{ item.title }}</v-app-bar-title>
  </v-app-bar>
</template>

<style scoped lang="scss">
.header-bar {
  &__icon {
    margin-left: 60px;
    margin-right: 30px;
    width: 50px;
    height: 50px;
  }

  &__title {
    max-width: 120px;
    margin-left: 0;
    text-align: center;
    font-family: "Comic Sans MS",sans-serif;
    color: whitesmoke;
  }
}
</style>
