import { useState, useEffect, useRef } from "react";
import "components/Appt/Appt.scss";

const ApptFilter = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-filter" ref={dropdownRef}>
      <div
        className="dropdown-filter-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value.label}
      </div>
      {isOpen && (
        <div className="dropdown-filter-body">
          {options
            .filter((option) => option.value !== value.value)
            .map((option, index) => (
              <div
                key={index}
                className="dropdown-filter-item"
                onClick={() => handleSelect(option)}
              >
                <span>{option.label}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ApptFilter;
