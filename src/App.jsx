import { useState } from 'react';

export default function App() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="min-h-screen bg-white text-slate-900 font-['Inter']">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center text-white font-black text-lg">P</div>
              <b className="text-[20px] tracking-tight">proxyhub.io</b>
            </div>
            <nav className="hidden lg:flex gap-7 text-[14px] font-medium text-slate-600">
              <a href="#">Proxies</a><a href="#">Pricing</a><a href="#">Locations</a><a href="#">Use Cases</a><a href="#">API</a>
            </nav>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 text-sm font-semibold">Login</button>
            <button className="px-6 py-2.5 bg-black text-white rounded-full text-sm font-bold hover:bg-blue-600 transition">Get Started</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-[1280px] mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-5">● LIVE • 2.4M IPs • 99.9% Uptime</div>
          <h1 className="text-[56px] font-black leading-[0.9] tracking-[-0.03em]">Premium Proxies<br/>That <span className="text-blue-600">Never Fail.</span></h1>
          <p className="text-[17px] text-slate-500 mt-6 leading-relaxed max-w-[520px]">Residential, datacenter, mobile and ISP proxies. Unlimited threads, city-level targeting, <b className="text-slate-900">99.9% success rate.</b></p>
          <div className="flex gap-3 mt-8">
            <button className="bg-black text-white px-7 py-3.5 rounded-full font-bold text-sm">Start Free Trial →</button>
            <button className="bg-slate-100 px-7 py-3.5 rounded-full font-bold text-sm">View Pricing</button>
          </div>
          <div className="flex gap-6 mt-8 text-sm">
            <span className="flex gap-2">⭐ <b>4.9/5</b> on Trustpilot</span>
            <span className="flex gap-2">✓ <b>No logs</b> • GDPR</span>
          </div>
        </div>
        <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600 blur-[80px] opacity-50"></div>
          <div className="relative">
            <div className="flex justify-between mb-6"><span className="text-slate-400 text-xs font-bold tracking-widest">LIVE DASHBOARD</span><span className="text-emerald-400 text-xs">● Connected</span></div>
            <div className="space-y-3 font-mono text-[12px]">
              <div className="bg-white/10 p-3 rounded-xl">curl -x proxy.proxyhub.io:8080 -U user:pass https://ipinfo.io</div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-emerald-300">✓ 200 OK • 23ms • US • Residential</div>
              <div className="grid grid-cols-3 gap-3 mt-6">
                <div className="bg-white/5 p-4 rounded-2xl"><div className="text-2xl font-black">2.4M</div><div className="text-[10px] text-slate-400 uppercase">IPs Pool</div></div>
                <div className="bg-white/5 p-4 rounded-2xl"><div className="text-2xl font-black">195</div><div className="text-[10px] text-slate-400 uppercase">Locations</div></div>
                <div className="bg-white/5 p-4 rounded-2xl"><div className="text-2xl font-black">10 Gbps</div><div className="text-[10px] text-slate-400 uppercase">Speed</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOGOS */}
      <div className="border-y border-slate-100 py-6">
        <div className="max-w-[1280px] mx-auto px-6 flex justify-between items-center opacity-40 text-xs font-black tracking-widest">TRUSTED BY: NIKE • ADIDAS • SEPHORA • SHOPIFY • SNEAKER • DATA TEAMS</div>
      </div>

      {/* PROXY TYPES - YOUR MAIN CARDS */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <h2 className="text-[36px] font-black tracking-tight">Choose Your Proxy Type</h2>
        <p className="text-slate-500 mt-2">All plans include unlimited threads, API access & 24/7 support</p>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            {t:'RESIDENTIAL', n:'Residential Proxies', p:'$5.5', d:'Real user IPs from ISPs', f:['195+ locations','City targeting','Auto-rotate']},
            {t:'DATACENTER', n:'Datacenter Proxies', p:'$1.2', d:'Fastest for high-volume', f:['Shared / Private','10 Gbps','99.9% uptime']},
            {t:'MOBILE', n:'Mobile 4G/5G', p:'$12', d:'Real mobile carrier IPs', f:['AT&T, T-Mobile','Unlimited rotation','Highest trust']},
            {t:'ISP STATIC', n:'ISP Proxies', p:'$2.8', d:'Static residential forever', f:['Never expires','No rotation','Whitelist']},
            {t:'ROTATING', n:'Rotating Proxies', p:'$4', d:'Every request new IP', f:['Per-request rot.','Sticky up to 30m','Backconnect']},
            {t:'SNEAKER', n:'Sneaker Proxies', p:'$6', d:'Built for drops', f:['Bypass Akamai','Low latency','24h replacement']},
          ].map(card => (
            <div key={card.n} className="group border border-slate-200 rounded-[24px] p-7 hover:border-black hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all bg-white">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black tracking-widest px-3 py-1 bg-slate-900 text-white rounded-full">{card.t}</span>
                <span className="text-[12px] font-bold text-emerald-600">● In Stock</span>
              </div>
              <h3 className="font-bold text-[20px]">{card.n}</h3>
              <p className="text-sm text-slate-500 mt-1">{card.d}</p>
              <div className="flex items-baseline gap-1 mt-5">
                <span className="text-[32px] font-black">{card.p}</span><span className="text-slate-500 text-sm">/GB</span>
              </div>
              <ul className="mt-5 space-y-2.5">
                {card.f.map(x => <li key={x} className="text-[13px] flex gap-2"><span className="text-emerald-600">✓</span> {x}</li>)}
              </ul>
              <button className="w-full mt-7 bg-black text-white py-3.5 rounded-full font-bold text-sm group-hover:bg-blue-600 transition">Buy Now →</button>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-slate-50 border-y border-slate-100 py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="bg-white rounded-[24px] p-8 border border-slate-200"><h4 className="font-bold text-lg">⚡ 0.3s Avg Response</h4><p className="text-sm text-slate-500 mt-2">Lowest latency on market with direct ISP peerings.</p></div>
            <div className="bg-white rounded-[24px] p-8 border border-slate-200"><h4 className="font-bold text-lg">🌍 195 Countries + City</h4><p className="text-sm text-slate-500 mt-2">Target any country, state, city or ASN level.</p></div>
            <div className="bg-white rounded-[24px] p-8 border border-slate-200"><h4 className="font-bold text-lg">🛡️ Never Get Blocked</h4><p className="text-sm text-slate-500 mt-2">Advanced rotation & fingerprint bypass tech.</p></div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <h2 className="text-[32px] font-black">Built for Every Use Case</h2>
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          {['Web Scraping','Price Monitoring','Sneaker Copping','SEO Monitoring','Ad Verification','Social Media','Ticketing','Crypto'].map(u => (
            <div key={u} className="border border-slate-200 rounded-2xl p-5 font-semibold text-sm hover:bg-black hover:text-white transition">{u}</div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black rounded-[40px] max-w-[1280px] mx-auto mx-6 lg:mx-auto p-12 lg:p-16 text-center mb-10">
        <h2 className="text-white text-[40px] font-black leading-none">Ready to scale<br/>your operations?</h2>
        <p className="text-slate-400 mt-4">Start with $1 trial • No credit card • Cancel anytime</p>
        <button className="bg-white text-black px-8 py-4 rounded-full font-black mt-8">Get 1GB for $1 →</button>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 py-10 text-center text-xs text-slate-400">
        © 2026 ProxyHub • 99.9% Uptime SLA • support@proxyhub.io
      </footer>
    </div>
  );
}