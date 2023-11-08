export async function readCaption(caption: string) {
  return new Promise((resolve, reject) => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = caption;

    // Configure the speech settings if needed (e.g., voice, rate, pitch).
    // speech.voice = speechSynthesis.getVoices()[0];
    // speech.rate = 1;
    // speech.pitch = 1;

    // Add the speech to the queue and speak it.
    window.speechSynthesis.speak(speech);
    speech.onend = () => {
      resolve("Done reading caption");
    };
  });
}
