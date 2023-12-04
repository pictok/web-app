"use client";

import { useEffect, useState } from "react";

export default function ImageProcessingComplete() {
  const [synth, setSynth] = useState<SpeechSynthesis | null>();
  useEffect(() => {
    setSynth(window.speechSynthesis);
  }, []);
  useEffect(() => {
    if (synth) {
      const utterance = new SpeechSynthesisUtterance(
        "Your photo has been sent successfully.",
      );
      synth.speak(utterance);
    }
  }, [synth]);
  return <></>;
}
