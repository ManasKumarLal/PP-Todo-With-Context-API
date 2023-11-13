import React, { useEffect, useState } from 'react'
import { TodoProvider } from './Context';
import { TodoForm, TodoItem } from './Components';

const App = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = (todo)=>{
        const data = {id:Date.now(),...todo}
        // setTodos([...todos,todo]);
        setTodos(prevTodo=>[data,...prevTodo])
    }

    const updateTodo = (id,todo)=>{
        setTodos((prevTodo)=>prevTodo.map((elem)=>elem.id===id? todo : elem))
    }

    const deleteTodo = (id)=>{
        setTodos((prevTodo)=>prevTodo.filter(elem=>elem.id!==id));
    }

    const toggleComplete = (id) =>{
        setTodos(prevTodo => prevTodo.map(elem => elem.id===id ? {...elem,completed:(!elem.completed)} : elem))
    }

    useEffect(()=>{
        const todos = JSON.parse(localStorage.getItem('todos'));
        if(todos && todos.length>0){
            setTodos(todos);
        }
    },[])

    useEffect(()=>{
        localStorage.setItem('todos',JSON.stringify(todos));
    },[todos]);

    return (
        <>
            <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
                <div className="bg-slate-800 min-h-screen py-8">
                    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                        <h1 className="text-2xl md:text-4xl font-bold text-center mb-8 mt-2">Save your NOTES✍✍</h1>
                        <div className="mb-4">
                            <TodoForm/>
                        </div>
                        <div className="flex flex-wrap gap-y-3">
                            {todos.map(elem=>{
                                return <div key={elem.id}
                                className='w-full'
                                >
                                    <TodoItem eachTodo={elem}/>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </TodoProvider>
        </>
    )
}

export default App
