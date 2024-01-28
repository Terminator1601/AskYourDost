// Import necessary modules and components
"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "../../database/firebaseConfig"; // Import your Firebase configuration

// Define interface for form data and input fields
interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  shopImage: string[];
  services: string;
  description: string;
  [key: string]: string | string[];
  city: string;
}

interface InputField {
  name: string;
  label: string;
  type: string;
  rows?: number;
}

// Define FreeListingForm component
const FreeListingForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    shopImage: [],
    services: "",
    description: "",
  });

  const [numImages, setNumImages] = useState<number>(0);
  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
  const [showErrorPopup, setShowErrorPopup] = useState<boolean>(false);

  // Handle changes in text and textarea inputs
  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | (HTMLTextAreaElement & { name: keyof FormData })
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle changes in select input
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle changes in the number of images input
  const handleNumImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    let num = parseInt(e.target.value, 10) || 0;
    // Ensure the number is between 0 and 10
    num = Math.min(Math.max(0, num), 10);
    setNumImages(num);
    setFormData((prevData) => ({
      ...prevData,
      shopImage: new Array(num).fill(""),
    }));
  };

  // Handle changes in individual shop image inputs
  const handleShopImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    setFormData((prevData) => {
      const newShopImage = [...prevData.shopImage];
      newShopImage[index] = value;
      return { ...prevData, shopImage: newShopImage };
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation: Check if all required fields are filled
    const requiredFields = [
      "name",
      "email",
      "phone",
      "address",
      "city",
      "services",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      // Show error alert for missing fields
      window.alert(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return; // Do not proceed with the submission
    }

    // Store data in Firestore
    const firestore = getFirestore();
    try {
      const docRef = await addDoc(
        collection(firestore, "FreeListing"),
        formData
      );
      console.log("Document written with ID: ", docRef.id);

      // Show success popup
      setShowSuccessPopup(true);

      // Show success alert
      window.alert("Form submitted successfully!");
    } catch (error) {
      if (error instanceof Error && error.message) {
        console.error("Error adding document: ", error.message);
        // Show error alert
        window.alert(`Error submitting the form: ${error.message}`);
      } else {
        console.error("Unknown error occurred: ", error);
        // Show generic error alert
        window.alert("An unknown error occurred. Please try again.");
      }

      // Show error popup
      setShowErrorPopup(true);
    }
  };

  // Handle closing success and error popups
  const closePopup = () => {
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
  };

  // Define input fields and service options
  const inputFields: InputField[] = [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Business Email", type: "email" },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "address", label: "Address", type: "textarea", rows: 3 },
    { name: "city", label: "City", type: "text" },
    { name: "services", label: "Services", type: "select" },
    { name: "description", label: "Description", type: "text" },
  ];

  const servicesOptions = [
    "Hotels",
    "Restaurants",
    "Spa",
    "Gym",
    "Coaching",
    "Counselling",
  ];

  // Return JSX for the component
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-xl flex">
        {/* Left Side (Image) */}
        <div className="flex-shrink-0 p-4">
          {formData.shopImage.map((url, index) => (
            <img
              key={index}
              src={url || "https://placehold.it/150x150"}
              alt={`Shop ${index + 1}`}
              className="rounded-md"
              style={{ width: "150px", height: "150px", marginRight: "10px" }}
            />
          ))}
        </div>

        {/* Right Side (Form) */}
        <div className="flex-grow p-8 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-4">
            <span style={{ color: "var(--green)" }}>Your </span>Business
            Information
          </h2>

          {/* Other Input Fields */}
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
                  onChange={handleChange}
                  rows={field.rows}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              ) : field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleSelectChange}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {servicesOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
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

          {/* Number of Images Input */}
          <div className="mb-4">
            <label
              htmlFor="numImages"
              className="block text-sm font-medium text-gray-600"
            >
              Number of Images to Upload (Max: 10)
            </label>
            <input
              type="number"
              id="numImages"
              name="numImages"
              value={numImages}
              onChange={handleNumImagesChange}
              className="mt-1 p-2 w-full border rounded-md"
              min="0"
              max="10"
            />
          </div>

          {/* Shop Image Input(s) */}
          {Array.from({ length: numImages }, (_, index) => (
            <div key={index} className="mb-4">
              <label
                htmlFor={`shopImage${index + 1}`}
                className="block text-sm font-medium text-gray-600"
              >
                Shop Image {index + 1}
              </label>
              <input
                type="text"
                id={`shopImage${index + 1}`}
                name={`shopImage${index + 1}`}
                value={formData.shopImage[index]}
                onChange={(e) => handleShopImageChange(e, index)}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreeListingForm;
