import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


import { StateContextProvider } from "./context/index.jsx";
import App from "./App";
import "./index.css";
// import { PrivyProvider } from "@privy-io/react-auth";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  //<PrivyProvider
    //appId="cm7ql395d027u109f3qajk7ce"
    //config={{
      //appearance: {
      //theme: "dark",
    //  },
    //   embeddedWallets: {
    //     createOnLogin: "users-without-wallets",
    //   },
 //   }}
  //>
  // <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <Router>
    
      <StateContextProvider>
       
      <App />
      </StateContextProvider>
      </Router>
    </ClerkProvider>
  
  // </React.StrictMode>,
    
      
      
   
  //</PrivyProvider>,
);