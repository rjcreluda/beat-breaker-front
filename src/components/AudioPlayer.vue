<template>
  <div class="player-card mb-3">
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <div class="d-flex">
            <v-icon color="white" class="me-2 mt-3">mdi-equalizer</v-icon>
            <strong style="line-height: 50px;">
              {{ title }}
            </strong>
            <v-spacer></v-spacer>
            <v-btn icon variant="text" @click="mute()" color="#370b61">
              <v-icon v-if="muted" color="red-lighten-1" large>mdi-volume-mute</v-icon>
              <v-icon v-else color="white" large>mdi-volume-high</v-icon>
            </v-btn>
            <v-btn 
              icon 
              variant="text"
              @click="download()" 
              :disabled="true"
            >
              <v-icon color="white" large>mdi-download</v-icon>
            </v-btn>
          </div>
        </v-col>
        
      </v-row>
      <div :id="elementId">
      </div>
      <div v-if="loading">
        <v-progress-linear 
        indeterminate
        bg-color="pink-lighten-3" 
        color="pink-lighten-1" 
        :model-value="loadingProgress"></v-progress-linear>
      </div>
    </v-card-text>
  </div>
  
</template>

<script>

import WaveSurfer from 'wavesurfer.js'

export default {
  name: 'AudioPlayer',
  props: {
    title: { type: String, required: true },
    url: { type: String, required: true },
    height: { type: Number, required: false },
    waveColor: { type: String, required: false },
    progressColor: { type: String, required: false },
  },
  data: () => ({
    wavesurfer: null,
    elementId: 'el-'+Math.random().toString(36).substr(2, 9),
    loading: false,
    loadingProgress: 0,
    muted: false,
  }),
  methods:{
    playPause() {
      this.wavesurfer.playPause();
    },
    download(){},
    mute(){
      this.muted = !this.muted;
      this.wavesurfer.setMuted(this.muted);
    },
  },
  mounted(){
    this.wavesurfer = WaveSurfer.create({
      container: '#'+this.elementId,
      waveColor: this.waveColor || '#ccc',
      progressColor: this.progressColor || '#ffa500',
      height: this.height || 'auto',
      url: this.url,
    });
    this.wavesurfer.on('interaction', () => {
      this.wavesurfer.play();
    });
    this.wavesurfer.on('loading', ( progress ) => {
      this.loading = true;
      this.loadingProgress = progress;
    });
    this.wavesurfer.on('ready', () => {
      this.loading = false;
      this.$emit('ready', this.url);
    });
  },
  beforeUnmount() {
    // Clean up WaveSurfer instance
    this.wavesurfer.destroy();
  },

}
</script>

<style scoped>
.player-card {
  box-shadow: 2px 5px 15px rgba(9, 9, 9, 0.05);
  border-radius: 28px;
  width: 100%;
  margin: auto;
  background-color: #370b61;
  color: #fff;
}
</style>