
import React from "react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    quote: "Early detection saved my life. Regular check-ups and awareness made all the difference for me.",
    name: "– Priya M., Survivor",
  },
  {
    quote: "The journey wasn't easy, but with the right support and information, I came out stronger.",
    name: "– Aisha R., Advocate & Educator",
  },
  {
    quote: "Don't ignore the signs. Listen to your body and prioritize your health.",
    name: "– Sunita K., Cancer Survivor",
  },
  {
    quote: "Awareness campaigns like these can save lives. I'm grateful to be part of it.",
    name: "– Dr. Meena S., Oncologist",
  },
];

function Learning() {
  const videos = [
    {
      title: "Breast Cancer Awareness",
      url: "https://www.youtube.com/embed/yyY5A7HnGrA",
      description: "An overview that raises awareness about the importance of breast cancer education, detection, and support."
    },
    {
      title: "Understanding Breast Cancer",
      url: "https://www.youtube.com/embed/rCwkKmLCxBk",
      description: "Explore the biology of breast cancer, how it develops, and its effects on the body."
    },
    {
      title: "Causes of Breast Cancer",
      url: "https://www.youtube.com/embed/6KEcnKzpOmE",
      description: "Learn about the genetic, environmental, and lifestyle factors that may contribute to breast cancer."
    },
    {
      title: "Detecting Breast Cancer Early",
      url: "https://www.youtube.com/embed/jeELLC2L65k",
      description: "Discover the methods used for early detection, including self-exams, screenings, and mammograms."
    },
    {
      title: "Breast Cancer Risk Factors",
      url: "https://www.youtube.com/embed/pawoO8eHvUk",

      description: "Understand the major risk factors and how early intervention can reduce your chances of diagnosis."
    },
    {
      title: "Preventing Breast Cancer",
      url: "https://www.youtube.com/embed/I7wSEIOz-1k",
      description: "Tips on adopting a healthy lifestyle, nutrition, and habits that help prevent breast cancer."
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section 
      className="relative z-4 min-h-20 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:"url('/precaution.jpg')",
        // backgroundImage:
        //   "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzaoFYJnIh6KZxybR3hP90XEIxEBNc9MRgtA&s')", // You can change this URL
      }}
       >
        <h1 className="text-5xl font-bold text-red-900 italic mb-4">Watch & Learn</h1>
        <p className="text-lg text-pink-700 max-w-2xl mx-auto">
          Empower yourself with knowledge. Discover essential insights about breast cancer through curated videos.
        </p>
      </section>

      {/* Video & Description Side-by-Side */}
      <section className="py-16 px-6 max-w-6xl mx-auto space-y-16"
      >
        {videos.map((video, index) => (
          <div key={index} className="flex flex-col md:flex-row items-start gap-8">
            {/* Video */}
            <div className="md:w-1/2 w-full">
              <div className="aspect-video rounded-xl overflow-hidden shadow-lg border border-pink-200">
                <iframe
                  className="w-full h-full"
                  src={video.url}
                  title={video.title}
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            </div>
            {/* Description */}
            <div className="md:w-1/2 w-full text-gray-500">
              <h3 className="text-2xl font-semibold text-green-500 mb-2">{video.title}</h3>
              <p className="text-lg leading-relaxed italic">{video.description}</p>
            </div>
          </div>
        ))}
      </section>
      <div className="mt-20 px-4 max-w-6xl mx-auto text-gray-500">
  <h2 className="text-4xl font-bold italic text-center mb-10">
    <u>What Survivors Say</u>
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="bg-yellow-100 bg-opacity-80 p-6 rounded-xl shadow-lg">
      <p className="text-lg italic mb-4">
        "Early detection saved my life. Regular check-ups and awareness made all the difference for me."
      </p>
      <p className="font-semibold text-right">– Priya M., Survivor</p>
    </div>

    <div className="bg-yellow-100 bg-opacity-80 p-6 rounded-xl shadow-lg">
      <p className="text-lg italic mb-4">
        "The journey wasn't easy, but with the right support and information, I came out stronger."
      </p>
      <p className="font-semibold text-right">– Aisha R., Advocate & Educator</p>
    </div>

    <div className="bg-yellow-100 bg-opacity-80 p-6 rounded-xl shadow-lg">
      <p className="text-lg italic mb-4">
        "Don't ignore the signs. Listen to your body and prioritize your health."
      </p>
      <p className="font-semibold text-right">– Sunita K., Cancer Survivor</p>
    </div>

    <div className="bg-yellow-100 bg-opacity-80 p-6 rounded-xl shadow-lg">
      <p className="text-lg italic mb-4">
        "Awareness campaigns like these can save lives. I'm grateful to be part of it."
      </p>
      <p className="font-semibold text-right">– Dr. Meena S., Oncologist</p>
    </div>
  </div>
</div>



     
    </>
  );
}

export default Learning;
