import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { GitBranch, Rocket, ShieldCheck, Activity, Settings, LayoutDashboard, Database, Layers } from 'lucide-react';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
        {/* Navigation Sidebar */}
        <aside className="w-72 bg-slate-900/50 backdrop-blur-2xl border-r border-slate-800 flex flex-col p-8 fixed h-full">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-2xl shadow-xl shadow-blue-900/20 text-white">
               <GitBranch size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Nexus CD</span>
          </div>
          
          <nav className="flex-1 space-y-2">
            <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Release Board" active />
            <NavItem to="/pipelines" icon={<Rocket size={20} />} label="Pipelines" />
            <NavItem to="/environments" icon={<Layers size={20} />} label="Environments" />
            <NavItem to="/security" icon={<ShieldCheck size={20} />} label="Security Gates" />
            <NavItem to="/metrics" icon={<Activity size={20} />} label="DORA Analytics" />
            <NavItem to="/gitops" icon={<Database size={20} />} label="GitOps Sync" />
          </nav>

          <div className="pt-6 border-t border-slate-800">
            <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-72">
          <header className="h-20 border-b border-slate-800 flex items-center justify-between px-10 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium uppercase tracking-widest">
              <span>Platform</span>
              <span>/</span>
              <span className="text-white">Delivery Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-semibold">Platform Lead</p>
                <p className="text-[10px] text-blue-400 uppercase tracking-widest font-black">Principal</p>
              </div>
              <div className="w-10 h-10 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center font-bold text-slate-300">PL</div>
            </div>
          </header>

          <div className="p-10 max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
};

const NavItem = ({ to, icon, label, active }: any) => (
  <Link 
    to={to} 
    className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${active ? 'bg-blue-600/10 text-blue-400 border border-blue-500/10 shadow-lg shadow-blue-950/50' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
  >
    <span className={`${active ? 'text-blue-400' : 'group-hover:text-blue-400 transition'}`}>{icon}</span>
    <span className="font-semibold text-sm">{label}</span>
  </Link>
);

export default App;
