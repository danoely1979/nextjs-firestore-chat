import { auth, db } from "../../firebaseconfig.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import ChatListItem from "./ChatListItem.js";
import Image from "next/image";
import { CgSpinner } from "react-icons/cg";
import { IoCreateOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

export default function SideBar({ selectedChatId }) {
  const [user, loading] = useAuthState(auth);
  const [snapshot] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const router = useRouter();

  const logout = () => {
    signOut(auth);
    router.push(`/`);
  };

  const chatExists = (email) =>
    chats?.find(
      (chat) => chat.users.includes(user.email) && chat.users.includes(email)
    );

  const newChat = async () => {
    const input = prompt("Enter recipients email");

    if (!chatExists(input) && input !== user.email && input) {
      await addDoc(collection(db, "chats"), {
        users: [user.email, input],
        timestamp: serverTimestamp(),
      });
    }
  };

  if (!user)
    return (
      <div className="flex justify-center mt-10">
        <CgSpinner className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );

  return (
    <div className="flex flex-col w-full h-screen items-start bg-gray-50 border-l border-r border-gray-200">
      <div className="flex justify-between items-center space-x-2 p-4 font-bold border-b border-gray-200 w-full text-xl">
        <div className="flex items-center space-x-2">
          <Image
            src={user?.photoURL}
            alt={user?.displayName}
            title={user?.displayName}
            width={40}
            height={40}
            className="rounded-lg object-cover"
          />
          <span>{user?.displayName}</span>
        </div>
        <button
          className="flex items-center text-sm space-x-2 font-medium"
          onClick={() => logout()}
        >
          <span>Logout</span>
          <FiLogOut className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4 w-full">
        <button
          className="flex w-full justify-center text-base font-semibold space-x-2 rounded-xl py-3 px-6 items-center bg-slate-300/50 hover:bg-slate-200 duration-200"
          onClick={() => newChat()}
        >
          <IoCreateOutline className="w-5 h-5" />
          <span>New Chat</span>
        </button>
      </div>
      <div className="w-full overflow-x-scroll no-scrollbar pb-36">
        {!loading &&
          chats
            ?.filter((chat) => chat.users.includes(user?.email))
            .map((chat, index) => (
              <ChatListItem
                chat={chat}
                user={user}
                selectedChatId={selectedChatId}
                key={index}
              />
            ))}
      </div>
    </div>
  );
}
