import React, { useState, useEffect } from "react";

const Ssearch = () => {
  const [filters, setFilters] = useState({
    name: "",
    registerNumber: "",
    rollNumber: "",
    departments: [],
    year: [],
    section: [],
    staffInCharge: [],
    placementInCharge: [],
  });

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [displayedData, setDisplayedData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          "https://hackathon-fw7v.onrender.com/profile",
          {
            method: "GET",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setDisplayedData(data.students); // Assuming the API returns an array of students
          setLoading(false);
        } else {
          const errorMessage = await response.text();
          console.error(`Server Error: ${errorMessage}`);
          alert(`Failed to fetch student details: ${errorMessage}`);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("An error occurred while fetching student details.");
      }
    };

    fetchStudentData();
  }, []);

  const departments = [
    "Mechanical Engineering",
    "Civil Engineering",
    "EEE",
    "Information Technology",
    "ECE",
    "CSE",
    "AI & DS",
    "Cyber Security",
  ];
  const years = ["I Year", "II Year", "III Year", "IV Year"];
  const sections = ["A", "B", "C"];
  const staffInCharges = ["Staff 1", "Staff 2", "Staff 3", "Staff 4"];
  const placementInCharges = ["Incharge 1", "Incharge 2", "Incharge 3"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (category, value) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      registerNumber: "",
      rollNumber: "",
      departments: [],
      year: [],
      section: [],
      staffInCharge: [],
      placementInCharge: [],
    });
    setDisplayedData([]); // Reset to all data
  };

  const applyFilters = () => {
    const filteredData = displayedData.filter((item) => {
      return (
        (!filters.name || item.name.toLowerCase().includes(filters.name.toLowerCase())) &&
        (!filters.registerNumber || item.registerNumber.includes(filters.registerNumber)) &&
        (!filters.rollNumber || item.rollNumber.includes(filters.rollNumber)) &&
        (filters.departments.length === 0 || filters.departments.includes(item.departments)) &&
        (filters.year.length === 0 || filters.year.includes(item.year)) &&
        (filters.section.length === 0 || filters.section.includes(item.section)) &&
        (filters.staffInCharge.length === 0 || filters.staffInCharge.includes(item.staffInCharge)) &&
        (filters.placementInCharge.length === 0 || filters.placementInCharge.includes(item.placementInCharge))
      );
    });
    setDisplayedData(filteredData);
  };

  return (
    <div className="w-full p-4 bg-gray-100 ml-[250px]">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-2">
            {/* Text Inputs */}
            {["Name", "RegisterNumber", "RollNumber"].map((field) => (
              <div key={field} className="w-full sm:w-1/5">
                <input
                  type="text"
                  name={field}
                  value={filters[field]}
                  onChange={handleInputChange}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  className="p-2 border border-gray-300 rounded-full w-[150px]"
                />
              </div>
            ))}
          </div>

          {/* Dropdowns */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { label: "Department", options: departments, key: "departments" },
              { label: "Year", options: years, key: "year" },
              { label: "Section", options: sections, key: "section" },
              { label: "Staff In-Charge", options: staffInCharges, key: "staffInCharge" },
              { label: "Placement In-Charge", options: placementInCharges, key: "placementInCharge" },
            ].map((dropdown) => (
              <Dropdown
                key={dropdown.key}
                label={dropdown.label}
                options={dropdown.options}
                selected={filters[dropdown.key]}
                onChange={(value) => handleCheckboxChange(dropdown.key, value)}
                isActive={activeDropdown === dropdown.key}
                onToggle={() =>
                  setActiveDropdown((prev) =>
                    prev === dropdown.key ? null : dropdown.key
                  )
                }
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-6">
            <button
              className="text-sm text-red-500 underline"
              onClick={clearFilters}
            >
              Clear All
            </button>
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded-md"
              onClick={applyFilters}
            >
              Apply Filters
            </button>
          </div>

          {/* Display Data */}
          <div className="mt-8">
            <h3 className="mb-4 text-xl font-bold">Filtered Data</h3>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  {[
                    "Name",
                    "Register Number",
                    "Roll Number",
                    "Department",
                    "Year",
                    "Section",
                    "Staff In-Charge",
                    "Placement In-Charge",
                  ].map((header) => (
                    <th key={header} className="p-2 border border-gray-300">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayedData.map((item, index) => (
                  <tr key={index}>
                    <td className="p-2 border border-gray-300">{item.name}</td>
                    <td className="p-2 border border-gray-300">{item.registerNumber}</td>
                    <td className="p-2 border border-gray-300">{item.rollNumber}</td>
                    <td className="p-2 border border-gray-300">{item.departments}</td>
                    <td className="p-2 border border-gray-300">{item.year}</td>
                    <td className="p-2 border border-gray-300">{item.section}</td>
                    <td className="p-2 border border-gray-300">{item.staffInCharge}</td>
                    <td className="p-2 border border-gray-300">{item.placementInCharge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

// Dropdown Component
const Dropdown = ({
  label,
  options,
  selected,
  onChange,
  isActive,
  onToggle,
}) => {
  return (
    <div className="relative inline-block w-full sm:w-1/5">
      <button
        className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
        onClick={onToggle}
      >
        {label} {selected.length > 0 ? `(${selected.length})` : ""}
        <span className="ml-2">&#9660;</span>
      </button>
      {isActive && (
        <div className="absolute z-10 w-full p-4 mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <label key={option} className="flex items-center mb-2 space-x-2">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onChange(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ssearch;
