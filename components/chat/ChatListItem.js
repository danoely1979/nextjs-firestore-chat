import { useRouter } from "next/router";
import Moment from "moment";

export default function ChatListItem({ chat, user, selectedChatId }) {
  const router = useRouter();

  const getOtherUser = (users, currentUser) => {
    return users?.filter((user) => user !== currentUser.email);
  };

  const redirect = (id) => {
    router.push(`/chat/${id}`);
  };

  return (
    <button
      className={
        `relative flex items-start justify-between w-full p-4 hover:bg-gray-100 outline-none border-r-4 ` +
        (chat.id === selectedChatId
          ? "border-gray-900 bg-gray-100"
          : "border-transparent")
      }
      onClick={() => redirect(chat.id)}
    >
      <div className="flex items-start space-x-2 overflow-hidden">
        <div className="flex flex-col">
          <div className="items-center space-x-2 font-medium">
            {getOtherUser(chat.users, user)}
          </div>
        </div>
      </div>

      <div className="flex flex-shrink-0 text-sm mt-1">
        {Moment(new Date(chat?.timestamp?.seconds * 1000)).format("MMM DD")}
      </div>
    </button>
  );
}
