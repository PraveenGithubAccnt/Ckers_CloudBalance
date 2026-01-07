import MainNav from "./components/NavBar/components/MainNav";
import SideMenuSlider from "./components/SideMenuBar/components/SideMenuSlider";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer";
import { SideBarOpentShut } from "./ContextHolder";
function DashBoard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <SideBarOpentShut.Provider value={{ open, setOpen }}>
        <MainNav />

        <div className="flex flex-1 overflow-hidden">
          <SideMenuSlider />
          <main className="flex-1 p-3 overflow-hidden transition-all duration-300 bg-gray-200">
            <Outlet />
          </main>
        </div>
      </SideBarOpentShut.Provider>
      <Footer />
    </div>
  );
}

export default DashBoard;
