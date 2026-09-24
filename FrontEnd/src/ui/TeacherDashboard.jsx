import { useState } from "react";
import Button from "../ui/Button";

import useLoginData from "../features/Login/useLoginData";
import useUserData from "../features/User/useUserData";
import PageLoader from "./PageLoader";

export default function TeacherDashboard() {
  const { data: loginData, isLoading: loginLoading } = useLoginData();
  const { data: userData, isLoading } = useUserData(loginData.username);
  const [showAllStudents, setShowAllStudents] = useState(false);
  const [students, setStudents] = useState([
    "Pavan D",
    "Harsha K L",
    "Eshwar R",
    "Amaan M",
  ]);

  const addSubject = () => {};

  const addStudent = () => {
    setStudents([...students, `Student ${students.length + 1}`]);
  };

  const getDates = () => {
    const today = new Date();
    const days = [];
    for (let i = -2; i <= 4; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        date: date.getDate(),
        isToday: date.toDateString() === today.toDateString(),
      });
    }
    return days;
  };

  const dates = getDates();

  if (isLoading || loginLoading) return <PageLoader type="show" />;

  return (
    <div className="relative p-6 bg-white-50 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* WATERMARK OVERLAY */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-70 text-8xl font-extrabold text-red-500 whitespace-nowrap">
        UNDER DEVELOPMENT
      </div>

      {/* LEFT SIDE: ATTENDANCE SECTION */}
      <div className="flex flex-col gap-8">
        {/* DATES */}
        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Attendance</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {dates.map((d, idx) => (
              <div
                key={idx}
                className={`min-w-[60px] rounded-lg px-3 py-2 text-center font-medium text-sm ${
                  d.isToday
                    ? "bg-blue-900 text-white"
                    : "bg-[#f3f8ff] text-blue-900 border border-blue-200"
                }`}
              >
                <div>{d.date}</div>
                <div>{d.day}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SUBJECT CARDS */}
        <section className="flex flex-col gap-4">
          {userData?.Subjects_Undertaken?.map((subject, index) => (
            <div
              key={index}
              className="bg-[#f3f8ff] rounded-xl border border-blue-200 p-4 flex justify-between items-center shadow"
            >
              <div>
                <h4 className="text-lg font-semibold text-blue-900 mb-1">
                  {subject}
                </h4>
                <p className="text-sm text-gray-600">Class Time: 08:07 AM</p>
              </div>
              <Button text="Mark Attendance" kind="secondary" />
            </div>
          ))}
          <button
            onClick={addSubject}
            className="mt-2 w-full py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold rounded-lg"
          >
            + Add Subject
          </button>
        </section>
      </div>

      {/* RIGHT SIDE: STUDENTS & CHAT BOT */}
      <div className="flex flex-col gap-6">
        {/* STUDENTS LIST */}
        <section className="border rounded-xl p-5 shadow-sm bg-white border-blue-200">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Students</h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {(showAllStudents ? students : students.slice(0, 6)).map(
              (student, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-[#f3f8ff] p-3 rounded-lg border border-blue-100 shadow-sm"
                >
                  <span className="text-blue-900 font-medium">{student}</span>
                  <button
                    onClick={() =>
                      window.open(`/attendance/${student}`, "_blank")
                    }
                    className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-semibold rounded-md transition"
                  >
                    Check
                  </button>
                </div>
              )
            )}
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setShowAllStudents(!showAllStudents)}
              className="text-sm text-blue-600 hover:underline"
            >
              {showAllStudents ? "Show Less" : "Show All"}
            </button>
            <button
              onClick={addStudent}
              className="text-sm text-blue-600 hover:underline"
            >
              + Add
            </button>
          </div>
        </section>

        {/* CHAT BOT */}
        <section className="border border-red-500 px-2 py-2 rounded-xl shadow-sm bg-white h-full">
          <div className="bg-red-100 p-6 rounded-xl flex flex-col items-center justify-between min-h-[300px]">
            <h2 className="text-4xl font-extrabold text-blue-900 text-center mb-2">
              Edu Genie Chat Bot
            </h2>
            <p className="text-center text-gray-800 text-lg mb-4">
              Hi! <br /> <strong>{userData.Name}</strong>
            </p>
            <Button text="Click here to start a chat" kind="secondary" />
          </div>
        </section>
      </div>
    </div>
  );
}
