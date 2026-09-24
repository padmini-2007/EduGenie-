import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white">
      <div className="w-full ml-30 md:w-1/2 flex justify-between items-center p-6">
        {/* Replace this with your genie image */}
        <img src="/image.png" alt="EduGenie" className="w-3/4 h-auto" />
      </div>
      {/* Left Section */}
      <div className="flex flex-col justify-center items-start w-full md:w-1/2 px-6 md:px-20 pb-10 md:pb-0">
        <h1 className="text-4xl font-bold text-[#1A237E] mb-4">Hello!</h1>
        <p className="text-[#1A237E] text-lg mb-8">
          Choose your registration option
        </p>

        {/* Student Button */}
        <button
          className="w-full max-w-sm bg-[#0D1B4C] text-white text-left px-6 py-4 rounded-lg mb-4 shadow hover:bg-[#1A237E] transition hover:cursor-pointer"
          onClick={() => navigate("/auth/register/student")}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">Student</p>
              <p className="text-sm opacity-80">
                Access the students' portal here.
              </p>
            </div>
            <span className="text-xl">&gt;</span>
          </div>
        </button>

        {/* Teacher Button */}
        <button
          className="w-full max-w-sm bg-[#F5F7FA] text-[#0D1B4C] text-left px-6 py-4 mb-4 rounded-lg shadow border border-[#E0E0E0] hover:bg-[#E8ECF1] transition hover:cursor-pointer"
          onClick={() => navigate("/auth/register/teacher")}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">Teacher</p>
              <p className="text-sm opacity-80">
                Exclusive to staff teachers only.
              </p>
            </div>
            <span className="text-xl">&gt;</span>
          </div>
        </button>

        <button
          className="w-full max-w-sm bg-[#F5F7FA] text-[#0D1B4C] text-left px-6 py-4 rounded-lg shadow border border-[#E0E0E0] hover:bg-[#E8ECF1] transition hover:cursor-pointer"
          onClick={() => navigate("/auth/login")}
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">Login</p>
              <p className="text-sm opacity-80">
                Already a user? Click on this
              </p>
            </div>
            <span className="text-xl">&gt;</span>
          </div>
        </button>
      </div>{" "}
    </div>
  );
}
