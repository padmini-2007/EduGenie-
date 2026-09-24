export default function About() {
  const teamMembers = [
    {
      name: "Harsha K L",
      photo: "./harsha.png", // Placeholder image
      department: "Data Science",
      year: "Third Year",
    },
    {
      name: "Pavan D",
      photo: "./pavan.png", // Placeholder image
      department: "Data Science",
      year: "Third Year",
    },
    {
      name: "Amaan",
      photo: "./amaan.png", // Placeholder image
      department: "Data Science",
      year: "Third Year",
    },
    {
      name: "Eshwar R",
      photo: "./eshwar.png", // Placeholder image
      department: "Data Science",
      year: "Third Year",
    },
    // Add more team members here
  ];

  return (
    // Main content container, taking full width and height
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 py-12 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Our Team Section */}
        <div className="mb-12 bg-white/75 backdrop-blur-md p-8 rounded-xl shadow-xl border border-blue-200 transition-all duration-500">
          <h2 className="text-4xl font-extrabold text-blue-900 mb-8 text-center tracking-wide drop-shadow">
            Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col items-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-blue-100/40 border border-blue-300"
              >
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-800 shadow-md transition-all duration-300 hover:scale-110">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/128x128/CCCCCC/333333?text=${member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}`;
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-blue-900 text-center mb-1 tracking-wide">
                  {member.name}
                </h3>
                <p className="text-blue-800 text-center text-base mb-1 font-medium">
                  {member.department}
                </p>
                <p className="text-blue-700 text-center text-sm italic">
                  {member.year}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* About Edu Genie Section */}
        <div className="mb-12 bg-white/75 backdrop-blur-md p-8 rounded-xl shadow-xl border border-blue-200">
          <h2 className="text-4xl font-extrabold text-blue-900 mb-6 text-center tracking-wide">
            About Edu Genie
          </h2>
          <p className="text-lg text-blue-800 leading-relaxed max-w-4xl mx-auto text-justify tracking-wide">
            Edu Genie is an innovative web platform designed to be a student's
            ultimate learning companion. At its core, it features an intelligent
            chatbot capable of analyzing student mark cards to provide detailed
            insights into their academic performance. The website supports both
            student and teacher logins, offering personalized experiences.
            Students can access their dashboard, manage their profiles, and
            interact with the chatbot for performance data. Teachers, on the
            other hand, can manage attendance for their classes while also
            having access to their profiles and the chatbot feature. Edu Genie
            aims to streamline academic tracking and support for both students
            and educators.
          </p>
        </div>

        {/* Our Contribution Section */}
        <div className="bg-white/75 backdrop-blur-md p-8 rounded-xl shadow-xl border border-blue-200">
          <h2 className="text-4xl font-extrabold text-blue-900 mb-6 text-center tracking-wide">
            Our Contribution
          </h2>
          <p className="text-lg text-blue-800 leading-relaxed max-w-4xl mx-auto text-justify tracking-wide">
            The development of Edu Genie was a collaborative effort, and we are
            incredibly proud of this achievement as students. The team was led
            by <b>Harsha K L</b>, who was instrumental in the backend
            development, initializing the core systems, and ensuring seamless
            connectivity between the frontend and backend. <b>Pavan D</b> took
            the lead in design, conceptualizing the entire website in Figma and
            meticulously converting those designs into a fully functional and
            aesthetically pleasing website using Tailwind CSS and React.{" "}
            <b>Mohammed Amaan</b> partnered closely with Harsha, contributing
            significantly to the backend development and it's testing using
            Postman. <b>Eshwar R</b> played a crucial role in team coordination
            and worked on the frontend, focusing on its connection to the
            backend and state management in FrontEnd alongside Harsha. This
            project represents a significant milestone for us as students, and
            we are thrilled to share Edu Genie with you.
          </p>
        </div>
      </div>
    </div>
  );
}
