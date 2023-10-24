import Image from "next/image";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

export default function Logo() {
  return (
    <div className="flex">
      <span className={"mt-auto text-xl font-bold " + nunito.className}>
        PicTok
      </span>
      <Image
        src="/images/assets/pictok.png"
        className="mb-5"
        alt="Pictok Logo"
        width={40}
        height={40}
      />
    </div>
  );
}
