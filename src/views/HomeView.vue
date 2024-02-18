<template>
  <home-hero></home-hero>

  <v-container v-if="showUploadForm" fill-height class="my-10">
    <v-row>
      <v-col cols="12">
        <div class="d-flex flex-column justify-center align-center ">
          <h1 class="mb-5 text-grey-lighten-3">Start music stems separation</h1>
          <p class="lead mb-12 text-grey-darken-1">Separate voice from music out of a song free with powerful AI algorithms</p>
          <file-drop @files-selected="handleSelectedFiles"></file-drop>
          <div class="mt-10">
            <v-btn flat size="large" rounded="xl" color="#e36802" class="v-btn-large" @click="startProcessing">
              <span class="text-capitalize text-white">
                Start audio separation
              </span>
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-if="showUploadProcess" fill-height class="my-10">
    <v-row class="my-10">
      <v-col cols="12">
        <div class="d-flex flex-column justify-center align-center ">
          <h1 class="mb-5 text-grey-lighten-3">Uploading file</h1>
          <p class="lead mb-12 text-grey-darken-1">Please wait while we are uploading the audio file</p>
          <file-progress 
            :fileName="selectedFileName"
            :progressValue="uploadProgress"
            :progressText="uploadingText"
          ></file-progress>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-if="showSeparationProcess" fill-height class="my-10">
    <v-row class="my-10 pb-10">
      <v-col cols="12">
        <div class="d-flex flex-column justify-center align-center">
          <h1 class="mb-5 text-grey-lighten-3">Separating tracks with AI</h1>
          <p class="lead mb-12 text-grey-darken-1">Please wait while our AI separate tracks from the audio file</p>
          <v-progress-circular
            indeterminate
            color="purple"
            :size="150"
            :width="8"
          ></v-progress-circular>
          <p class="text-subtitle-1 text-center mt-4 text-grey-lighten-1">On progress ...</p>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-container v-if="showTrackList" fill-height class="my-10">
    <track-list :tracks="tracks"></track-list>
    <v-row class="mt-10">
      <v-col cols="12 d-flex justify-center">
            <v-btn flat size="large" rounded="xl" color="#211e49" class="v-btn-large" @click="cleanAll()">
          <span class="text-capitalize text-white">
            Clean and start with new song
          </span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import FileDrop from '@/components/FileDrop.vue'
import FileProgress from '@/components/FileProgress.vue'
import HomeHero from '@/components/HomeHero.vue'
import TrackList from '@/components/TrackList.vue'

import { splitAudio, startAudioSeparation } from '@/services/file-service';
import axios from 'axios';

export default {
  name: 'HomeView',
  data: () => ({
    tracks: [],
    showUploadForm: true,
    showUploadProcess: false,
    showSeparationProcess: false,
    showTrackList: false,
    uploadProgress: 0,
    uploadingText: 'Pending ...',
    errors:{
      fileUpload: false,
      audioSeparation: false
    },
    selectedFile: null,
  }),
  components:{
    FileDrop,
    HomeHero,
    TrackList,
    FileProgress
  },
  computed: {
    selectedFileName(){
      return this.selectedFile?.name || '';
    },
  },
  methods:{
    handleSelectedFiles(payload){
      console.log('file:');
      console.log(payload);
      this.selectedFile = payload;
    },
    cleanAll(){
      this.showTrackList = false;
      this.showUploadForm = true;
      this.tracks = [];
    },
    async startProcessing() {

      // File upload process
      this.showUploadForm = false;
      this.showUploadProcess = true;
      const uploadedFilePath = await this.uploadFile();

      if (uploadedFilePath == null ){
        console.log('Upload file failed');
        return;
      }

      // File processing process
      this.showUploadProcess = false;
      this.showSeparationProcess = true;
      const separationResult = await startAudioSeparation( axios, uploadedFilePath);

      if(separationResult == null){
        console.log('Error while separating audio');
        return;
      }

      this.tracks = separationResult.map( fileUrl => {
        const filename = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
        return { 
          title: filename, 
          src: fileUrl,
          isPlaying: false,
          muted: false,
        };
      });

      // Show result
      this.showSeparationProcess = false;
      this.showTrackList = true;
      
    },
    async uploadFile() {
      this.uploadProgress = 1;
      /* await new Promise(resolve => setTimeout(resolve, 2000));
      this.uploadProgress = 60;
      await new Promise(resolve => setTimeout(resolve, 2000));
      this.uploadProgress = 100; */

      console.log('Upload file in process');

      if (!this.selectedFile) {
          this.errorMessage = 'Please select an audio file.';
          return;
      }

      // Split the audio file (60 seconds)
      const audioBlob = splitAudio(this.selectedFile);
      const fileName = this.selectedFile.name;

      const formData = new FormData();
      formData.append('audio_file', audioBlob, fileName);

      try {
        this.uploadingText = 'Uploading ...';
        const url = 'http://v3.ms-backend.ixra1300.odns.fr/upload_file';
        const response = await axios.post( url , formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => { 
                this.uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total); 
            }
        });

        console.log(response);
        this.successMessage = 'File uploaded successfully.';
        this.uploadingText = this.successMessage;
        this.errorMessage = null;
        // Clear the file input
        this.selectedFile = null;
        return response.data.temp_path || null;
      } catch (error) {
          console.error('Error uploading file:', error);
          this.errorMessage = 'Error uploading file.';
          this.uploadingText = this.errorMessage;
          this.successMessage = null;
      }
    },
    async processAudioSeparation() { // test purpose
      await new Promise(resolve => setTimeout(resolve, 5000));
      const trackList = [
            { 
              title: 'drum.mp3', 
              src: 'http://localhost:8080/audio/drums.wav',
              isPlaying: false,
              muted: false,
            },
            { 
              title: 'other.mp3', 
              src: 'http://localhost:8080/audio/other.wav',
              isPlaying: false,
              muted: false,
            },
            { 
              title: 'vocals.mp3', 
              src: 'http://localhost:8080/audio/vocals.wav', 
              isPlaying: false,
              muted: false,
            },
          ];
      return {
        error: false,
        data: {
          public_urls: trackList,
        }
      }
    }
  }
}
</script>
