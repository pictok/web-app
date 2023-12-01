import Image from "next/image";

export default function Gesture({
  message,
  gifName,
}: {
  message: string;
  gifName: string;
}) {
  return (
    <div className="flex h-[90vh] w-full flex-col items-center justify-center bg-[#FEFFFF99] backdrop-blur dark:bg-[#00000091]">
      <p className="text-2xl text-black dark:text-white">{message}</p>
      <div className="relative h-40 w-40">
        <Image src={`/images/gestures/${gifName}.gif`} alt={message} fill />
      </div>
    </div>
  );
}
