import Moment from "moment";

export default function MessageBubble({
  user,
  message,
  numberOfMessages,
  currentMessageIndex,
}) {
  const sender = message.sender === user.email;
  return (
    <>
      <div className={!sender ? `flex justify-start` : `flex justify-end`}>
        <div
          className={
            !sender
              ? `bg-slate-200 py-3 px-4 rounded-lg rounded-bl-none my-1 text-sm w-auto max-w-lg`
              : `bg-blue-600 text-white py-3 px-4 rounded-lg rounded-br-none my-1 text-sm w-auto max-w-lg`
          }
        >
          {message.text}
        </div>
      </div>

      {numberOfMessages == currentMessageIndex + 1 && (
        <div className={!sender ? `flex justify-start` : `flex justify-end`}>
          <span className="text-xs text-gray-400 px-1">
            Sent{" "}
            {Moment(new Date(message?.timestamp?.seconds * 1000)).format(
              "MMM DD, YYYY h:mm a"
            )}
          </span>
        </div>
      )}
    </>
  );
}
