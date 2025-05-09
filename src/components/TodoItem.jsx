// import React, { useState } from 'react'
// import { useTodo } from '../context/TodoContext';

// function TodoItem({ todo }) {
//   const [isTodoEditable, setIsTodoEditable] = useState(false)
//   const [todoMsg, setTodoMsg] = useState(todo.todo)
//   const {updateTodo, deleteTodo, toggleComplete} = useTodo()

//   const editTodo = () => {
//     updateTodo(todo.id, {...todo, todo: todoMsg})
//     setIsTodoEditable(false)
//   }
//   const toggleCompleted = () => {
//     //console.log(todo.id);
//     toggleComplete(todo.id)
//   }

//   return (
//       <div
//           className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
//               todo.completed ? "bg-[#ed6344]" : "bg-[#71aecc]"
//           }`}
//       >
//           <input
//               type="checkbox"
//               className="cursor-pointer"
//               checked={todo.completed}
//               onChange={toggleCompleted}
//           />
//           <input
//               type="text"
//               className={`border outline-none w-full bg-transparent rounded-lg ${
//                   isTodoEditable ? "border-black/10 px-2" : "border-transparent"
//               } ${todo.completed ? "line-through" : ""}`}
//               value={todoMsg}
//               onChange={(e) => setTodoMsg(e.target.value)}
//               readOnly={!isTodoEditable}
//           />
//           {/* Edit, Save Button */}
//           <button
//               className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
//               onClick={() => {
//                   if (todo.completed) return;

//                   if (isTodoEditable) {
//                       editTodo();
//                   } else setIsTodoEditable((prev) => !prev);
//               }}
//               disabled={todo.completed}
//           >
//               {isTodoEditable ? "📁" : "✏️"}
//           </button>
//           {/* Delete Todo Button */}
//           <button
//               className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
//               onClick={() => deleteTodo(todo.id)}
//           >
//               ❌
//           </button>
//       </div>
//   );
// }

// export default TodoItem;
import React, { useState } from "react";

function TodoItem({ todo, updateTodo, deleteTodo, toggleComplete }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo); // Access todo text directly
  const [todoCompleted, setTodoCompleted] = useState(todo.completed); // Handle completion status

  // Handle editing todo
  const editTodo = async () => {
    await updateTodo(todo.id, { ...todo, todo: todoMsg, completed: todoCompleted });
    setIsTodoEditable(false);
  };

  // Handle toggling the completed status
  const toggleCompleted = async () => {
    const newStatus = !todoCompleted;
    await toggleComplete(todo.id);
    setTodoCompleted(newStatus); // Toggle locally too
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
        todoCompleted ? "bg-[#ed6344]" : "bg-[#71aecc]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todoCompleted}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todoCompleted ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todoCompleted) return; // Prevent editing completed todos

          if (isTodoEditable) {
            editTodo(); // Save changes
          } else {
            setIsTodoEditable((prev) => !prev); // Toggle edit mode
          }
        }}
        disabled={todoCompleted} // Disable if the todo is completed
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)} // Delete from database
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
