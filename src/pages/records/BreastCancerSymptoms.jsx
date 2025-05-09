import React, { useState } from "react";

const BreastCancerSymptoms = () => {
  const symptoms = [
    {
      title: "Lump in the Breast or Underarm",
      description:
        "A new, hard lump or mass, often painless but sometimes tender.",
    },
    {
      title: "Change in Breast Size or Shape",
      description: "Swelling, shrinkage, or distortion in one breast.",
    },
    {
      title: "Skin Changes",
      description:
        "Dimpling, puckering, or thickening of the skin, sometimes resembling an orange peel.",
    },
    {
      title: "Nipple Discharge",
      description:
        "Any fluid leaking from the nipple, especially if it's bloody or occurs without squeezing.",
    },
    {
      title: "Inverted or Retracted Nipple",
      description: "Nipple turning inward instead of pointing outward.",
    },
    {
      title: "Redness or Scaliness",
      description: "Rash-like symptoms around the nipple or breast skin.",
    },
    {
      title: "Pain in the Breast or Nipple",
      description: "Persistent pain not related to the menstrual cycle.",
    },
    {
      title: "Lymph Node Swelling",
      description:
        "Enlarged lymph nodes near the collarbone or under the arm.",
    },
  ];

  // Quiz logic
  const [showQuiz, setShowQuiz] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const questions = [
    { text: "Do you have a family history of breast cancer?", weight: 2 },
    { text: "Have you noticed any lumps or unusual changes in your breast?", weight: 3 },
    { text: "Are you above 40 years old?", weight: 1 },
    { text: "Do you smoke or consume alcohol frequently?", weight: 2 },
    { text: "Have you had hormone replacement therapy?", weight: 2 },
    { text: "Do you experience persistent breast pain that does not go away?", weight: 3 },
    { text: "Have you noticed any nipple discharge, especially blood-stained?", weight: 3 },
    { text: "Do you have a history of radiation exposure to the chest?", weight: 2 },
    { text: "Are you overweight or do you have a sedentary lifestyle?", weight: 2 },
    { text: "Do you follow a diet high in processed foods and unhealthy fats?", weight: 1 }
  ];

  const handleAnswer = (answer) => {
    const score = answer ? questions[questionIndex].weight : 0;
    const updatedAnswers = [...answers, score];
    setAnswers(updatedAnswers);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      const totalScore = updatedAnswers.reduce((a, b) => a + b, 0);
      if (totalScore >= 7) setResult("High Risk: Please consult a doctor.");
      else if (totalScore >= 4) setResult("Moderate Risk: Stay alert and monitor symptoms.");
      else setResult("Low Risk: Maintain regular checkups.");
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-6 bg-gray-800 shadow-lg rounded-2xl">
      <h1 className="text-3xl font-serif text-pink-400 mb-4">
        Breast Cancer Symptoms
      </h1>
      <p className="text-green-500 mb-6">
        Early detection of breast cancer can greatly improve the chances of
        successful treatment. Here are some of the most common signs and
        symptoms to look out for:
      </p>

      <ul className="list-disc text-start pl-6 text-gray-200 space-y-3">
        {symptoms.map((symptom, index) => (
          <li key={index}>
            <strong>{symptom.title}:</strong> {symptom.description}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-green-500">
        <strong>Note:</strong> These symptoms don't always mean breast cancer.
        However, if you notice any changes, it's important to consult a
        healthcare professional promptly.
      </p>

      {/* Quiz Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-pink-500 mb-4"> Let's take a Quiz </h2>
        <p className="text-gray-300 mb-4">
        Answer a few quick questions to assess your potential risk for breast cancer.
        </p>

        {!showQuiz ? (
          <button
            onClick={() => setShowQuiz(true)}
            className="p-2 bg-green-400 hover:bg-green-800 text-white font-bold rounded"
          >
            Start Quiz
          </button>
        ) : result ? (
          <div className="mt-4 text-gray-200">
            <p className="font-semibold">{result}</p>
            <button
              onClick={() => {
                setShowQuiz(false);
                setQuestionIndex(0);
                setAnswers([]);
                setResult(null);
              }}
              className="mt-4 p-2 bg-green-600 hover:bg-gray-500 text-white rounded"
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-lg text-red-400 font-mono mb-3">{questions[questionIndex].text}</p>
            <button
              onClick={() => handleAnswer(true)}
              className="mr-2 p-2 bg-green-500 hover:bg-green-400 text-white rounded"
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="p-2 bg-red-500 hover:bg-red-400 text-white rounded"
            >
              No
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default BreastCancerSymptoms;
