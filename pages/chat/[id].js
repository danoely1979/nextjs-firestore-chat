import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { query, orderBy, collection, doc } from "firebase/firestore";
import { auth, db } from "../../firebaseconfig.js";
import Head from "next/head";
import SideBar from "../../components/chat/SideBar";
import Topbar from "../../components/chat/TopBar";
import MessageBubble from "../../components/chat/MessageBubble";
import BottomBar from "../../components/chat/BottomBar";
import { CgSpinner } from "react-icons/cg";
import { IoChatbubblesOutline } from "react-icons/io5";

export default function Chat() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { id } = router.query;
  const bottomOfChat = useRef(null);

  const q = query(
    collection(db, "chats", id, "messages"),
    orderBy("timestamp")
  );
  const [messages, loading] = useCollectionData(q);
  const [chat] = useDocumentData(doc(db, "chats", id));

  const getOtherUser = (users, currentUser) => {
    return users?.filter((user) => user !== currentUser.email);
  };

  useEffect(() => {
    setTimeout(
      bottomOfChat?.current?.scrollIntoView({
        behavior: "auto",
        block: "start",
      }),
      10
    );
  }, [messages]);

  return (
    <>
      <Head>
        <title>NextJS Firestore Chat</title>
      </Head>
      <div className="w-full grid grid-cols-8">
        <div className="col-span-2">
          <SideBar selectedChatId={id} />
        </div>
        <div className="col-span-6 flex flex-1 flex-col h-screen w-full border-r border-gray-200">
          <Topbar email={getOtherUser(chat?.users, user)} />

          <div className="flex max-h-screen h-full w-full mb-2 pt-4 px-6 overflow-y-scroll no-scrollbar">
            <div className="flex flex-col h-full w-full">
              {loading && (
                <div className="flex flex-1 justify-center items-center">
                  <CgSpinner className="h-12 w-12 animate-spin text-gray-400" />
                </div>
              )}

              {!messages?.length > 0 && !loading && (
                <div className="flex flex-1 flex-col justify-center items-center">
                  <IoChatbubblesOutline className="h-24 w-24 text-gray-300" />
                  <p className="text-2xl tracking-tight text-gray-300 font-medium">
                    Start the conversation
                  </p>
                </div>
              )}
              {messages?.map((msg, index) => (
                <MessageBubble
                  user={user}
                  message={msg}
                  key={index}
                  numberOfMessages={messages?.length}
                  currentMessageIndex={index}
                />
              ))}
              <div ref={bottomOfChat} className="py-8"></div>
            </div>
          </div>

          <BottomBar user={user} chatId={id} />
        </div>
      </div>
    </>
  );
}
