"use client";
import { Button } from "@/components/ui/button";

export default function LambdaTest() {
  const handleClick = async () => {
    const res = await fetch(
      "https://tjv5dlrj1a.execute-api.us-west-2.amazonaws.com/default/pictok-text-to-sound",
      {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({ caption: "A dog is barking" }),
      },
    );
    const { output } = await res.json();
    console.log(output);
  };
  return (
    <div className="container p-5">
      <Button onClick={handleClick}>Test</Button>
    </div>
  );
}
