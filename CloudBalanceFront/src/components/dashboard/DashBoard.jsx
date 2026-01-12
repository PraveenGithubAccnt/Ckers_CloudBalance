import MainNav from "./components/NavBar/components/MainNav";
import SideMenuSlider from "./components/SideMenuBar/components/SideMenuSlider";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function DashBoard() {

  return (
    <div className="flex flex-col h-screen overflow-hidden">

        <MainNav />

        <div className="flex flex-1 overflow-hidden">
          <SideMenuSlider />
          <main className="flex-1 p-3 overflow-hidden transition-all duration-300 bg-gray-200">
            <Outlet />
          </main>
        </div>
    
      <Footer />
    </div>
  );
}

export default DashBoard;
