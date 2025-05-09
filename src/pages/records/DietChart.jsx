import React from "react";

const dietSections = [
  {
    title: "Fruits & Vegetables",
    items: [
      "Broccoli, spinach, kale (rich in antioxidants)",
      "Berries like blueberries and strawberries",
      "Citrus fruits (vitamin C and flavonoids)",
      "Tomatoes (lycopene-rich)",
    ],
  },
  {
    title: "Whole Grains",
    items: [
      "Brown rice, quinoa, oats, barley",
      "Whole wheat bread and pasta",
      "High in fiber to support digestion and hormone balance",
    ],
  },
  {
    title: "Lean Proteins",
    items: [
      "Skinless poultry and fish (like salmon or sardines)",
      "Legumes: beans, lentils, chickpeas",
      "Tofu or tempeh (plant-based protein)",
    ],
  },
  {
    title: "Healthy Fats",
    items: [
      "Avocados",
      "Nuts and seeds (e.g., flaxseed, walnuts)",
      "Olive oil for cooking or dressing",
      "Fatty fish (omega-3 fatty acids)",
    ],
  },
  {
    title: "Foods to Limit or Avoid",
    items: [
      "Processed meats (e.g., sausages, bacon)",
      "Sugary drinks and high-sugar foods",
      "Excess alcohol",
      "Fried or heavily processed snacks",
    ],
  },
];

const DietChart = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat py-10 px-4"
      style={{
        backgroundImage:"url('/diet.jpg')",
        // backgroundImage:
        //   "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1950&q=80')", // You can change this URL
      }}
    >
      <div className="max-w-4xl mx-auto p-6 bg-transparent bg-opacity-90 backdrop-blur-md shadow-lg rounded-2xl">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Breast Cancer Nutrition Guide
        </h1>
        <p className="text-gray-900 mb-6">
          A balanced diet can support your body during treatment and recovery,
          or help reduce risk factors for breast cancer. Below is a suggested
          dietary guideline that focuses on whole, nutritious foods:
        </p>

        {dietSections.map((section, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-xl font-semibold text-red-900 mb-2">
              {section.title}
            </h2>
            <ul className=" pl-6 space-y-1 text-white">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        <p className="mt-6 text-sm text-gray-600">
          <strong>Note:</strong> Always consult with a registered dietitian or
          healthcare provider to personalize your diet based on treatment plans
          or medical history.
        </p>
      </div>
    </div>
  );
};

export default DietChart;
