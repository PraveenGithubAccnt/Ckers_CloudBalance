import MainNav from "./components/NavBar/MainNav";
import SideMenuSlider from "./components/SideMenuBar/SideMenuSlider";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Footer from "./Footer";
function DashBoard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <MainNav open={open} setOpen={setOpen} />

      <div className="flex flex-1 overflow-hidden">
        <SideMenuSlider open={open} />

        <main className="flex-1 p-3 overflow-hidden transition-all duration-300 bg-gray-200">
          <Outlet />
        </main>
      </div>
      <Footer/>
    </div>
  );
}

export default DashBoard;