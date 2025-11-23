
import { IoMenu } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import cloudbalance from "../../../../assets/cloudbalance.png";
import { useContext } from "react";
import { SideBarOpentShut } from "../../ContextHolder";
function LeftNavSection() {
    const {open,setOpen}=useContext(SideBarOpentShut); 
  return (
    <div>
      <div className="flex items-center space-x-8">
        <button onClick={() => setOpen(!open)}>
          <IoMenu className="w-6 h-6 text-gray-700 cursor-pointer" />
        </button>

        <div className="shrink-0">
          <img src={cloudbalance} alt="CloudKeeper" className="h-20 w-auto" />
        </div>

        <div className="flex items-center space-x-8">
          {/* Dropdown */}
          <div className="flex flex-col text-sm">
            <h4 className="font-semibold text-gray-700 leading-none">Module</h4>
            <div className="relative inline-block">
              <select
                defaultValue="Lens"
                className="appearance-none  text-gray-600 focus:outline-none pr-3 text-base"
              >
                <option value="Lens">Lens</option>
                <option value="/tuner">Tuner</option>
                <option value="/auto">Auto</option>
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-blue-500">
                <RiArrowDropDownLine size={27} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftNavSection;
