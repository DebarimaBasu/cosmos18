import React, { createContext, useContext, useState, useCallback } from "react";
import { db } from "../utils/dbConfig"; // Adjust the path to your dbConfig
import { Users, Records } from "../utils/schema"; // Adjust the path to your schema definitions
import { eq } from "drizzle-orm";
import { useNavigate } from "react-router-dom";
// Create a context
const StateContext = createContext();

// Provider component
export const StateContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  

  // Function to fetch all users
  const fetchUsers = useCallback(async () => {
    try {
      const result = await db.select().from(Users).execute();
      setUsers(result);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  // Function to fetch user details by email
 
  // const fetchUserByEmail = useCallback(async (emailObj) => {
  //   if (!emailObj) return; // Prevent calling with undefined/null
  
  //   const email = typeof emailObj === "string" ? emailObj : emailObj.emailAddress; // Extract email
  
  //   if (!email || typeof email !== "string") {
  //     console.error("❌ Invalid email format:", email);
  //     return;
  //   }
  
  //   console.log("Fetching user for email:", email);
  
  //   try {
  //     const result = await db
  //       .select()
  //       .from(Users)
  //       .where(eq(Users.createdBy, email.toLowerCase())) // Ensure case insensitivity
  //       .execute();
  
  //     console.log("Database query result:", result);
  
  //     if (result.length > 0) {
  //       console.log("✅ User found:", result[0]); // Always take the first user
  //       setCurrentUser(result[0]); 
  //     } else {
  //       console.log("❌ No user found, setting currentUser to null");
  //       setCurrentUser(null);
  //     }
  //   } catch (error) {
  //     console.error("⚠️ Error fetching user by email:", error);
  //   }
  // }, []);
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const fetchUserByEmail = useCallback(async (emailObj) => {
    if (!emailObj) return;
  
    const email = typeof emailObj === "string" ? emailObj : emailObj.emailAddress;
  
    if (!email || typeof email !== "string") {
      console.error("❌ Invalid email format:", email);
      return;
    }
  
    console.log("Fetching user for email:", email);
  
    try {
      setLoading(true);
      const result = await db
        .select()
        .from(Users)
        .where(eq(Users.createdBy, email.toLowerCase()))
        .execute();
  
      console.log("Database query result:", result);
  
      if (result.length > 0) {
        console.log("✅ User found:", result[0]);
        setCurrentUser(result[0]);
      } else {
        console.log("❌ No user found, setting currentUser to null");
        setCurrentUser(null);
        navigate("/onboarding"); // Navigate to onboarding if no user found
      }
    } catch (error) {
      console.error("⚠️ Error fetching user by email:", error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);
  
  
  
  // const fetchUserByEmail = useCallback(async (email) => {
  //   try {
  //     const result = await db
  //       .select()
  //       .from(Users)
  //       .where(eq(Users.createdBy, email))
  //       .execute();
  //     if (result.length > 0) {
  //       setCurrentUser(result[0]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user by email:", error);
  //   }
  // }, []);

  // Function to create a new user
  const createUser = useCallback(async (userData) => {
    try {
      const newUser = await db
        .insert(Users)
        .values(userData)
        .returning({ id: Users.id, createdBy: Users.createdBy })
        .execute();
      setUsers((prevUsers) => [...prevUsers, newUser[0]]);
      return newUser[0];
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  }, []);

  // Function to fetch all records for a specific user
  const fetchUserRecords = useCallback(async (userEmail) => {
    try {
      const result = await db
        .select()
        .from(Records)
        .where(eq(Records.createdBy, userEmail))
        .execute();
      setRecords(result);
    } catch (error) {
      console.error("Error fetching user records:", error);
    }
  }, []);

  // Function to create a new record
  const createRecord = useCallback(async (recordData) => {
    try {
      const newRecord = await db
        .insert(Records)
        .values(recordData)
        .returning({ id: Records.id })
        .execute();
      setRecords((prevRecords) => [...prevRecords, newRecord[0]]);
      return newRecord[0];
    } catch (error) {
      console.error("Error creating record:", error);
      return null;
    }
  }, []);

  const updateRecord = useCallback(async (recordData) => {
    try {
      const { documentID, ...dataToUpdate } = recordData;
      console.log(documentID, dataToUpdate);
      const updatedRecords = await db
        .update(Records)
        .set(dataToUpdate)
        .where(eq(Records.id, documentID))
        .returning();
        // return updatedRecords[0];
    } catch (error) {
      console.error("Error updating record:", error);
      return null;
    }
  }, []);
  const handleUserCreation = async (user) => {
    if (!user) return;
  
    const email = user.emailAddress.toLowerCase();
  
    console.log("Checking if user exists before inserting:", email);
  
    const existingUser = await db
      .select()
      .from(Users)
      .where(eq(Users.createdBy, email))
      .execute();
  
    if (existingUser.length > 0) {
      console.log("✅ User already exists, skipping insertion.");
      return;
    }
  
    console.log("🆕 User does not exist, inserting new user...");
  
    await db.insert(Users).values({
      createdBy: email,
      name: user.fullName || "New User",
    });
  
    console.log("🎉 User inserted successfully!");
  };
  

  return (
    <StateContext.Provider
      value={{
        users,
        records,
        fetchUsers,
        fetchUserByEmail,
        createUser,
        fetchUserRecords,
        createRecord,
        currentUser,
        updateRecord,
        handleUserCreation
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the context
export const useStateContext = () => useContext(StateContext);