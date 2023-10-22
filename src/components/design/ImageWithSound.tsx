"use client";

type ImageWithSoundProps = {
  image_url: string;
  audio_url: string;
};

export default function ImageWithSound({
  image_url,
  audio_url,
}: ImageWithSoundProps) {
  const audio = new Audio(audio_url);
  const playAudio = () => {
    audio.play();
  };
  return <img onClick={playAudio} src={image_url} />;
}
