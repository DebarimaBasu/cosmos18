// import React from "react";
// import KanbanBoard from "../../components/KanbanBoard";
// import { useLocation } from "react-router-dom";

// const ScreeningSchedule = () => {
//   const state = useLocation();
//   return (
//     <div className="w-full overflow-scroll ">
//       <KanbanBoard state={state} />;
//     </div>
//   );
// };

// export default ScreeningSchedule;
// import { useState, useEffect } from "react";
// import { useUser,useClerk } from "@clerk/clerk-react";
// import { TodoProvider } from "../../context/TodoContext";
// import "./App.css";
// import TodoForm from "../../components/TodoForm";
// import TodoItem from "../../components/TodoItem";

// function ScreeningSchedule() {
//   const [todos, setTodos] = useState([]);
//   const { isSignedIn, isLoaded } = useUser();
//  const clerk = useClerk();

//   useEffect(() => {
//     if (isLoaded && !isSignedIn) {
//       clerk.redirectToSignIn();
//       // redirectToSignIn(); // Automatically redirects unauthenticated users
//     }
//   }, [isLoaded, isSignedIn]);

//   useEffect(() => {
//     const todos = JSON.parse(localStorage.getItem("todos"));
//     if (todos && todos.length > 0) {
//       setTodos(todos);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("todos", JSON.stringify(todos));
//   }, [todos]);

//   const addTodo = (todo) => {
//     setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
//   };

//   const updateTodo = (id, todo) => {
//     setTodos((prev) =>
//       prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
//     );
//   };

//   const deleteTodo = (id) => {
//     setTodos((prev) => prev.filter((todo) => todo.id !== id));
//   };

//   const toggleComplete = (id) => {
//     setTodos((prev) =>
//       prev.map((prevTodo) =>
//         prevTodo.id === id
//           ? { ...prevTodo, completed: !prevTodo.completed }
//           : prevTodo
//       )
//     );
//   };

//   // if (!isLoaded) return null; // Avoid flicker or SSR mismatch

//   return (
//     <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
//       <div className="bg-slate-950 min-h-screen py-8">
//         <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
//           <h1 className="text-2xl font-bold text-center mb-8 mt-2">TRACK YOUR PROGRESS</h1>
//           <div className="mb-4">
//             <TodoForm />
//           </div>
//           <div className="flex flex-wrap gap-y-3">
//             {todos.map((todo) => (
//               <div key={todo.id} className="w-full">
//                 <TodoItem todo={todo} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </TodoProvider>
//   );
// }

// export default ScreeningSchedule;
import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { TodoProvider } from "../../context/TodoContext";
import { db } from "../../utils/dbConfig";
import { Records } from "../../utils/schema";
import { eq } from "drizzle-orm";

import TodoForm from "../../components/TodoForm";
import TodoItem from "../../components/TodoItem";
import "./App.css";

function ScreeningSchedule() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { redirectToSignIn } = useClerk();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Redirect to sign-in if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirectToSignIn();
    }
  }, [isLoaded, isSignedIn, redirectToSignIn]);

  // Fetch todos when the user is signed in
  useEffect(() => {
    const fetchTodos = async () => {
      if (isLoaded && isSignedIn && user?.id) {
        setLoading(true);
        try {
          const fetchedTodos = await db
            .select()
            .from(Records)
            .where(eq(Records.userId, user.id));
          setTodos(fetchedTodos);
        } catch (error) {
          console.error("Error fetching todos:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTodos();
  }, [isLoaded, isSignedIn, user?.id]);

  // Add new todo to the database
  const addTodo = async (todo) => {
    setLoading(true);
    try {
      const newRecord = await db.insert(Records).values({
        userId: user.id,
        todo: todo.todo,
        completed: todo.completed || false,
        createdBy: user.name || "Unknown",  // Using Clerk user name
        
      });
      console.log(todo.id, todo, todo.completed, todo.createdBy);

      setTodos((prev) => [newRecord, ...prev]);
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update a specific todo
  const updateTodo = async (id, updatedTodo) => {
    setLoading(true);
    try {
      const updatedRecord = await db
        .update(Records)
        .set({
          todo: updatedTodo.todo,
          completed: updatedTodo.completed,
          createdBy: updatedTodo.createdBy || "Unknown", // Update createdBy if necessary
        })
        .where(eq(Records.id, id));

      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedRecord : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a todo from the database
  const deleteTodo = async (id) => {
    setLoading(true);
    try {
      await db.delete(Records).where(eq(Records.id, id));
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setLoading(false);
    }
  };

  // Toggle the completion status of a todo
  const toggleComplete = async (id) => {
    setLoading(true);
    try {
      // Find the todo by id in the current todos array
      const todo = todos.find((t) => t.id === id);
      if (!todo) return;
  
      // Toggle the completed field
      const updatedRecord = await db
        .update(Records)
        .set({ completed: !todo.completed }) // Toggle the completed status
        .where(eq(Records.id, id)); // Specify the todo by id
  
      // Update the state to reflect the change
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <TodoProvider>
      <div className="bg-slate-950 min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">TRACK YOUR PROGRESS</h1>
          <div className="mb-4">
            <TodoForm addTodo={addTodo} />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {loading ? (
              <p>Loading...</p>
            ) : (
              todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} toggleComplete={toggleComplete} />
                </div>
                
              ))
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default ScreeningSchedule;
