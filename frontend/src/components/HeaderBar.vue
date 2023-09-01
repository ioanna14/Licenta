<script lang="ts">
import {defineComponent} from 'vue'
import GoSkydivingLogo from "@/icons/GoSkydivingLogo.vue";
import router from "@/router";

export default defineComponent({
  name: "HeaderBar",
  components: {GoSkydivingLogo},
  data () {
    return {
      headerBarItems: [
        { title: "home", link: "/"},
        { title: "teaching", link: "/teaching"},
        { title: "events", link: "/events"},
        {title: "profile", link: "/profile"}
      ],
    }
  },
  methods: {
    goToPage(link: string): void {
      router.push(link);
    }
  }
})
</script>

<template>
  <v-app-bar class="header-bar" color="#52b3d9" height="60">
    <go-skydiving-logo class="header-bar__icon"/>
    <div class="header-bar__sections">
      <v-app-bar-title class="header-bar__sections-title" v-for="item in headerBarItems" @click="goToPage(item.link)">{{ item.title }}</v-app-bar-title>
    </div>
  </v-app-bar>
</template>

<style scoped lang="scss">
.go-skydiving-icon {
  width: 50px !important;
  height: 50px !important;
}
.header-bar {
  &__icon {
    margin-left: 20%;
    margin-right: 30px;
    width: 50px;
    height: 50px;
  }

  &__sections {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 55%;

    &-title {
      max-width: 120px;
      margin-left: 0;
      text-align: center;
      font-family: "Comic Sans MS",sans-serif;
      color: #eeeeee;
    }
  }
}
</style>
