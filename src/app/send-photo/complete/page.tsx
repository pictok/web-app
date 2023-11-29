"use client";
import { useEffect } from "react";
import Image from "next/image";
import { readCaption } from "@/lib/readCaption";
import BackButton from "@/components/design/BackButton";
import supabase from "@/db/supabase";
import { useSearchParams } from "next/navigation";

export default function Complete() {
  const params = useSearchParams();
  const image = params.get("image");
  useEffect(() => {
    const sendPhoto = async () => {
      const photo = {
        image_url: image,
        from_id: 1,
        to_id: 2,
      };
      await supabase.from("inbox").insert([photo]);
    };
    readCaption("Your photo has been sent successfully.");
    if (image) sendPhoto();
  }, [image]);

  return (
    <main className="mx-auto max-w-sm  px-2 py-5">
      <div className="relative flex items-center justify-center py-5">
        <BackButton />
        <h1 className="text-3xl font-bold">Isabella Bennett</h1>
      </div>
      <div className="mt-28 flex items-center justify-center px-5">
        <div className="relative h-[210px] w-[210px] overflow-hidden rounded-md">
          <Image
            className="object-cover"
            src="/images/assets/confirmationCheck.png"
            alt="Confirmation check icon"
            priority={true}
            fill={true}
          />
        </div>
      </div>
      <div className="mb-28 mt-5 flex flex-col">
        <h2 className="text-center text-[32px] font-bold">Congratulation!</h2>
        <p className="text-center text-2xl font-normal tracking-wide">
          Isabella will receive your photo shortly!
        </p>
      </div>

      {/* <Navbar /> */}
    </main>
  );
}
