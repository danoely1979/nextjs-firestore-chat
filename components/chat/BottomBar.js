import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseconfig.js";
import Textarea from "react-expanding-textarea";
import { IoPaperPlaneOutline } from "react-icons/io5";

export default function BottomBar({ user, chatId }) {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim().length > 0) return;

    await addDoc(collection(db, `chats/${chatId}/messages`), {
      text: input,
      sender: user.email,
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="flex w-full sticky top-full bg-white">
      <div className="w-full flex pb-4 px-6 items-end space-x-2">
        <Textarea
          type="text"
          placeholder="Type your message ..."
          className="w-full rounded-lg border focus:border-gray-400 border-gray-200 ring-0 focus:ring-0 placeholder-gray-400 py-4 px-4"
          autoComplete="off"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(e)}
        />
        <button type="submit">
          <IoPaperPlaneOutline className="w-7 h-7 mb-4 text-gray-600 hover:text-gray-900" />
        </button>
      </div>
    </div>
  );
}
