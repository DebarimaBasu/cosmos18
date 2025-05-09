// import {createContext, useContext} from "react"


// export const TodoContext = createContext({
//     todos: [
//         {
//             id: 1,
//             todo: "Todo Message",
//             completed: false
//         }
//     ],
//     addTodo: (todo) => {},
//     updateTodo: (id, todo) => {},
//     deleteTodo: (id) => {},
//     toggleComplete: (id) => {}
// })

// export const useTodo = () => {
//     return useContext(TodoContext)
// }

// export const TodoProvider = TodoContext.Provider

  
import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../utils/dbConfig"; // Adjust path if needed
import { Records } from "../utils/schema";
import { eq } from "drizzle-orm";
import { useUser, useClerk } from "@clerk/clerk-react";

// Create context with default values
export const TodoContext = createContext({
  todos: [],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggleComplete: (id) => {},
  fetchTodos: () => {},
});

export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const { user } = useClerk();
  const { isSignedIn, isLoaded } = useUser();

  // ✅ Define fetchTodos outside useEffect so it can be reused
  const fetchTodos = async () => {
    try {
      if (user?.id) {
        const fetchedTodos = await db
          .select()
          .from(Records)
          .where(eq(Records.userId, user.id));  // Fetch todos based on userId
        setTodos(fetchedTodos);
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Automatically fetch todos when the user is signed in
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      fetchTodos();
    }
  }, [isLoaded, isSignedIn, user]);
 


  // Add a new todo
//  const addTodo = async ({ todo, completed = false, createdBy = "Unknown" }) => {
//   try {
//     const newTodo = {
//       userId: user.id,
//       todo,
//       completed,
//       createdBy,
//     };

//     // Optimistically add the new todo to the state immediately
//     setTodos((prev) => [...prev, newTodo]);

//     // Now insert the new todo into the database
//     await db.insert(Records).values(newTodo);

//     // Re-fetch todos from DB to ensure state consistency (optional)
//     fetchTodos();
//   } catch (error) {
//     console.error("Error adding todo:", error);
//   }
// };
const addTodo = async ({ todo, completed = false, createdBy = "Unknown" }) => {
  try {
    const newTodo = {
      userId: user.id,
      todo,
      completed,
      createdBy,
    };

    // Insert the new todo into the database
    await db.insert(Records).values(newTodo);

    // Refresh the page to show the updated list of todos
    window.location.reload();
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};


  // Update a todo
  const updateTodo = async (id, updatedTodo) => {
    try {
      await db
        .update(Records)
        .set({
          todo: updatedTodo,  // Update the todo text
        })
        .where(eq(Records.id, id));

      await fetchTodos();  // Re-fetch todos to reflect the updated one
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await db.delete(Records).where(eq(Records.id, id));  // Delete the todo by id
      setTodos((prev) => prev.filter((todo) => todo.id !== id));  // Remove from state
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Toggle completion
  const toggleComplete = async (id) => {
    try {
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;

      await db
        .update(Records)
        .set({ completed: !todo.completed })  // Toggle the completion status
        .where(eq(Records.id, id));

      await fetchTodos();  // Re-fetch todos to reflect the completion toggle
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
