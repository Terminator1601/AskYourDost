// "use client";

// import { useState, ChangeEvent, FormEvent } from "react";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import "@/database/firebaseConfig"; // Import your Firebase configuration

// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   shopImage: string;
//   services: string;
// }

// interface InputField {
//   name: string;
//   label: string;
//   type: string;
//   rows?: number;
// }

// const FreeListingForm: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     shopImage: "",
//     services: "",
//   });

//   const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
//   const [showErrorPopup, setShowErrorPopup] = useState<boolean>(false);

//   const handleChange = (
//     e: ChangeEvent<
//       HTMLInputElement | (HTMLTextAreaElement & { name: keyof FormData })
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleTextareaChange = (
//     e: ChangeEvent<HTMLTextAreaElement & { name: keyof FormData }>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     // Store data in Firestore
//     const firestore = getFirestore();
//     try {
//       const docRef = await addDoc(
//         collection(firestore, "FreeListing"),
//         formData
//       );
//       console.log("Document written with ID: ", docRef.id);

//       // Show success popup
//       setShowSuccessPopup(true);

//       // Show success alert
//       window.alert("Form submitted successfully!");
//     } catch (error) {
//       if (error instanceof Error && error.message) {
//         console.error("Error adding document: ", error.message);
//         // Show error alert
//         window.alert(`Error submitting the form: ${error.message}`);
//       } else {
//         console.error("Unknown error occurred: ", error);
//         // Show generic error alert
//         window.alert("An unknown error occurred. Please try again.");
//       }

//       // Show error popup
//       setShowErrorPopup(true);
//     }
//   };

//   const closePopup = () => {
//     setShowSuccessPopup(false);
//     setShowErrorPopup(false);
//   };
//   const inputFields: InputField[] = [
//     { name: "name", label: "Name", type: "text" },
//     { name: "email", label: "Business Email", type: "email" },
//     { name: "phone", label: "Phone Number", type: "tel" },
//     { name: "address", label: "Address", type: "textarea", rows: 3 },
//     { name: "shopImage", label: "Shop Image URL", type: "text" },
//     { name: "services", label: "Services", type: "select" },
//   ];
//   const servicesOptions = ["Option 1", "Option 2", "Option 3"]; // Add your service options here

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="max-w-screen-xl flex">
//         {/* Left Side (Image) */}
//         <div className="flex-shrink-0 p-4">
//           <img
//             src={formData.shopImage || "https://placehold.it/150x150"}
//             alt="Shop"
//             className="rounded-md"
//             style={{ width: "150px", height: "150px" }}
//           />
//         </div>

//         {/* Right Side (Form) */}
//         <div className="flex-grow p-8 bg-white shadow-md rounded-md">
//           <h2 className="text-2xl font-semibold mb-4">User Information</h2>

//           {inputFields.map((field) => (
//             <div key={field.name} className="mb-4">
//               <label
//                 htmlFor={field.name}
//                 className="block text-sm font-medium text-gray-600"
//               >
//                 {field.label}
//               </label>
//               {field.type === "textarea" ? (
//                 <textarea
//                   id={field.name}
//                   name={field.name}
//                   value={formData[field.name]}
//                   onChange={handleTextareaChange}
//                   rows={field.rows}
//                   className="mt-1 p-2 w-full border rounded-md"
//                   required
//                 />
//               ) : (
//                 <input
//                   type={field.type}
//                   id={field.name}
//                   name={field.name}
//                   value={formData[field.name]}
//                   onChange={handleChange}
//                   className="mt-1 p-2 w-full border rounded-md"
//                   required
//                 />
//               )}
//             </div>
//           ))}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             onClick={handleSubmit}
//             className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FreeListingForm;



"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "@/database/firebaseConfig"; // Import your Firebase configuration

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  shopImage: string;
  services: string;
}

interface InputField {
  name: string;
  label: string;
  type: string;
  rows?: number;
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

  const [showSuccessPopup, setShowSuccessPopup] = useState<boolean>(false);
  const [showErrorPopup, setShowErrorPopup] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | (HTMLTextAreaElement & { name: keyof FormData })
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTextareaChange = (
    e: ChangeEvent<HTMLTextAreaElement & { name: keyof FormData }>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Store data in Firestore
    const firestore = getFirestore();
    try {
      const docRef = await addDoc(collection(firestore, "FreeListing"), formData);
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

  const closePopup = () => {
    setShowSuccessPopup(false);
    setShowErrorPopup(false);
  };

  const inputFields: InputField[] = [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Business Email", type: "email" },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "address", label: "Address", type: "textarea", rows: 3 },
    { name: "shopImage", label: "Shop Image URL", type: "text" },
    { name: "services", label: "Services", type: "select" },
  ];

  const servicesOptions = ["Option 1", "Option 2", "Option 3"]; // Add your service options here

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-xl flex">
        {/* Left Side (Image) */}
        <div className="flex-shrink-0 p-4">
          <img
            src={formData.shopImage || "https://placehold.it/150x150"}
            alt="Shop"
            className="rounded-md"
            style={{ width: "150px", height: "150px" }}
          />
        </div>

        {/* Right Side (Form) */}
        <div className="flex-grow p-8 bg-white shadow-md rounded-md">
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
                />
              ) : field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
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
