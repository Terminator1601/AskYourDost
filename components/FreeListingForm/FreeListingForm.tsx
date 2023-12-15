"use client";

// App.tsx
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  shopImage: string;
  services: string;
}

const FreeListingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    shopImage: "",
    services: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Add your logic to handle form submission, e.g., sending data to a server
    console.log(formData);
  };

  const inputFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Business Email", type: "email" },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "address", label: "Address", type: "textarea", rows: 3 },
    { name: "shopImage", label: "Shop Image URL", type: "text" },
    { name: "services", label: "Services", type: "text" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md p-8 bg-white shadow-md rounded-md"
      >
        <h2 className="text-2xl font-semibold mb-4">User Information</h2>

        {inputFields.map((field) => (
          <div key={field.name} className="mb-4">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-600"
            >
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleTextareaChange}
                rows={field.rows}
                className="mt-1 p-2 w-full border rounded-md"
                required
              ></textarea>
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            )}
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FreeListingForm;
