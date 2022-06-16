export default function Topbar({ email }) {
  return (
    <div className="flex w-full py-6 px-6 items-center space-x-2 shadow">
      <span className="font-bold">{email}</span>
    </div>
  );
}
