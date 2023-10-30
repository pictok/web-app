import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import {supabase} from "@/db/supabase";
import { notFound } from "next/navigation";


Geist. 

import Link from "next/link";

export default async function Inbox({
  params: { share_id }} 
  : {
    params: { share_id: string };
  }) {

  if(!share_id) return notFound();

  let {data, error } = await supabase.from("image_audio").select("*").eq("share_id", share_id)

  if(error ||!data) return notFound();

  console.log(data);

  return (
    <main className="mx-auto max-h-screen max-w-lg overflow-hidden px-2">
      <div className="relative flex items-center justify-center py-5">
        <Link href="/" className="absolute left-2">
          <ChevronLeft />
        </Link>
        <h1 className="text-3xl font-bold">Inbox</h1>
      </div>

      <div className="h-[90vh] snap-y snap-mandatory overflow-y-scroll">
        {data.map((item, index) => (
          <div key={index} className="relative h-[90vh] w-full snap-center overflow-hidden bg-muted">
            <Image 
            src={item.image_url}
            alt="Palm trees on a beach"
            className="object-cover"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
