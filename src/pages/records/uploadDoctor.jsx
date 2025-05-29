import React, { useEffect, useState } from "react";
import {  search } from "../../assets/index";

import { useNavigate } from "react-router-dom";

const helplines = [
  { organization: "National Cancer Helpline (India)", number: "1800-11-1201", description: "Govt. of India helpline for cancer-related support" },
  { organization: "Indian Cancer Society", number: "+91-22-2413-9447", description: "Awareness, screening, rehabilitation" },
  { organization: "Tata Memorial Hospital (Mumbai)", number: "+91-22-2417-7000", description: "Treatment & consultation" },
  { organization: "CanSupport (Delhi NCR)", number: "+91-11-4101-5454", description: "Home-based palliative care" },
  { organization: "Kidwai Memorial Institute (Bangalore)", number: "+91-80-26094000", description: "Public cancer care hospital" },
  { organization: "Adyar Cancer Institute (Chennai)", number: "+91-44-2220-0600", description: "Oncology care, diagnostics" },
  { organization: "Rajiv Gandhi Cancer Institute (Delhi)", number: "+91-11-4702-2222", description: "Specialized cancer treatment" },
  { organization: "American Cancer Society (USA)", number: "1-800-227-2345", description: "24/7 support and resources" },
  { organization: "CancerCare (USA)", number: "1-800-813-4673", description: "Counseling, education, financial assistance" },
  { organization: "Macmillan Cancer Support (UK)", number: "0808 808 00 00", description: "Emotional, practical, financial support" },
  { organization: "Cancer Research UK (UK)", number: "0808 800 4040", description: "General cancer information and guidance" },
  { organization: "Canadian Cancer Society", number: "1-888-939-3333", description: "National support and resources" },
  { organization: "LIVESTRONG Foundation (USA)", number: "1-855-220-7777", description: "Support for survivors and caregivers" },
  { organization: "UICC (Global)", number: "+41 22 809 1811", description: "International Union Against Cancer" },
  { organization: "WHO Cancer Programme", number: "N/A", description: "Guidance for governments and NGOs (website only)" },
];

const UploadDoctor = () => {
  
 
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

 

  const filteredHelplines = helplines.filter((item) =>
    item.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-green-500 mb-6">
          📞 Cancer Helpline Directory
        </h1>

        {/* Search Input */}
        <div className="flex justify-center ">
         <div className=" flex h-[52px] max-w-[458px] flex-row rounded-[100px] bg-gray-800 py-2 pl-4 pr-2 lg:flex-1">
         
          <input
            type="text"
            placeholder="Search by organization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
             
             className="flex w-full bg-transparent font-epilogue text-[14px] font-normal text-white outline-none placeholder:text-[#4b5264]"
            
          />
           <div className="flex h-full w-[72px] cursor-pointer items-center justify-center rounded-[20px] bg-[#4acd8d]">
                    <img src={search} alt="search" className="h-[15px] w-[15px] object-contain" />
                  </div>
          
        </div>
        </div>

        {/* Helpline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-9">
          {filteredHelplines.length > 0 ? (
            filteredHelplines.map((item, index) => (
              <div
                key={index}
                className="bg-slate-800 p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold text-green-400 mb-1">
                  {item.organization}
                </h2>
                <p className="text-gray-300 text-sm mb-2">{item.description}</p>
                <p className="text-lg font-bold text-green-300">
                  {item.number !== "N/A" ? item.number : "Visit Website"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-red-400">No results found.</p>
          )}
        </div>
      </div>
      <div className="mt-12 text-center">
      

{/* Buttons for Navigation with Inline Styling */}
<button 
  onClick={() => navigate('/')} 
  className="w-400 p-2 bg-pink-500 text-white rounded hover:bg-pink-700"
>
  Go to Home Page
</button>
    </div>
    </div>
  );
};







export default UploadDoctor;
