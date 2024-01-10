import React, { useEffect, useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
}

const Advertisement: React.FC = () => {
  return <div>Advertisement Component</div>;
};

const WebsiteDevelopment: React.FC = () => {
  return <div>Website Development Component</div>;
};

const Careers: React.FC = () => {
  return <div>Careers Component</div>;
};

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">Select an option:</label>
      <select
        id="dropdown"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          Choose an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {selectedOption === "Advertisement" && <Advertisement />}
      {selectedOption === "Website Development" && <WebsiteDevelopment />}
      {selectedOption === "Careers" && <Careers />}
    </div>
  );
};

const ServicesDropdown: React.FC = () => {
  const dropdownOptions: Option[] = [
    { value: "Advertisement", label: "Advertisement" },
    { value: "Website Development", label: "Website Development" },
    { value: "Careers", label: "Careers" },
  ];

  return <Dropdown options={dropdownOptions} />;
};

export default ServicesDropdown;
