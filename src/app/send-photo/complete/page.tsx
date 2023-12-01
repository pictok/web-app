"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { readCaption } from "@/lib/readCaption";
import BackButton from "@/components/design/BackButton";
import supabase from "@/db/supabase";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/design/Navbar";
import { getCurrentUser } from "@/db/auth/getCurrentUser";
import { getUser } from "@/db/auth/getUser";
import { Friend } from "@/app/friends/page";

export default function Complete() {
  const params = useSearchParams();
  const [friend, setFriend] = useState<Friend | null>(null);

  const image = params.get("image");
  const friendId = Number(params.get("friend"));

  useEffect(() => {
    readCaption("Your photo has been sent successfully.");
  }, []);

  useEffect(() => {
    getUser(friendId).then((data) => setFriend(data.user));
  }, [friendId]);

  useEffect(() => {
    const sendPhoto = async () => {
      const { user } = await getCurrentUser();
      const photo = {
        image_url: image,
        from_id: user.id || 1,
        to_id: friendId,
      };
      await supabase.from("inbox").insert([photo]);
    };
    if (image) sendPhoto();
  }, [image, friendId]);

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-between px-5 py-5">
      <div>
        <div className="relative flex items-center justify-center py-5">
          <BackButton />
          {friend && <h1 className="text-3xl font-bold">{friend.name}</h1>}
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
          {friend && (
            <p className="text-center text-2xl font-normal tracking-wide">
              {friend.name} will receive your photo shortly!
            </p>
          )}
        </div>
      </div>
      <div>
        <Navbar />
      </div>
    </main>
  );
}
