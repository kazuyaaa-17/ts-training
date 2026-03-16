"use client";

import TodoItem from "./components/TodoItem";
import { useEffect, useState } from "react";
import { todo } from "./types/todo";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {

  const [todos,setTodos] = useState<todo[]>([]);
  const [inputValue,setInputValue] = useState("");

  useEffect(()=>{
    const load = async ()=>{
      const res = await fetch(`${API_URL}/todo`);
      const data = await res.json();
      setTodos(data);
    }
    load();
  },[])
   
    const todoList = todos.map((todo) => <TodoItem key={todo.id} id={todo.id} title={todo.title} done={todo.done} onRemove={remove} onToggle={toggleTodo}/>);



  async function add(){
    const res = await fetch(`${API_URL}/todo`,
      {method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: inputValue })});
    const data = await res.json();
    setTodos([...todos ,data]);
    setInputValue("");
  }

  async function remove(id:number){
    const res = await fetch(`${API_URL}/todo/${id}`,{method: 'DELETE'});
    setTodos(todos.filter((todo)=> todo.id !== id));
  }

  async function toggleTodo(id:number){
    const res = await fetch(`${API_URL}/todo/${id}/toggle`,{method: 'PATCH'});
    setTodos(todos.map((todo)=> todo.id===id ? {...todo,done:!todo.done} : todo));
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-indigo-700 mb-8 tracking-tight">TODO</h1>
        <div className="flex gap-2 mb-6">
          <input
            value={inputValue}
            type="text"
            onChange={(e)=>setInputValue(e.target.value)}
            placeholder="新しいTODOを入力..."
            className="flex-1 px-4 py-2 rounded-xl border border-indigo-200 bg-white text-zinc-700 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <button
            onClick={add}
            className="px-5 py-2 rounded-xl bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm"
          >
            追加
          </button>
        </div>
        <ul className="space-y-2">
          {todoList}
        </ul>
      </div>
    </div>
  );
}
