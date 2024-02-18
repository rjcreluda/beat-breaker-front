<template>
  <div class="track-list px-2">

    <v-row class="mb-4">
      <v-col cols="4">
        <h2 class="font-size-display-1 font-weight-light text-white">
          Your Resuts 
        </h2>
      </v-col>
      <v-col v-if="noTrack" cols="12">
        <p class="lead text-amber-darken-2">No track available</p>
      </v-col>
      <v-col v-else cols="8" class="px-0">
        <div class="d-flex justify-end">
          <v-btn flat icon rounded="xl" size="large" @click="playAll" :disabled="!isAllAudiosReady" text-transform="none" color="blue-lighten-1">
            <template v-if="!isPlayingAll">
              <v-icon large>mdi-play</v-icon>
            </template>
            <template v-else>
              <v-icon large>mdi-pause</v-icon>
            </template>
            
          </v-btn>
          <v-btn flat icon size="large" rounded="xl" @click="stopAll" class="ms-3" :disabled="buttonStopDisabled" color="pink-darken-1">
            <v-icon large>mdi-stop</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <v-row v-for="audio in audios" :key="audio.title">
        <audio-player 
          :title="audio.title"
          :ref="audio.title"
          :url="audio.src" 
          :height="25"
          @ready="audioReady"
          waveColor="#fff"
        ></audio-player>
    </v-row>
    
  </div>
</template>

<script>

import AudioPlayer from './AudioPlayer.vue';

export default {
  components: { AudioPlayer },
  name: 'TrackList',
  props: {
    tracks: { default: [] }
  },
  data: () => ({
    isPlayingAll: false,
    audios: [],
    wavesurfer: null
  }),
  computed:{
    isAllAudiosReady(){
      let isReady = true;
      for (const audio of this.audios) {
        if(!audio.ready){
          isReady = false;
          break;
        }
      }
      return isReady;
    },
    buttonStopDisabled(){
      return !this.isPlayingAll || !this.isAllAudiosReady;
    },
    noTrack(){
      return this.tracks.length == 0
    },
  },
  created() {
    this.audios = this.tracks;
  },
  mounted(){
    for (const audio of this.audios) {
        this.initAudioElement(audio);
      }
  },
  methods:{
    audioReady(audioSource){
      for (const audio of this.audios) {
        if( audio.src == audioSource ){
          console.log(`setting audio ready: ${audioSource}`)
          audio.ready = true;
        }
      }
    },
    initAudioElement(audio){
      audio.audioElement = this.$refs[`${audio.title}`][0].wavesurfer;
      audio.ready = false;
    },
    playAll() {
      this.isPlayingAll = !this.isPlayingAll;
      for (const audio of this.audios) {
        this.playPause(audio);
      }
    },
    stopAll() {
      for (const audio of this.audios) {
        audio.audioElement.stop();
        audio.isPlaying = false;
      }
      this.isPlayingAll = false;
    },
    playPause(audio) {
      if (!audio.audioElement) {
        audio.audioElement = new Audio(audio.src);
      }
      if (audio.isPlaying) {
        audio.audioElement.pause();
        audio.isPlaying = false;
      } else {
        audio.audioElement.play();
        audio.isPlaying = true;
      }
    },
    download(audio){
      console.log(audio)
    },
    mute(audio){
      if (!audio.audioElement) {
        audio.audioElement = new Audio(audio.src);
      }

      audio.muted = !audio.muted;
      //audio.audioElement.muted = audio.muted;
      audio.audioElement.setMuted(audio.muted);
    }
  }
}
</script>

<style scoped>

.canvas-wrapper {
  width: 100%;
  /* display: flex; */
  border-radius: 28px;
  overflow: hidden;
}

.v-btn{
  box-shadow: 2px 5px 15px rgba(9, 9, 9, 0.05);
}

@media screen and ( min-width: 750px ) {
  .track-list{
    width: 80%;
    margin: auto;
  }
}
</style>