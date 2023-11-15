export const synth =
  typeof window === "undefined" ? undefined : window.speechSynthesis;

export function speak(text: string, cb?: () => void) {
  const utterance = new SpeechSynthesisUtterance(text);
  synth?.speak(utterance);

  utterance.onend = () => {
    if (cb) cb();
  };
}
