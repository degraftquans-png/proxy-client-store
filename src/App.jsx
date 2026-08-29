import { useState } from 'react';

const proxies = [
  { id: 1, name: 'Residential Proxies', type: 'RESIDENTIAL', price: '$5', per: '/GB', speed: 'Unlimited', uptime: '99.9%', desc: 'Real IPs from real devices', color: 'bg-blue-600', icon: '🌐' },
  { id: 2, name: 'Datacenter Proxies', type: 'DATACENTER', price: '$2', per: '/IP', speed: '10 Gbps', uptime: '99.9%', desc: 'Fast & stable for high tasks', color: 'bg-slate-900', icon: '⚡' },
  { id: 3, name: 'Mobile Proxies', type: '4G / 5G', price: '$15', per: '/GB', speed: 'Unlimited', uptime: '99.8%', desc: 'Real mobile carrier IPs', color: 'bg-emerald-600', icon: '📱' },
  { id: 4, name: 'ISP Proxies', type: 'STATIC ISP', price: '$3', per: '/IP', speed: '1 Gbps', uptime: '99.9%', desc: 'Static residential, no expiry', color: 'bg-purple-600', icon: '🔒' },
  { id: 5, name: 'Rotating Proxies', type: 'ROTATING', price: '$4', per: '/GB', speed: 'Auto-Rotate', uptime: '99.9%', desc: 'Auto IP rotation every request', color: 'bg-orange-600', icon: '🔄' },
  { id: 6, name: 'Sneaker Proxies', type: 'SNEAKER', price: '$6', per: '/IP', speed: 'Ultra Fast', uptime: '100%', desc: 'Built for drops & copping', color: 'bg-red-600', icon: '👟' },
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">P</div>
            <span className="font-bold text-[18px] text-slate-900">ProxyHub</span>
            <span className="ml-2 text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">PRO</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500 hidden sm:block">Uptime 99.9% • 2.4M IPs</span>
            <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-semibold">Dashboard</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <h1 className="text-[32px] font-extrabold text-slate-900 leading-none tracking-tight">
          Premium Proxies for <span className="text-blue-600">Every Task</span>
        </h1>
        <p className="text-slate-500 mt-3 text-[15px]">Fast, anonymous, and reliable. Choose your proxy type below.</p>
      </div>

      {/* GRID - THIS IS YOUR CARDS */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {proxies.map((p) => (
            <div key={p.id} className="group bg-white rounded-[20px] border border-slate-200 p-6 hover:border-blue-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300">

              {/* TOP */}
              <div className="flex items-start justify-between mb-5">
                <div className={`w-11 h-11 rounded-xl ${p.color} flex items-center justify-center text-[20px] shadow-lg`}>
                  {p.icon}
                </div>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 border border-slate-200 px-2.5 py-1 rounded-full">
                  {p.type}
                </span>
              </div>

              {/* TITLE - VERY VISIBLE */}
              <h3 className="text-[17px] font-bold text-slate-900 mb-1">
                {p.name}
              </h3>
              <p className="text-[13px] text-slate-500 mb-5 leading-snug">
                {p.desc}
              </p>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-3 mb-5 bg-slate-50 rounded-xl p-3 border border-slate-100">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Speed</div>
                  <div className="text-[13px] font-semibold text-slate-900">{p.speed}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Uptime</div>
                  <div className="text-[13px] font-semibold text-emerald-600">{p.uptime}</div>
                </div>
              </div>

              {/* PRICE + BUTTON */}
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-[22px] font-extrabold text-slate-900">{p.price}</span>
                  <span className="text-[12px] text-slate-500 font-medium">{p.per}</span>
                </div>
                <button className="bg-slate-900 group-hover:bg-blue-600 text-white text-[13px] font-bold px-5 py-2.5 rounded-full transition-colors">
                  Buy Now →
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}