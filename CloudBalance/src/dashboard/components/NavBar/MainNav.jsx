import RightNavSection from "./RightNavSection";
import LeftNavSection from "./LeftNavSection";

function MainNav({ open, setOpen }) {
  return (
    <div className="border-b border-gray-200 relative">
      <nav className="flex items-center shadow-md justify-between h-16 px-4 md:px-8 bg-white">
        {/* left section */}
        <LeftNavSection open={open} setOpen={setOpen} />

        {/* left section */}

        {/* Right section */}
        <RightNavSection />
        {/* Right section */}
      </nav>
    </div>
  );
}

export default MainNav;
