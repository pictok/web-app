import Image from "next/image";

export default function Gesture({
  message,
  gifName,
}: {
  message: string;
  gifName: string;
}) {
  return (
    <div className="flex h-[90vh] w-full flex-col items-center justify-center bg-[#FEFFFF99] backdrop-blur">
      <p className="text-2xl">{message}</p>
      <div className="relative h-40 w-40">
        <Image
          src={`/images/gestures/${gifName}.gif`}
          alt="Swipe right gesture"
          fill
        />
      </div>
    </div>
  );
}
