import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Stethoscope,
  ScanLine,
  ClipboardList,
  Scissors,
  Syringe,
  Radiation,
  Target,
  HeartPulse,
} from "lucide-react";

const steps = [
  {
    step: "1. Diagnosis",
    details:
      "Imaging tests (like mammograms or ultrasounds) followed by a biopsy to confirm the presence and type of cancer cells.",
    icon: <Stethoscope className="w-6 h-6 text-pink-500" />,
  },
  {
    step: "2. Staging",
    details:
      "Determines tumor size and spread using CT, MRI, or PET scans.",
    icon: <ScanLine className="w-6 h-6 text-pink-500" />,
  },
  {
    step: "3. Treatment Planning",
    details:
      "A personalized plan is created by a team of specialists based on the cancer type and stage.",
    icon: <ClipboardList className="w-6 h-6 text-pink-500" />,
  },
  {
    step: "4. Surgery",
    details:
      "Options include lumpectomy or mastectomy, sometimes with lymph node removal.",
    icon: <Scissors className="w-6 h-6 text-pink-500" />,
  },
  {
    step: "5. Chemotherapy",
    details:
      "Drug treatment before or after surgery to destroy cancer cells.",
    icon: <Syringe className="w-6 h-6 text-pink-500" />,
  },
  {
    step: "6. Radiation Therapy",
    details:
      "High-energy rays target remaining cancer cells, usually after surgery.",
    icon: <Radiation className="w-6 h-6 text-pink-500" />,
  },
  {
    step: "7. Hormone or Targeted Therapy",
    details:
      "Blocks hormones or targets proteins like HER2 to slow or stop cancer growth.",
    icon: <Target className="w-6 h-6 text-pink-500" />,
  },
  {
    step: "8. Follow-Up & Recovery",
    details:
      "Includes monitoring, rehab, mental health support, and lifestyle adjustments.",
    icon: <HeartPulse className="w-6 h-6 text-pink-500" />,
  },
];

const TreatmentProcess = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-700 to-slate-900 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-transparent shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-serif text-pink-600 mb-4">
          Breast Cancer Treatment Process
        </h1>
        <p className="text-gray-300 mb-6">
          Breast cancer treatment involves several stages. Each patient’s
          journey is unique, but the steps below are commonly followed during
          diagnosis and treatment:
        </p>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-4 border-l-4 border-pink-400 pl-4 py-3 bg-pink-50 rounded"
            >
              <div className="mt-1">{step.icon}</div>
              <div>
                <h2 className="text-lg font-semibold text-start text-pink-600">
                  {step.step}
                </h2>
                <p className="text-gray-800">{step.details}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-gray-500">
          <strong>Note:</strong> Treatment may vary depending on the cancer type,
          stage, genetic markers, and patient preferences. Always consult with a
          medical professional to determine the best approach.
        </p>
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

export default TreatmentProcess;
