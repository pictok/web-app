import Image from "next/image";



export default function FriendList() {
  return (
    <div className="flex justify-center items-center py-4">
        <div className=" w-[350px] h-[90px] bg-white rounded-full shadow-lg flex items-center px-6"> 

        <Image
          src="/images/amy.png"
          alt="Amy"
          width={60}
          height={60}
          className="rounded-full"/>

        <div className="flex-grow">
          <h2 className="text-stone-900 text-xl font-semibold">Amy</h2>
          <p className="text-sm text-gray-500">Vancouver, BC</p>
        </div>
        <p className="text-stone-500">`{'>'}`</p>

        </div>
      </div>
  );
}
