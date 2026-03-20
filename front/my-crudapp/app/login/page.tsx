'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const router = useRouter();

  async function login(){
    const res= await fetch(`${API_URL}/auth/login`,
      {method: 'POST',
        headers: { 'Content-Type' : 'application/json'},
        body: JSON.stringify({email:email,password:password})});
    const data = await res.text();
    localStorage.setItem('token',data);
    router.replace('/');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">おかえりなさい</h1>
        <p className="text-slate-400 text-sm mb-8">アカウントにログインしてください</p>
        <div className="flex flex-col gap-3">
          <input
            value={email}
            placeholder="メールアドレス"
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input
            value={password}
            placeholder="パスワード"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm placeholder-slate-500 outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button
            onClick={login}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-500 transition shadow-lg shadow-indigo-900 mt-1"
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
}