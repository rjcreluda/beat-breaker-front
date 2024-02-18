
// Split first 60 sec of an audio file
export const splitAudio = ( file ) => {
    // Calculate the bitrate (bits per second)
    //const bitrate = file.size * 8 / file.duration;

    // Calculate the endByte for the first 60 seconds
    const startByte = 0;
    const durationInSeconds = 60;
    //const endByte = startByte + (durationInSeconds * bitrate / 8);
    const endByte = durationInSeconds * 1000 * 16;

    // Split the audio file (first 60 seconds)
    const output = file.slice(startByte, endByte);
    
    return output;
};

export const startAudioSeparation = async ( axios, uploadedFilePath ) => {

    if( !uploadedFilePath ) return;

    const BACKEND_URL = 'http://v3.ms-backend.ixra1300.odns.fr';

    const formData = new FormData();
    formData.append('file_path', uploadedFilePath);

    let response = null;

    try{
        const result = await axios.post('http://v3.ms-backend.ixra1300.odns.fr/separate_track', formData );
        console.log( result );
        response = result.data?.public_urls?.map( path => `${BACKEND_URL}${path}`);

    } catch(error){
        console.error('Error during audio separation');
        console.log( error );
    } 

    return response;
    
};