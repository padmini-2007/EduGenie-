import App from "../App";
import Sidebar from "../ui/Sidebar";
import Topbar from "../ui/Topbar";
import Footer from "../ui/Footer";
import StudentDashboard from "../ui/StudentDashboard";
import TeacherDashboard from "../ui/TeacherDashboard";
import useLoginData from "../features/Login/useLoginData";
import PageLoader from "../ui/PageLoader";

export default function Dashboard() {
  const { data, isLoading } = useLoginData();
  if (isLoading) return <PageLoader type="show" />;
  return data.level === 1 ? <StudentDashboard /> : <TeacherDashboard />;
}
