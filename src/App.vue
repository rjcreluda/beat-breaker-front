<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/test"> Test |</router-link>
    <router-link to="/todos"> Todos |</router-link>
    <router-link to="/about"> About us</router-link>
  </nav>
  <router-view/> -->
  <v-app>
      <app-navigation></app-navigation>
    <v-content transition="slide-x-transition">
        <router-view></router-view>
    </v-content>
  </v-app>
</template>


<script>
import AppNavigation from './components/AppNavigation.vue'

export default {
  name: 'App',
  components:{
    AppNavigation
  },
  computed: {
    isHome(){
      return this.$route.path == '/'
    }
  }
}
</script>

<style>
v-content {
  background-color: #100e26; /* #fcfdfe; */
}
</style>

