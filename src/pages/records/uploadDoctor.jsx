import React, { useState, useEffect } from "react";
import { useUser,useClerk } from "@clerk/clerk-react";

const UploadDoctor = () => {
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [doctorName, setDoctorName] = useState("");
  const [contactNumber, setContact] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [doctors, setDoctors] = useState([]);
   
    const { isSignedIn, isLoaded } = useUser();
   const clerk = useClerk();
  
    useEffect(() => {
      if (isLoaded && !isSignedIn) {
        clerk.redirectToSignIn();
        // redirectToSignIn(); // Automatically redirects unauthenticated users
      }
    }, [isLoaded, isSignedIn]);

  useEffect(() => {
    const savedDoctors = JSON.parse(localStorage.getItem("doctors")) || [];
    setDoctors(savedDoctors);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!doctorName || !specialty || !imageFile) return;

    const newDoctor = {
      name: doctorName,
      specialty,
      image: preview,
      contact: contactNumber,
    };

    const updatedDoctors = [...doctors, newDoctor];
    setDoctors(updatedDoctors);
    localStorage.setItem("doctors", JSON.stringify(updatedDoctors));

    // Reset form
    setDoctorName("");
    setContact("");
    setSpecialty("");
    setPreview(null);
    setImageFile(null);
  };

  const handleDelete = (indexToDelete) => {
    const updatedDoctors = doctors.filter((_, index) => index !== indexToDelete);
    setDoctors(updatedDoctors);
    localStorage.setItem("doctors", JSON.stringify(updatedDoctors));
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-700 p-8 rounded-xl shadow-md w-full max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-green-500 text-center">
          Add New Doctor
        </h2>

        <input
          type="text"
          placeholder="Doctor Name"
          className="w-full mb-4 p-2 border rounded"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="contact number"
          className="w-full mb-4 p-2 border rounded"
          value={contactNumber}
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Specialty"
          className="w-full mb-4 p-2 border rounded"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full mb-4"
          required
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg mb-4 mx-auto"
          />
        )}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 w-full rounded hover:bg-green-700"
        >
          Save Doctor
        </button>
      </form>

      {/* Display Doctors */}
      <div className="mt-10 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {doctors.map((doc, i) => (
          <div key={i} className="bg-slate-800 rounded-xl shadow p-4 text-center relative">
            <img
              src={doc.image}
              alt={doc.name}
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
            <h3 className="font-semibold text-lg text-gray-400">{doc.name}</h3>
            <p className="text-sm text-gray-500">{doc.specialty}</p>
            <p className="text-sm text-gray-500">{doc.contact}</p>

            <button
              onClick={() => handleDelete(i)}
              className="mt-3 text-green-600 text-sm hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadDoctor;
