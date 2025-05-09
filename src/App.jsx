import React from 'react'
import { Sidebar, Navbar } from "./components";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useStateContext } from "./context/index.jsx";
// import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import ScreeningSchedule from "./pages/records/ScreeningSchedule";

import Predict from './pages/records/predict.jsx';
import HospitalLocator from './pages/records/HospitalLocator.jsx';
import {ChatBot} from './pages/records/chatBot.jsx';
import { useEffect } from "react";
import { Home, Onboarding,Profile } from "./pages";
import Learning from './pages/records/precautions.jsx';
// import MedicalRecords from "./pages/records/index";
         


 import Process from './pages/records/Process.jsx';
import { Buffer } from "buffer";
import BreastCancerSymptoms from './pages/records/BreastCancerSymptoms.jsx';
import DietChart from './pages/records/DietChart.jsx';
import UploadDoctor from './pages/records/uploadDoctor.jsx';
import TreatmentProcess from './pages/records/TreatmentProcess.jsx';
const App = () => {
  const { user,  isSignedIn,isLoaded,   redirectToSignIn , currentUser } = useStateContext();
  // const {  currentUser,fetchUserByEmail  } = useStateContext();
  // const { isSignedIn,isLoaded, } = useUser();
  //  const { redirectToSignIn } = useClerk();
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.Buffer) {
      window.Buffer = Buffer;
    }
  }, []);
  
  useEffect(() => {
    console.log("isLoaded:", isLoaded);
    console.log("isSignedIn:", isSignedIn);
    console.log("user:", user);
    console.log("currentUser:", currentUser);
  
    if (!isLoaded) return; // Wait for Clerk to finish loading
  
    if (!isSignedIn) {
      console.log("Not signed in. Redirecting to Sign In.");
      redirectToSignIn();
    } else if (user && !currentUser) {
      console.log("Signed in, but no currentUser. Redirecting to onboarding.");
      navigate("/onboarding");
    }
  }, [isSignedIn, user, currentUser, isLoaded, navigate]);
  

  // useEffect(() => {
  //   if (user && currentUser=== null) {
  //     console.log("Redirecting to onboarding");
  //     navigate("/profile");
    
  //   }
  
  // }, [user, currentUser, navigate]);
 
  // // const { user, loading } = useUser(); 
  // useEffect(() => {
  //   if (loading) return; // Don't run if still loading
  
  //   if (user && currentUser === null) {
  //     console.log("Redirecting to onboarding");
  //     navigate("/onboarding");
  //   }
  // }, [loading, user, currentUser]);
  
  
return (
    <div className="sm:-8 relative flex min-h-screen flex-row bg-[#13131a] p-4">
      <div className="relative mr-10 hidden sm:flex">
        <Sidebar />
      </div>

      <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
         <Navbar /> 

        <Routes>
          <Route path="/" element={<Home/>} />
           <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/profile" element={<Profile />} /> 
          
           
          
          <Route path="/screening-schedules" element={<ScreeningSchedule />} /> 
          <Route path="/predict" element={<Predict/>} /> 
          <Route path="/location" element={<HospitalLocator/>} /> 
          <Route path="/chatbot" element={<ChatBot/>} />
          <Route path="/work" element={<Process/>} />
          <Route path="/symptom" element={<BreastCancerSymptoms/>} />
          <Route path="/diet" element={<DietChart/>} />
          <Route path="/process" element={<TreatmentProcess/>} />
          <Route path="/doctor" element={<UploadDoctor/>} />
          <Route path="/precaution" element={<Learning/>} />
          
        </Routes>
      </div>
    </div>
  );
};


export default App