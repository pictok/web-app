export const synth = window ? window.speechSynthesis : undefined;

export function speak(text: string, cb?: () => void) {
  const utterance = new SpeechSynthesisUtterance(text);
  synth?.speak(utterance);

  utterance.onend = () => {
    if (cb) cb();
  };
}
