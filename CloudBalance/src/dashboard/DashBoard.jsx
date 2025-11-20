import MainNav from './components/NavBar/MainNav';
import SideMenuSlider from './components/SideMenuBar/SideMenuSlider';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

function DashBoard(){
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">

      <MainNav open={open} setOpen={setOpen} />

 
  <div className="flex">
  <SideMenuSlider open={open} />

  <div className="p-3 h-screen w-full transition-all duration-300">
    <Outlet />
  </div>
</div>

    </div>
  )
}

export default DashBoard;
