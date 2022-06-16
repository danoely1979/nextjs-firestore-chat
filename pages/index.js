import Head from "next/head";
import { IoChatbubblesOutline } from "react-icons/io5";
import SideBar from "../components/chat/SideBar";

export default function Home() {
  return (
    <>
      <Head>
        <title>NextJS Firestore Chat</title>
      </Head>

      <div className="w-full grid grid-cols-8">
        <div className="col-span-2">
          <SideBar />
        </div>

        <div className="col-span-6 h-screen flex justify-center">
          <div className="flex flex-col justify-center items-center space-y-4">
            <IoChatbubblesOutline className="h-24 w-24 text-gray-300" />
            <p className="text-2xl text-gray-300">Start a conversation</p>
          </div>
        </div>
      </div>
    </>
  );
}
