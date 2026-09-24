import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AppLayout({ children, isFooter }) {
  return (
    <div className="flex min-h-screen bg-[#F3F8FF]">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-white-50 min-h-screen">
        <Topbar />
        <main className="p-6 overflow-y-auto">{children}</main>
        {isFooter && <Footer />}
      </div>
    </div>
  );
}

export default AppLayout;
