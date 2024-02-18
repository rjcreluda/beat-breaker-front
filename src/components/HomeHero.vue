<template>
    <v-parallax
    height="450"
    src="images/abstract-audio-wav-bg.jpg"
    >
      
      <div class="d-flex flex-column fill-height justify-center text-white ps-5">
        <h1 class="text-h4 font-weight-thin mb-4">
          BREAK
        </h1>
        <h1 class="text-h4 font-weight-thin mb-4">
          ANY
        </h1>
        <h1 class="text-h4 font-weight-thin mb-4">
          BEAT OR SONG
        </h1>
        <h4 class="subheading">
          Get Stems from any beat or song separated into drum, bass, vocals and synth song
        </h4>
      </div>
    </v-parallax>
</template>

<script>

//import AppNavigation from './AppNavigation.vue'

export default {
    name: 'HomeHero',
    components:{
        //AppNavigation
    }
}
</script>

<style scoped>

@media (min-width: 768px) {
  .v-parallax {
    height: 600px !important;
  }
}
</style>