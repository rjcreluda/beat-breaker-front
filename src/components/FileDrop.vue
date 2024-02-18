<template>
    <v-sheet
      tabindex="0"
      title="Click to grap a file from your PC!"
      color="#ffffff14"
      width="100%"
      height="300"
      class="pa-2 mb-4 d-flex flex-column justify-center align-center py-10 custom-sheet"
    >
        <input type="file" accept="audio/mpeg, audio/wav" style="display:none;" />
        <v-avatar size="60" color="#bd07b0">
            <v-icon size="32" color="#ffa8e0">mdi-music</v-icon>
        </v-avatar>

        <strong class="text-white mt-1">{{ fileName }}</strong>
       
        <v-btn  color="#8b56f6" rounded flat class="mt-4 text-capitalize">
            Select audio file
        </v-btn>
        <p class="text-center mt-4 text-grey-lighten-1">Or Drop file here</p>
    </v-sheet>
</template>

<script>
export default {
    name: 'FileDrop',
    data: () => ({
        dragover: false,
        fileName: null,
    }),
    methods:{
        selectedFiles( files ){
            this.dragover = false;
            this.fileName = files[0]?.name;
            this.$emit('files-selected', files[0] );
        }
    },
    mounted () {
        const dropzone = this.$el
        const fileupload = this.$el.firstElementChild
        console.log(fileupload)

        // register listeners on your dropzone / v-sheet
        if(dropzone) {
            // Gegister click event
            dropzone.addEventListener("click", (e) => { // eslint-disable-line no-unused-vars
                //e.preventDefault()
                if(fileupload) {
                    fileupload.click()
                }
            });
            // register listeners on the file input
            if(fileupload) {
                fileupload.addEventListener("change", e => {
                    const target = (e.target)
                    if(target.files) {
                        this.selectedFiles(target.files);
                    }
                });
            }
            // register all drag & drop event listeners
            dropzone.addEventListener("dragenter", e => {
                e.preventDefault()
                this.dragover = true
            })
            dropzone.addEventListener("dragleave", e => {
                e.preventDefault()
                this.dragover = false
            })
            dropzone.addEventListener("dragover", e => {
                e.preventDefault()
                this.dragover = true
            })
            dropzone.addEventListener("drop", e => {
                e.preventDefault()
                const dragevent = e
                if(dragevent.dataTransfer) {
                    this.selectedFiles(dragevent.dataTransfer.files)
                }
            })
        }
    }
}
</script>

<style scoped>
.custom-sheet {
  border: 2px dashed #100e25;
  border-radius: 30px; /* Adjust as needed */
}
</style>