// Define the type for the audio context
export const audioContext = new (window.AudioContext)();

// Define the type for the URL of the audio file
export function loadSound(url: string): Promise<AudioBuffer> {
  return fetch(url)
    .then((response) => response.arrayBuffer())
    .then((data) => audioContext.decodeAudioData(data));
}

// Function to play the sound
export function playSound(audioBuffer: AudioBuffer): void {
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  
  // Connect the source to the audio context's destination (e.g., speakers)
  source.connect(audioContext.destination);

  // Start playing the sound
  source.start();
}

// Example usage with your custom sound
// export loadSound('path/to/your-sound.mp3').then((audioBuffer) => {
//   playSound(audioBuffer);
// });