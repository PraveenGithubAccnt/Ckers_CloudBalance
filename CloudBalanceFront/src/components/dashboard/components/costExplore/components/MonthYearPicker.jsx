import { useState, useRef, useEffect } from "react";
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

function MonthYearPicker({ value, onChange, label }) {
  const parseYearFromValue = () => {
    if (!value) return new Date().getFullYear();
    
    let year;
    if (value.includes("-")) {

      year = parseInt(value.split("-")[0]);
    } else {
   
      year = parseInt(value.split(" ")[1]);
    }
    return !isNaN(year) ? year : new Date().getFullYear();
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(parseYearFromValue());
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleMonthSelect = (monthIndex) => {
    const monthName = MONTHS[monthIndex];
    const formattedValue = `${monthName} ${selectedYear}`;
    onChange(formattedValue);
    setIsOpen(false);
  };

  const handleYearChange = (direction) => {
    setSelectedYear(prev => prev + direction);
  };

  
  const getCurrentMonthIndex = () => {
    if (!value) return -1;
    
    let monthName;
    if (value.includes("-")) {

      const monthNum = parseInt(value.split("-")[1]);
      monthName = MONTHS[monthNum - 1];
    } else {
    
      monthName = value.split(" ")[0];
    }
    
    return MONTHS.indexOf(monthName);
  };

  const currentMonthIndex = getCurrentMonthIndex();
  const displayValue = value || "Select month";

  return (
    <div className="relative" ref={dropdownRef}>
    
      {label && (
        <label className="block text-xs text-gray-600 mb-1">
          {label}
        </label>
      )}


      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white
          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500
          flex items-center justify-between gap-2"
      >
        <span className="truncate">{displayValue}</span>
        <FiCalendar className="text-gray-500 shrink-0" />
      </button>

    
      {isOpen && (
        <div className="absolute z-50 mt-1 w-64 bg-white border border-gray-300 rounded-md shadow-lg">
     
          <div className="flex items-center justify-between p-3 border-b border-gray-200">
            <button
              type="button"
              onClick={() => handleYearChange(-1)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <FiChevronLeft className="text-gray-600" />
            </button>
            
            <span className="text-sm font-semibold text-gray-700">
              {selectedYear}
            </span>
            
            <button
              type="button"
              onClick={() => handleYearChange(1)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <FiChevronRight className="text-gray-600" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 p-3">
            {MONTHS.map((month, index) => {
              const isSelected = 
                index === currentMonthIndex && 
                selectedYear === parseInt(value?.split(" ")[1] || value?.split("-")[0]);
              
              return (
                <button
                  key={month}
                  type="button"
                  onClick={() => handleMonthSelect(index)}
                  className={`px-3 py-2 text-sm rounded-md transition-colors
                    ${isSelected
                      ? "bg-blue-800 text-white"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {month}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default MonthYearPicker;