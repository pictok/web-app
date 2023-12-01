"use client";

type ImageWithSoundProps = {
  image_url: string;
  audio_url: string;
  caption: string;
  className?: string;
};

export default function ImageWithSound({
  image_url,
  audio_url,
  caption,
}: ImageWithSoundProps) {
  const audio = new Audio(audio_url);
  const playAudio = () => {
    audio.play();
  };
  return (
    <div className="flex justify-center">
      <img onClick={playAudio} src={image_url} alt={caption} />
    </div>
  );
}
