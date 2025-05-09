import React, { useEffect } from "react";
import { useStateContext } from "../context/index.jsx";

import { useUser,useClerk } from "@clerk/clerk-react";

const Profile = () => {
   const { isSignedIn, isLoaded } = useUser();
       const clerk = useClerk();
      
        useEffect(() => {
          if (isLoaded && !isSignedIn) {
            clerk.redirectToSignIn();
            // redirectToSignIn(); // Automatically redirects unauthenticated users
          }
        }, [isLoaded, isSignedIn]);
  const { currentUser, fetchUserByEmail } = useStateContext();
  const { user } = useUser();

  // useEffect(() => {
  //   if (!currentUser && user?.primaryEmailAddress?.emailAddress) {
  //     console.log("Fetching user:", user.primaryEmailAddress.emailAddress); // Debugging
  //     fetchUserByEmail(user.primaryEmailAddress.emailAddress);
  //   }
  // }, [currentUser, fetchUserByEmail, user]);
  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress && currentUser === null) {
      console.log("Fetching user:", user.primaryEmailAddress.emailAddress);
      fetchUserByEmail(user.primaryEmailAddress.emailAddress);
    }
  }, [user, currentUser]);
  

  if (!currentUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-gray-400">Processing...</div>
      </div>
    );
  }
  // console.log("User:", user);
  // console.log("Primary Email:", user?.primaryEmailAddress?.emailAddress);
  


  return (
    <div className="mx-auto mt-16 max-w-3xl rounded-lg bg-[#1c1c24] p-6 shadow-lg">
      <div className="flex flex-col items-center">
        <p className="mb-4 flex h-20 w-20 flex-row items-center justify-center rounded-full bg-[#0092F3]">
          <span className="text-6xl">😊</span>
        </p>
        <h1 className="mb-2 text-3xl font-semibold text-white">User Profile</h1>
        <div className="mt-4 w-full">
          <p className="mb-1 text-sm text-gray-400">Email:</p>
         
          <p className="mb-4 text-lg font-semibold text-white">
          {/* {currentUser?.createdBy || "Email not available"} */}
          {currentUser.createdBy}
          </p>
       
  

            {/* {currentUser.emailAddresses[0]?.emailAddress} */}

          {/* </p> */}

          <p className="mb-1 text-sm text-gray-400">Username:</p>
          <p className="mb-4 text-lg font-semibold text-white">
            {currentUser.username}
          </p>

          <p className="mb-1 text-sm text-gray-400">Age:</p>
          <p className="mb-4 text-lg font-semibold text-white">
            {currentUser.age}
          </p>

          <p className="mb-1 text-sm text-gray-400">Location:</p>
          <p className="text-lg font-semibold text-white">
            {currentUser.location}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;