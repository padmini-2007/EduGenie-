import { LayoutDashboard, User, Bot } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import useLoginData from "../features/Login/useLoginData";
import PageLoader from "./PageLoader";
import useLogout from "../features/Login/useLogout";
import useInitialiseChatBot from "../features/ChatBot/useInitialiseChatBot";
import { useDispatch, useSelector } from "react-redux";
import { moveSidebar, setSidebarState } from "../features/SideBar/sidebarSlice";
import { clearConversations } from "../features/ChatBot/chatBotSlice";

export default function Sidebar() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const sidebar = useSelector((state) => state.sidebar.state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading: isLoadingData } = useLoginData();
  const { logout, isLoading } = useLogout();
  const chatbot = useSelector((state) => state.chatbot.conversations);

  const { initializedChatBot, isLoading: loadingChatBot } =
    useInitialiseChatBot();

  dispatch(setSidebarState(path));

  if (isLoading || isLoadingData) return <PageLoader type="read" />;

  return (
    <div className="w-64 h-screen sticky top-0 bg-gradient-to-b from-white to-blue-50 border-r border-blue-200 p-6 flex flex-col items-center shadow-lg">
      {/* Logo */}
      <img
        src="/image.png"
        alt="EduGenie Logo"
        className="w-30 h-30 mb-4 object-contain "
      />

      {/* Title */}
      <div className="text-3xl font-extrabold text-[#0B235E] tracking-wide mb-8">
        EduGenie
      </div>

      {/* Navigation */}
      <nav className="space-y-3 w-full">
        <SidebarButton
          icon={LayoutDashboard}
          label="Dashboard"
          isActive={sidebar === "dashboard"}
          onClick={() => {
            dispatch(moveSidebar("dashboard"));
            navigate("/user/dashboard");
          }}
        />
        <SidebarButton
          icon={User}
          label="Profile"
          isActive={sidebar === "profile"}
          onClick={() => {
            dispatch(moveSidebar("profile"));
            navigate(`/user/profile/${data.username}`);
          }}
        />
        <SidebarButton
          icon={Bot}
          label="Chat Bot"
          isActive={sidebar === "studentChatbot"}
          onClick={() => {
            dispatch(moveSidebar("studentChatbot"));
            if (chatbot.length === 0) {
              initializedChatBot(data.username);
              return;
            }
            navigate("/user/studentChatbot");
          }}
        />
        <SidebarButton
          icon={User}
          label="About"
          isActive={sidebar === "about"}
          onClick={() => {
            dispatch(moveSidebar("about"));
            navigate("/about");
          }}
        />
      </nav>

      {/* Logout Button */}
      <button
        onClick={() => {
          logout();
          dispatch(clearConversations());
        }}
        className="mt-auto w-full py-2 px-4 rounded-lg bg-red-100 text-red-700 font-semibold border border-red-400 hover:bg-red-600 hover:text-white transition duration-200"
      >
        Log Out
      </button>
    </div>
  );
}

// Modular Sidebar Button
function SidebarButton({ icon: Icon, label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-3 w-full rounded-xl transition-all duration-200 shadow-sm
        ${
          isActive
            ? "bg-[#1C398E] text-white font-semibold shadow-md"
            : "bg-white text-[#1C398E] hover:bg-[#1C398E]/90 hover:text-white border border-[#1C398E]"
        }
      `}
    >
      <div
        className={`p-2 rounded-full ${
          isActive ? "bg-white text-[#1C398E]" : "bg-[#1C398E]/10"
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <span>{label}</span>
    </button>
  );
}
