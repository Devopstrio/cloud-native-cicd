import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts';
import { Rocket, Shield, Activity, GitCommit, CheckCircle2, AlertCircle } from 'lucide-react';

const doraData = [
  { name: 'Mon', frequency: 12 },
  { name: 'Tue', frequency: 18 },
  { name: 'Wed', frequency: 15 },
  { name: 'Thu', frequency: 22 },
  { name: 'Fri', frequency: 30 },
  { name: 'Sat', frequency: 8 },
  { name: 'Sun', frequency: 5 },
];

const releases = [
  { id: 'rel-001', app: 'payment-service', version: 'v1.4.2', env: 'Prod', status: 'Healthy', time: '2m ago' },
  { id: 'rel-002', app: 'auth-api', version: 'v2.1.0-canary', env: 'Staging', status: 'Progressing', time: '15m ago' },
  { id: 'rel-003', app: 'order-worker', version: 'v0.9.5', env: 'Prod', status: 'Degraded', time: '1h ago' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter">Nexus Control Plane</h1>
          <p className="text-slate-400 mt-3 text-xl max-w-2xl">Enterprise GitOps and progressive delivery orchestration for global Kubernetes estates.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-slate-900 border border-slate-800 text-slate-300 px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition">View Logs</button>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl font-bold transition shadow-xl shadow-blue-900/40">New Deployment</button>
        </div>
      </div>

      {/* DORA KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Deployment Frequency" value="Elite" change="+12%" icon={<Rocket className="text-blue-400" />} />
        <StatCard title="Change Failure Rate" value="2.1%" change="-0.5%" icon={<Shield className="text-emerald-400" />} />
        <StatCard title="Mean Time to Recovery" value="45m" change="-12m" icon={<Activity className="text-yellow-400" />} />
        <StatCard title="Lead Time for Changes" value="4.2h" change="-1.1h" icon={<GitCommit className="text-sky-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* DORA Trend */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 p-10 rounded-[2.5rem] backdrop-blur-xl">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
              Deployment Frequency Trend
            </h2>
            <div className="text-xs font-black uppercase text-slate-500 tracking-widest bg-slate-800 px-3 py-1 rounded-full text-white">Releases / Day</div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={doraData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px' }}
                />
                <Bar dataKey="frequency" fill="#2563eb" radius={[10, 10, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Releases */}
        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[2.5rem] backdrop-blur-xl">
          <h2 className="text-2xl font-bold mb-10 text-white flex items-center gap-3">
            <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
            Live Release Board
          </h2>
          <div className="space-y-4">
            {releases.map((rel) => (
               <ReleaseItem key={rel.id} {...rel} />
            ))}
          </div>
          <button className="w-full mt-10 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl text-sm font-bold transition border border-slate-700 shadow-lg">View Full Audit Log</button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon }: any) => (
  <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-blue-500/30 transition-all group overflow-hidden relative shadow-2xl">
    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-150 duration-700">
       {React.cloneElement(icon, { size: 140 })}
    </div>
    <div className="relative z-10">
      <div className="p-3 bg-slate-950 rounded-2xl w-fit mb-6 border border-slate-800/50 shadow-inner group-hover:rotate-12 transition duration-500">{icon}</div>
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">{title}</p>
      <div className="flex items-end gap-3">
        <p className="text-3xl font-black text-white tracking-tighter">{value}</p>
        <span className={`text-[11px] font-black pb-1.5 ${change.startsWith('-') ? 'text-emerald-400' : 'text-blue-400'}`}>{change}</span>
      </div>
    </div>
  </div>
);

const ReleaseItem = ({ app, version, env, status, time }: any) => (
  <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl hover:bg-slate-800/50 transition cursor-pointer group border-l-4 border-l-blue-600">
    <div className="flex justify-between items-start mb-2">
      <div>
        <p className="text-sm font-bold text-slate-100 group-hover:text-blue-400 transition">{app}</p>
        <p className="text-[10px] text-slate-500 font-mono">{version}</p>
      </div>
      <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter ${status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-400' : status === 'Degraded' ? 'bg-rose-500/10 text-rose-400' : 'bg-blue-500/10 text-blue-400'}`}>
        {status}
      </span>
    </div>
    <div className="flex justify-between items-center text-[10px]">
      <span className="text-slate-400 font-bold uppercase">{env}</span>
      <span className="text-slate-600">{time}</span>
    </div>
  </div>
);

export default Dashboard;
