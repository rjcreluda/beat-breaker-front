<template>
    <v-sheet
      title="Please wait ..."
      color="#0f0e25"
      width="100%"
      height="300"
      class="pa-2 d-flex flex-column justify-center align-center py-10 custom-sheet"
    >
        <p class="text-grey-lighten-1 text-center mb-3">{{ fileName }}</p>
       
        <v-progress-circular
        :rotate="360"
        :size="150"
        :width="10"
        :model-value="progressValue"
        color="pink"
        >
        {{  progressValue }}
        </v-progress-circular>
        <p class="text-subtitle-1 text-center mt-4">{{ progressText }}</p>
    </v-sheet>
</template>

<script>
export default {
    name: 'FileProgress',
    props: {
        progressText: { type: String, required: false },
        fileName: { type: String, required: false },
        progressValue: { type: Number, required: true }
    }
}
</script>

<style scoped>
.custom-sheet {
  border-radius: 30px;
  box-shadow: 0 0 20px rgba(255,255,255,0.1);
}
</style>