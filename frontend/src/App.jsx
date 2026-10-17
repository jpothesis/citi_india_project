import React from 'react';
import { LayoutDashboard, Award, Briefcase, HelpCircle, MapPin } from 'lucide-react';

function App() {
  return (
    <div className="flex h-screen bg-baseBlack">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-charcoal border-r border-borderTone flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-brightCyan">Prakash</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface text-brightCyan hover:bg-cardHover transition-colors border border-borderTone">
            <LayoutDashboard size={20} />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-cardHover transition-colors">
            <MapPin size={20} />
            Opportunity Board
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-cardHover transition-colors">
            <Award size={20} />
            Weekly Challenge
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-cardHover transition-colors">
            <Briefcase size={20} />
            Skill Passport
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-cardHover transition-colors">
            <HelpCircle size={20} />
            Ask a Guide
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-white">Welcome back</h2>
          <button className="px-5 py-2.5 bg-brightCyan text-baseBlack font-bold rounded-lg hover:shadow-[0_0_15px_#41EAD4] transition-all">
            Connect Wallet
          </button>
        </header>

        {/* Example Card for the "One Skill, One Week" Challenge */}
        <div className="bg-surface border border-borderTone rounded-xl p-6 relative overflow-hidden group hover:border-brightCyan transition-colors">
          <div className="absolute top-0 right-0 w-2 h-full bg-neonPink"></div>
          <h3 className="text-xl font-bold text-white mb-2">Weekly Challenge: Digital Menu</h3>
          <p className="text-gray-400 mb-6">Help a local shop create a digital menu and upload the link here.</p>
          <button className="px-4 py-2 border border-neonYellow text-neonYellow rounded hover:bg-neonYellow hover:text-baseBlack transition-colors font-semibold">
            Submit Project
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;