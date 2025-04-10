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
  websiteLink: string;
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
    websiteLink:"",
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
      window.location.reload();

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
    {name: "websiteLink", label: "Existing Website Link (Optional)", type: "text"}
  ];

  const servicesOptions = [
    "Hotels",
    "Restaurants",
    "Spa",
    "Gym",
    "Coaching",
    "Consultant",
  ];

  // Return JSX for the component
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            <span className="text-[#e3a62f]">Free</span>{" "}
            <span className="text-[#5c941d]">Business</span>{" "}
            <span className="text-[#0cc0df]">Listing</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            List your business for free and reach thousands of potential customers
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Left Side (Preview) */}
          <div className="lg:w-1/3 bg-gray-50 p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Preview Images</h3>
            <div className="grid grid-cols-2 gap-4">
              {formData.shopImage.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url || "https://via.placeholder.com/150"}
                    alt={`Shop ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg shadow-md transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200 rounded-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side (Form) */}
          <div className="lg:w-2/3 p-8">
            <h2 className="text-3xl font-bold mb-8">
              <span className="text-[#5c941d]">Business</span>{" "}
              <span className="text-gray-800">Information</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {inputFields.map((field) => (
                <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700 mb-2"
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
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent transition-all duration-200"
                      required
                    />
                  ) : field.type === "select" ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleSelectChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5c941d] focus:border-transparent transition-all duration-200"
                      required
                    >
                      <option value="" disabled>Select an option</option>
                      {servicesOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#e3a62f] focus:border-transparent transition-all duration-200"
                      required
                    />
                  )}
                </div>
              ))}

              {/* Number of Images Input */}
              <div>
                <label
                  htmlFor="numImages"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Number of Images (Max: 10)
                </label>
                <input
                  type="number"
                  id="numImages"
                  name="numImages"
                  value={numImages}
                  onChange={handleNumImagesChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent transition-all duration-200"
                  min="0"
                  max="10"
                />
              </div>
            </div>

            {/* Shop Image Inputs */}
            {numImages > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Image URLs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: numImages }, (_, index) => (
                    <div key={index}>
                      <label
                        htmlFor={`shopImage${index + 1}`}
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Image {index + 1}
                      </label>
                      <input
                        type="text"
                        id={`shopImage${index + 1}`}
                        name={`shopImage${index + 1}`}
                        value={formData.shopImage[index]}
                        onChange={(e) => handleShopImageChange(e, index)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0cc0df] focus:border-transparent transition-all duration-200"
                        placeholder="Enter image URL"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-8 w-full bg-[#5c941d] text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#528a1a] transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Submit Listing
            </button>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#5c941d] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Success!</h3>
              <p className="text-gray-600 mb-6">Your listing has been submitted successfully.</p>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-[#5c941d] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#528a1a] transition-colors duration-200"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Popup */}
      {showErrorPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Error</h3>
              <p className="text-gray-600 mb-6">An error occurred while submitting your listing. Please try again.</p>
              <button
                onClick={() => setShowErrorPopup(false)}
                className="w-full bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreeListingForm;
