import { useState, useEffect } from 'react';

const WHATSAPP = "233594682085";
const waLink = (msg) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

const PRODUCTS = [
  { id:'9proxy-ips', name:'9Proxy — Residential SOCKS5 IPs', rating:'4.9 • 122', badge:'BEST SELLER', from:'From $0.80', type:'IPs', letter:'9', color:'bg-blue-500', list:[
    {label:'50 IPs', price:'GHC 100'},{label:'100 IPs', price:'GHC 170'},{label:'200 IPs', price:'GHC 340'},{label:'300 IPs', price:'GHC 480'},{label:'400 IPs', price:'GHC 570'},{label:'500 IPs', price:'GHC 650'},{label:'800 IPs', price:'GHC 850'},{label:'1000 IPs', price:'GHC 1050'},{label:'1200 IPs', price:'GHC 1150'},{label:'1600 IPs', price:'GHC 1350'},
  ]},
  { id:'9proxy-gb', name:'9Proxy GB', rating:'4.9 • 51', badge:'FLEXIBLE', from:'From $1.15', type:'GB', letter:'9', color:'bg-blue-600', list:[
    {label:'2GB', price:'10k'},{label:'5GB', price:'15k'},{label:'10GB', price:'30k'},{label:'15GB', price:'43k'},{label:'20GB', price:'55k'},{label:'25GB', price:'65k'},{label:'30GB', price:'75k'},{label:'35GB', price:'80k'},{label:'50GB', price:'100k'},
  ]},
  { id:'711-ips', name:'711Proxy', rating:'4.9 • 44', badge:'CHEAPEST', from:'From $0.65', type:'IPs', letter:'7', color:'bg-white text-black', list:[
    {label:'25 IPs', price:'40gh'},{label:'50 IPs', price:'75gh'},{label:'100 IPs', price:'140gh'},{label:'200 IPs', price:'250gh'},{label:'300 IPs', price:'380gh'},{label:'400 IPs', price:'450gh'},{label:'500 IPs', price:'500gh'},{label:'2000 IPs', price:'1000gh'},
  ]},
  { id:'711-gb', name:'711Proxy GB', rating:'5.0 • 8', badge:'HOT DEAL', from:'From $1.13', type:'GB', letter:'7', color:'bg-white text-black', list:[
    {label:'2GB', price:'GHC 50'},{label:'5GB', price:'GHC 80'},{label:'10GB', price:'GHC 150'},{label:'15GB', price:'GHC 220'},{label:'20GB', price:'GHC 290'},{label:'25GB', price:'GHC 350'},{label:'30GB', price:'GHC 410'},{label:'40GB', price:'GHC 500'},{label:'100GB', price:'GHC 1000'},{label:'250GB', price:'GHC 1800'},
  ]},
  { id:'loki', name:'LokiProxy', rating:'4.9 • 24', badge:'PREMIUM', from:'From $0.60', type:'IPs', letter:'L', color:'bg-emerald-500', list:[
    {label:'25 IPs', price:'60gh'},{label:'50 IPs', price:'100gh'},{label:'100 IPs', price:'140gh'},{label:'200 IPs', price:'260gh'},{label:'400 IPs', price:'400gh'},{label:'500 IPs', price:'500gh'},{label:'1500 IPs', price:'940gh'},{label:'3000 IPs', price:'1350gh'},
  ]},
  { id:'nov', name:'NovProxy', rating:'5.0 • 27', badge:'NEW', from:'From $0.42', type:'IPs', letter:'N', color:'bg-violet-500', list:[
    {label:'25 IPs', price:'6k'},{label:'50 IPs', price:'10k'},{label:'100 IPs', price:'13k'},{label:'200 IPs', price:'21k'},{label:'300 IPs', price:'32k'},{label:'400 IPs', price:'41k'},{label:'500 IPs', price:'50k'},{label:'1000 IPs', price:'65k'},
  ]},
];

const DEFAULT_REVIEWS = [
  {name:'Kwame A.', loc:'Accra • 9Proxy 100 IPs', text:'Fast delivery on WhatsApp. IPs are clean for sneakers. Will buy again!', stars:5},
  {name:'Chidi O.', loc:'Lagos • 711Proxy GB 25GB', text:'711Proxy GB is very clean. No ban. Seller is legit. Recommended.', stars:5},
  {name:'Musa', loc:'Kumasi • LokiProxy 500 IPs', text:'Best store. Got replacement when 2 IPs died. 0594682085 is active!', stars:5},
  {name:'Sarah J.', loc:'Tema • 711Proxy 200 IPs', text:'Cheapest in Ghana. 200 IPs for 250gh is insane. Works for my work.', stars:5},
];

export default function App(){
  const [filter, setFilter] = useState('all');
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [newR, setNewR] = useState({name:'', loc:'', text:''});
  const [recent, setRecent] = useState(null);
  const [showPromo, setShowPromo] = useState(true);

  useEffect(()=>{
    const saved = localStorage.getItem('proxy_reviews_gh');
    if(saved) setReviews(JSON.parse(saved));
  },[]);

  // Live recent buyer popup
  useEffect(()=>{
    const names = ['Someone from Accra','Chidi from Lagos','Kwesi from Kumasi','Ama from Tema','Tunde from Abuja'];
    const items = ['711Proxy 25 IPs','9Proxy GB 10GB','LokiProxy 100 IPs','NovProxy 500 IPs','711Proxy GB 5GB'];
    const iv = setInterval(()=>{
      setRecent({who:names[Math.floor(Math.random()*names.length)], what:items[Math.floor(Math.random()*items.length)]});
      setTimeout(()=>setRecent(null), 4000);
    }, 8000);
    return()=>clearInterval(iv);
  },[]);

  const addReview = ()=>{
    if(!newR.name ||!newR.text) return alert('Fill name and review');
    const updated = [{...newR, stars:5, loc: newR.loc || 'Ghana'},...reviews];
    setReviews(updated);
    localStorage.setItem('proxy_reviews_gh', JSON.stringify(updated));
    setNewR({name:'', loc:'', text:''});
    setShowForm(false);
  };

  const filtered = filter==='all'? PRODUCTS : PRODUCTS.filter(p=>p.type===filter);

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {showPromo && <div className="bg-[#25D366] text-black text-center py-2 text-xs font-black flex justify-center gap-4 px-4">🔥 TODAY: Extra 10% Bonus on 500+ IPs • WhatsApp: 0594682085 <button onClick={()=>setShowPromo(false)} className="ml-4">✕</button></div>}

      <header className="sticky top-0 z-40 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 h-[64px] flex justify-between items-center">
          <div className="font-black flex items-center gap-2"><div className="w-8 h-8 bg-white text-black rounded-lg grid place-items-center">P</div> ProxyUniverse GH</div>
          <a href={waLink('Hi, I want to buy proxy')} className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-bold">WhatsApp: (+233) 0594682085</a>
        </div>
      </header>

      {/* CATALOG - like screenshot 2 */}
      <section className="max-w-[1280px] mx-auto px-6 pt-10">
        <div className="flex gap-2 mb-6">
          <button onClick={()=>setFilter('all')} className={`px-4 py-2 rounded-full text-xs font-bold border ${filter==='all'?'bg-white text-black':'bg-white/10 border-white/10'}`}>Catalog</button>
          <button onClick={()=>setFilter('IPs')} className={`px-4 py-2 rounded-full text-xs font-bold border ${filter==='IPs'?'bg-white text-black':'bg-white/10 border-white/10'}`}>IPs</button>
          <button onClick={()=>setFilter('GB')} className={`px-4 py-2 rounded-full text-xs font-bold border ${filter==='GB'?'bg-white text-black':'bg-white/10 border-white/10'}`}>GB</button>
          <span className="ml-auto text-xs text-white/40">⭐ 4.9/5 • 60k+ customers</span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p=>(
            <div key={p.id} className="bg-[#15151E] border border-white/10 rounded-[20px] p-5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${p.color} grid place-items-center font-black`}>{p.letter}</div>
                <div className="flex-1"><div className="font-bold text-sm leading-tight">{p.name}</div><div className="text-[11px] text-yellow-400">⭐ {p.rating}</div></div>
                <div className="text-right"><div className="text-[10px] bg-white text-black px-2 py-1 rounded-full font-black">{p.badge}</div><div className="text-[11px] text-white/40 mt-1">{p.from}</div></div>
              </div>
              <div className="mt-4 bg-[#0A0A0F] rounded-xl divide-y divide-white/5 border border-white/5">
                {p.list.map(i=>(
                  <div key={i.label} className="flex justify-between items-center px-3 py-2.5 text-[13px]">
                    <span>{i.label}</span>
                    <span className="flex items-center gap-2"><b>{i.price}</b><a href={waLink(`Hello, I want ${p.name} - ${i.label} for ${i.price}`)} className="bg-white text-black px-3 py-1 rounded-full text-[11px] font-black">Buy</a></span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE REVIEWS + RATINGS - RESTORED */}
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-6">
          <div>
            <h2 className="text-[28px] font-black">Live Customer Reviews</h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-yellow-400 text-sm">★★★★★</div>
              <span className="text-sm font-bold">4.9/5</span>
              <span className="text-xs text-white/50">• {reviews.length} verified purchases • updates live</span>
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            </div>
          </div>
          <button onClick={()=>setShowForm(!showForm)} className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-bold">+ Add Review</button>
        </div>

        {showForm && (
          <div className="bg-[#15151E] border border-[#25D366]/30 rounded-2xl p-5 mb-6 max-w-xl">
            <h3 className="font-bold text-sm mb-3">Add your review (shows instantly)</h3>
            <input value={newR.name} onChange={e=>setNewR({...newR, name:e.target.value})} placeholder="Your Name" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm mb-2 outline-none"/>
            <input value={newR.loc} onChange={e=>setNewR({...newR, loc:e.target.value})} placeholder="Location + Product (e.g Accra - 711Proxy 50 IPs)" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm mb-2 outline-none"/>
            <textarea value={newR.text} onChange={e=>setNewR({...newR, text:e.target.value})} placeholder="Your experience..." className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm h-20 outline-none mb-3"></textarea>
            <button onClick={addReview} className="w-full bg-[#25D366] text-black py-3 rounded-full font-black text-sm">Post Review ★★★★★</button>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {reviews.map((r,i)=>(
            <div key={i} className="bg-[#15151E] border border-white/10 rounded-2xl p-4">
              <div className="flex text-yellow-400 text-xs">★★★★★</div>
              <p className="text-[13px] leading-relaxed mt-2">"{r.text}"</p>
              <p className="text-[11px] text-white/40 mt-3">— {r.name}, {r.loc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center">
        <div className="text-sm font-bold">WhatsApp Contact: (+233) 0594682085</div>
        <div className="text-xs text-white/30 mt-2">Instant delivery • 24/7 • Ghana & Nigeria</div>
      </footer>

      {/* FLOATING WHATSAPP + RECENT BUYER */}
      <a href={waLink('Hi, I want to buy proxies')} className="fixed bottom-5 right-5 w-14 h-14 bg-[#25D366] rounded-full grid place-items-center text-2xl shadow-xl">💬</a>
      {recent && <div className="fixed bottom-24 left-4 bg-white text-black rounded-2xl px-4 py-3 text-xs shadow-2xl animate-bounce"><b>{recent.who}</b> bought<br/>{recent.what} <span className="text-[10px] opacity-60">2 mins ago • verified</span></div>}
    </div>
  )
}