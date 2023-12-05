import Image from "next/image";
import { cookies } from "next/headers";

import BackButton from "@/components/design/BackButton";
import { supabaseKey, supabaseUrl } from "@/db/supabase";

import Navbar from "@/components/design/Navbar";

import { createServerClient } from "@supabase/ssr";
import { notFound, redirect } from "next/navigation";
import ImageProcessingComplete from "./imageProcessingComplete";

export default async function Complete({
  searchParams,
}: {
  searchParams: { image: string; friend: string };
}) {
  const friendId = Number(searchParams.friend);
  const image = searchParams.image;

  const cookieStore = cookies();
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
    },
  });

  const { data: friend, error: friendError } = await supabase
    .from("profile")
    .select("*")
    .eq("id", friendId)
    .single();

  if (friendError) {
    console.log("Error getting user", friendError);
    return;
  }
  if (!friend) {
    console.log("No friend exist");
    notFound();
  }

  const { data, error: authError } = await supabase.auth.getSession();

  if (authError) {
    console.error(authError);
    return;
  }

  if (!data || !data.session) {
    console.log("No current user");
    redirect("/login");
  }

  const { data: user, error: userError } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", data.session.user.id)
    .single();

  if (userError) {
    console.log("Error getting current user");
    return;
  }
  if (!user) {
    console.log("No current user");
    redirect("/login");
  }

  const photo = {
    image_url: image,
    from_id: user.id || 1,
    to_id: friend.id,
  };
  await supabase.from("inbox").insert([photo]);

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-between px-5 py-5">
      <ImageProcessingComplete />
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
