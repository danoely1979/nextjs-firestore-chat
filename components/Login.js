import Head from "next/head";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig.js";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return (
    <>
      <Head>
        <title>NextJS Firestore Chat - Login</title>
      </Head>

      <div className="w-full h-screen flex flex-1 justify-center items-center">
        <div className="w-full max-w-lg rounded h-1/2 border border-gray-100 flex flex-col items-center justify-center space-y-8 shadow-xl">
          <IoChatbubblesOutline className="h-32 w-32 text-gray-300" />
          <h2 className="text-2xl font-extrabold text-gray-800">
            NextJS Firestore Chat
          </h2>
          <button
            className="flex space-x-2 rounded-xl py-3 px-6 items-center bg-slate-200 hover:bg-slate-100 duration-200"
            onClick={() => signInWithGoogle("", { prompt: "select_account" })}
          >
            <FcGoogle className="w-10 h-10" />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </>
  );
}
