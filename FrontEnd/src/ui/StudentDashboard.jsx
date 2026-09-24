import { useNavigate } from "react-router";

import Button from "./Button";
import PageLoader from "./PageLoader";

import useLoginData from "../features/Login/useLoginData";
import useUserData from "../features/User/useUserData";
import { useDispatch, useSelector } from "react-redux";
import { moveSidebar } from "../features/SideBar/sidebarSlice";
import useInitialiseChatBot from "../features/ChatBot/useInitialiseChatBot";
import useUploadDocument from "../features/User/useUploadDocument";
import useData from "../features/User/useData";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chatbot = useSelector((state) => state.chatbot.conversations);

  const { data: loginData, isLoading: loginLoading } = useLoginData();
  const { data: userData, isLoading } = useUserData(loginData.username);
  const { data, isLoading: isLoadingData } = useData(loginData.username);
  const { uploadDocument, isLoading: uploadingDocument } = useUploadDocument();
  const { initializedChatBot, isLoading: initializingChatbot } =
    useInitialiseChatBot();

  if (
    loginLoading ||
    isLoading ||
    initializingChatbot ||
    uploadingDocument ||
    isLoadingData
  )
    return <PageLoader type="show" />;

  return (
    <div className="space-y-10 px-8 py-10 bg-gradient-to-br to-white min-h-screen">
      {/* Chat Bot Card */}
      <div className="rounded-2xl shadow-md border border-red-600 transition-all hover:shadow-lg hover:scale-[1.01] duration-300 ease-in-out">
        <div className="bg-red-100 hover:bg-red-50 p-6 rounded-2xl min-h-[300px] flex flex-col justify-between">
          <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-4 border-b border-red-600 pb-2">
            Edu Genie Chat Bot
          </h2>
          <p className="text-center text-xl text-gray-700 mb-4">
            Hi! <br />{" "}
            <strong className="font-semibold">{userData?.Name}</strong>
          </p>
          <div className="flex justify-center">
            <Button
              text="Click here to start a chat"
              onClick={() => {
                dispatch(moveSidebar("studentChatbot"));
                if (chatbot.length === 0) {
                  initializedChatBot(loginData.username);
                  return;
                }
                navigate("/user/studentChatbot");
              }}
            />
          </div>
        </div>
      </div>

      {/* Upload Document Card */}
      {/* <button
        onClick={() => console.log("Upload button clicked")}
        className="w-full rounded-2xl border border-blue-300 transition hover:shadow-lg hover:scale-[1.01] active:scale-95 duration-300 ease-in-out"
      >
        <div className="bg-blue-200 hover:bg-blue-100 border border-blue-600 p-6 rounded-2xl flex flex-col items-center justify-center gap-2 text-lg font-medium text-blue-900 min-h-[120px]">
          <span className="text-4xl animate-pulse ">📄</span>
          Upload your document
        </div>
      </button> */}

      <div>
        <label htmlFor="file-upload">
          <div className="bg-blue-200 hover:bg-blue-100 border border-blue-600 p-6 rounded-2xl flex flex-col items-center justify-center gap-2 text-lg font-medium text-blue-900 min-h-[120px] cursor-pointer transition hover:shadow-lg hover:scale-[1.01] active:scale-95 duration-300 ease-in-out">
            <span className="text-4xl animate-pulse">📄</span>
            {uploadingDocument ? "Uploading..." : "Upload your document"}
          </div>
          <input
            id="file-upload"
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                uploadDocument({ username: loginData.username, file });
              }
            }}
            className="hidden"
          />
        </label>
      </div>

      {/* Right section (Uploads and Stats) */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Uploads */}
        <div className="bg-blue-900 text-white p-6 rounded-2xl border hover:scale-[1.03] border-blue-800 shadow-md col-span-1 hover:shadow-xl transition duration-300">
          <h3 className="font-bold text-lg mb-3 border-b border-white pb-1">
            Recent Uploads
          </h3>
          {data?.data?.documents_uploaded?.length === 0 ? (
            <p className="flex justify-center items-center">
              No files uploaded yet
            </p>
          ) : (
            <ul className="text-sm space-y-4">
              {data?.data?.documents_uploaded?.slice(-3)?.map((item) => (
                <li>
                  <strong className="text-base">{item.name}</strong> <br />
                  <span className="text-xs text-gray-200">{item.date}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Stats Section */}
        <div className="col-span-2 flex gap-6">
          <div className="flex-1 bg-pink-200 border border-pink-500 p-6 rounded-2xl shadow flex flex-col items-center justify-center hover:scale-[1.03] transition-transform duration-300">
            <p className="text-xl p-10font-semibold text-yellow-800">
              Day Streak
            </p>
            <h1 className="text-5xl font-extrabold text-yellow-900 mt-2 animate-pulse">
              {data?.data?.dayStreak}
            </h1>
          </div>
          <div className="flex-1 bg-red-100 border border-red-600 p-6 rounded-2xl shadow flex flex-col items-center justify-center hover:scale-[1.03] transition-transform duration-300">
            <p className="text-xl font-semibold text-red-800">
              Documents Uploaded
            </p>
            <h1 className="text-5xl font-extrabold text-red-900 mt-2 animate-pulse">
              {data?.data?.documents_uploaded?.length}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
