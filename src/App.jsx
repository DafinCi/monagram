import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">
          Monad Wallet Story 🚀
        </h1>

        <p className="text-zinc-400 text-lg max-w-md mx-auto">
          Transform your onchain activity into a visual identity.
        </p>

        <button className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition">
          Test Button
        </button>

        <div className="flex justify-center gap-4 mt-6">
          <div className="w-20 h-20 bg-blue-500 rounded-xl"></div>
          <div className="w-20 h-20 bg-pink-500 rounded-xl"></div>
          <div className="w-20 h-20 bg-green-500 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}

export default App;