import React, { useState } from 'react'
import { useTodo } from '../Context';

function TodoItem({ eachTodo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg,setTodoMsg] = useState(eachTodo.todo)
    
    const {updateTodo,deleteTodo,toggleComplete} = useTodo();

    const editTodo = () =>{
        updateTodo(eachTodo.id,{...eachTodo,todo:todoMsg})
        setIsTodoEditable(false);
    }

    const toggle = () =>{
        toggleComplete(eachTodo.id)
    }

    return (
        <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                eachTodo.completed ? "bg-red-200" : "bg-green-200"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={eachTodo.completed}
                onChange={toggle}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-black/10 px-2" : "border-transparent"
                } ${eachTodo.completed ? "line-through" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (eachTodo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={eachTodo.completed}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(eachTodo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItem;
