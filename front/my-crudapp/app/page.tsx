"use client";

import TodoItem from "./components/TodoItem";
import { useEffect, useState } from "react";
import { todo } from "./types/todo";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {

  const [todos,setTodos] = useState<todo[]>([]);
  const [inputValue,setInputValue] = useState("");
  const router = useRouter();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if (!token){
      router.replace('/login');
      return;
    }
    const load = async ()=>{
      const res = await fetch(`${API_URL}/todo`,{headers: { 'Authorization' : `Bearer ${localStorage.getItem('token')}`}});
      const data = await res.json();
      setTodos(data);
    }
    load();
  },[])
   
    const todoList = todos.map((todo) => <TodoItem key={todo.id} id={todo.id} title={todo.title} done={todo.done} onRemove={remove} onToggle={toggleTodo}/>);



  async function add(){
    const res = await fetch(`${API_URL}/todo`,
      {method: 'POST',
      headers: { 'Content-Type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem('token')}`
       },
      body: JSON.stringify({ title: inputValue })});
    const data = await res.json();
    setTodos([...todos ,data]);
    setInputValue("");
  }

  async function remove(id:number){
    const res = await fetch(`${API_URL}/todo/${id}`,{method: 'DELETE',
      headers: {'Authorization' : `Bearer ${localStorage.getItem('token')}`}
    });
    setTodos(todos.filter((todo)=> todo.id !== id));
  }

  async function toggleTodo(id:number){
    const res = await fetch(`${API_URL}/todo/${id}/toggle`,{method: 'PATCH',
      headers : {'Authorization' : `Bearer ${localStorage.getItem('token')}`}
    });
    setTodos(todos.map((todo)=> todo.id===id ? {...todo,done:!todo.done} : todo));
  }

  function logout(){
    localStorage.removeItem('token');
    router.replace('/login');
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold text-white tracking-tight">My Tasks</h1>
          <button
            onClick={logout}
            className="text-xs text-slate-400 hover:text-white transition-colors border border-slate-700 hover:border-slate-500 px-3 py-1.5 rounded-lg"
          >
            ログアウト
          </button>
        </div>
        <div className="flex gap-2 mb-6">
          <input
            value={inputValue}
            type="text"
            onChange={(e)=>setInputValue(e.target.value)}
            placeholder="新しいタスクを追加..."
            className="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button
            onClick={add}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition shadow-lg shadow-indigo-900"
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
