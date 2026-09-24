import { Bell } from "lucide-react"; // using lucide icons for clean SVGs
import useLoginData from "../features/Login/useLoginData";
import useUserData from "../features/User/useUserData";

export default function Topbar() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const { data: loginData, isLoading: loginLoading } = useLoginData();
  const { data, isLoading } = useUserData(loginData.username);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/60 border-b border-blue-100 shadow flex justify-between items-center px-6 py-4">
      <div className="text-lg font-semibold text-[#1C398E] tracking-wide">
        {today}
      </div>

      <div className="flex items-center gap-6">
        <NotificationBell />
        <UserInfo
          name={data?.Name}
          role={data?.role}
          imgSrc={data?.profile_image}
        />
      </div>
    </header>
  );
}

// 🔔 Bell Icon Component
function NotificationBell() {
  return (
    <button className="relative group transition-transform duration-200 hover:scale-105">
      <Bell className="w-6 h-6 text-[#1C398E]" />
      {/* Red Dot */}
      <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
      <div className="absolute -bottom-7 right-1 bg-black text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Notifications
      </div>
    </button>
  );
}

// 🧑 User Info Component
function UserInfo({ name, role, imgSrc }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-end">
        <span className="text-sm text-gray-700 font-bold">{name}</span>
        <span className="text-xs text-gray-500 tracking-wide">{role}</span>
      </div>
      <img
        src={imgSrc || "/profile.JPEG"}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover border-2 border-[#1C398E] shadow-sm"
      />
    </div>
  );
}
