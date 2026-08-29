import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://dbhakwcpjitfpxitejhk.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_I5g-y5a85D8RrfNKhTx5tg_erWt0DWA";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const WHATSAPP_NUMBER = "233594682085";
const PAYSTACK_PUBLIC_KEY = "pk_test_5f501031e23522ce04d75524a9a35f1a69d11445";

const PROXIES = [
  // 1. LOKI PROXY - From your black screenshot (GHC)
  { id: "loki", name: "LokiProxy", type: "ip", rating: "4.9 • 24", tag: "🔥 BEST SELLER", letter: "L", color: "bg-green-500", 
    plans: [
      {label:"25 IPs", ghs:60, ngn:6000},
      {label:"50 IPs", ghs:100, ngn:10000},
      {label:"100 IPs", ghs:140, ngn:14000},
      {label:"200 IPs", ghs:260, ngn:26000},
      {label:"400 IPs", ghs:400, ngn:40000},
      {label:"500 IPs", ghs:500, ngn:50000},
      {label:"1500 IPs", ghs:940, ngn:94000},
      {label:"3000 IPs", ghs:1350, ngn:135000},
    ]},
  
  // 2. 711 PROXY IPs - From your July 1 screenshot (GHC)
  { id: "711-ip", name: "711Proxy IPs", type: "ip", rating: "4.9 • 44", tag: "⚡ FAST", letter: "7", color: "bg-white", 
    plans: [
      {label:"25 IPs", ghs:40, ngn:4000},
      {label:"50 IPs", ghs:75, ngn:7500},
      {label:"100 IPs", ghs:140, ngn:14000},
      {label:"200 IPs", ghs:250, ngn:25000},
      {label:"300 IPs", ghs:380, ngn:38000},
      {label:"400 IPs", ghs:450, ngn:45000},
      {label:"500 IPs", ghs:500, ngn:50000},
      {label:"2000 IPs", ghs:1000, ngn:100000},
    ]},

  // 3. 711 PROXY GB - From your screenshot (GHC)
  { id: "711-gb", name: "711Proxy GB", type: "gb", rating: "5.0 • 8", tag: "🔥 HOT", letter: "7", color: "bg-white", 
    plans: [
      {label:"2GB", ghs:50, ngn:5000},
      {label:"5GB", ghs:80, ngn:8000},
      {label:"10GB", ghs:150, ngn:15000},
      {label:"15GB", ghs:220, ngn:22000},
      {label:"20GB", ghs:290, ngn:29000},
      {label:"25GB", ghs:350, ngn:35000},
      {label:"30GB", ghs:410, ngn:41000},
      {label:"40GB", ghs:500, ngn:50000},
      {label:"100GB", ghs:1000, ngn:100000},
      {label:"250GB", ghs:1800, ngn:180000},
    ]},

  // 4. 9PROXY IPs - From your GHC screenshot
  { id: "9proxy-ip", name: "9Proxy IPs", type: "ip", rating: "4.9 • 122", tag: "💰 CHEAPEST", letter: "9", color: "bg-yellow-400", 
    plans: [
      {label:"50 IPs", ghs:100, ngn:10000},
      {label:"100 IPs", ghs:170, ngn:17000},
      {label:"200 IPs", ghs:340, ngn:34000},
      {label:"300 IPs", ghs:480, ngn:48000},
      {label:"400 IPs", ghs:570, ngn:57000},
      {label:"500 IPs", ghs:650, ngn:65000},
      {label:"800 IPs", ghs:850, ngn:85000},
      {label:"1000 IPs", ghs:1050, ngn:105000},
      {label:"1200 IPs", ghs:1150, ngn:115000},
      {label:"1600 IPs", ghs:1350, ngn:135000},
    ]},

  // 5. 9PROXY GB - From your NGN screenshot (10k-100k)
  { id: "9proxy-gb", name: "9Proxy GB", type: "gb", rating: "4.9 • 51", tag: "⭐ POPULAR", letter: "9", color: "bg-yellow-400", 
    plans: [
      {label:"2GB", ghs:100, ngn:10000},
      {label:"5GB", ghs:150, ngn:15000},
      {label:"10GB", ghs:300, ngn:30000},
      {label:"15GB", ghs:430, ngn:43000},
      {label:"20GB", ghs:550, ngn:55000},
      {label:"25GB", ghs:650, ngn:65000},
      {label:"30GB", ghs:750, ngn:75000},
      {label:"35GB", ghs:800, ngn:80000},
      {label:"50GB", ghs:1000, ngn:100000},
    ]},

  // 6. NOV PROXY - From your Nov list (NGN)
  { id: "nov", name: "NovProxy", type: "ip", rating: "5.0 • 27", tag: "⚡ $0.42", letter: "N", color: "bg-purple-600", 
    plans: [
      {label:"25 IPs", ghs:60, ngn:6000},
      {label:"50 IPs", ghs:100, ngn:10000},
      {label:"100 IPs", ghs:130, ngn:13000},
      {label:"200 IPs", ghs:210, ngn:21000},
      {label:"300 IPs", ghs:320, ngn:32000},
      {label:"400 IPs", ghs:410, ngn:41000},
      {label:"500 IPs", ghs:500, ngn:50000},
      {label:"1000 IPs", ghs:650, ngn:65000},
    ]},
];

const FAKE_PURCHASES = [
  { name: "Kwame from Accra", item: "LokiProxy 50 IPs", time: "2 mins ago" },
  { name: "Chinedu from Lagos", item: "711Proxy 100 IPs", time: "5 mins ago" },
  { name: "Ama from Kumasi", item: "711Proxy GB 5GB", time: "7 mins ago" },
  { name: "Tunde from Abuja", item: "LokiProxy 25 IPs", time: "11 mins ago" },
  { name: "Kofi from Tema", item: "PyProxy 100 IPs", time: "15 mins ago" },
  { name: "Emeka from Port Harcourt", item: "Proxy-Cheap 15GB", time: "19 mins ago" },
];

export default function App(){
  const [currency,setCurrency]=useState("GHS");
  const [reviews,setReviews]=useState([]);
  const [email,setEmail]=useState("");
  const [filter,setFilter]=useState("all");
  const [search,setSearch]=useState("");
  const [newReview,setNewReview]=useState({name:"", loc:"", text:""});
  const [recent,setRecent]=useState(null);
  const [showRecent,setShowRecent]=useState(false);

  useEffect(()=>{
    supabase.from("reviews").select("*").order("created_at",{ascending:false}).then(({data})=>{ if(data) setReviews(data) });
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if(tz.includes("Lagos")) setCurrency("NGN");
  },[]);

  // RECENT PURCHASE POPUP LOGIC - LEFT SIDE
  useEffect(()=>{
    const showPopup = () => {
      const random = FAKE_PURCHASES[Math.floor(Math.random()*FAKE_PURCHASES.length)];
      setRecent(random);
      setShowRecent(true);
      setTimeout(()=> setShowRecent(false), 4000);
    };
    showPopup();
    const interval = setInterval(showPopup, 8000);
    return ()=> clearInterval(interval);
  },[]);

  const payWithPaystack = (proxy, plan) => {
    if(!email ||!email.includes("@")) return alert("Please enter your email at top first!");
    const amount = currency==="GHS"? plan.ghs * 100 : plan.ngn * 100;
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: amount,
      currency: currency,
      ref: `PX_${Date.now()}`,
      callback: function(response){
        alert(`✅ Payment Successful! Ref: ${response.reference}`);
        const msg = `NEW PAID ORDER! ✅\nProxy: ${proxy.name} - ${plan.label}\nPrice: ${currency} ${currency==="GHS"?plan.ghs:plan.ngn}\nEmail: ${email}\nPaystack Ref: ${response.reference}`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank");
      },
      onClose: function(){}
    });
    handler.openIframe();
  };

  const addReview = async () => {
    if(!newReview.name ||!newReview.text) return alert("Fill name and review");
    await supabase.from("reviews").insert([{name:newReview.name, loc:newReview.loc, text:newReview.text}]);
    setNewReview({name:"", loc:"", text:""});
    const {data}=await supabase.from("reviews").select("*").order("created_at",{ascending:false}); if(data) setReviews(data);
  };

  const filtered = PROXIES.filter(p=> {
    const matchType = filter==="all"? true : p.type===filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return(
    <div className="min-h-screen bg-[#0a0f1e] text-white font-sans relative">
      <div className="bg-cyan-400 text-black text-center text-xs font-bold py-2 px-2">🔥 Paystack Enabled! MoMo, Card, Bank - Instant Delivery</div>

      <header className="max-w-7xl mx-auto p-4 md:p-6 flex justify-between items-center">
        <h1 className="text-2xl font-black tracking-tight">PROXY GET<span className="text-cyan-400">.</span></h1>
        <div className="flex gap-2 items-center">
          <div className="relative hidden md:block mr-2">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search proxy..." className="bg-[#151c2e] border border-white/10 rounded-full px-4 py-1.5 text-sm w-48 outline-none" />
          </div>
          <button onClick={()=>setCurrency("GHS")} className={`px-4 py-1.5 rounded-full text-sm font-bold border ${currency==="GHS"?"bg-white text-black":"border-white/20"}`}>GHS</button>
          <button onClick={()=>setCurrency("NGN")} className={`px-4 py-1.5 rounded-full text-sm font-bold border ${currency==="NGN"?"bg-white text-black":"border-white/20"}`}>NGN</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="md:hidden mb-4">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search proxies (e.g. Loki, 711...)" className="w-full bg-[#151c2e] border border-white/10 rounded-xl px-4 py-3 text-sm outline-none" />
        </div>

        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/20 rounded-2xl p-4 md:p-6 mb-6">
          <h2 className="text-2xl md:text-3xl font-black mb-2">Cheapest Proxies in Ghana & Nigeria 🇬🇭🇳🇬</h2>
          <p className="text-sm text-white/70 mb-4">Residential, ISP, Mobile - Pay with MoMo & Get Instant Delivery</p>
          <div className="bg-[#0a0f1e] rounded-xl p-2 flex gap-2 max-w-lg">
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter email for receipt & delivery" className="flex-1 bg-transparent px-3 py-2 text-sm outline-none" />
          </div>
          <div className="flex gap-2 mt-4 text-[11px]">
            <button onClick={()=>setFilter("all")} className={`px-4 py-2 rounded-full border font-bold ${filter==="all"?"bg-white text-black":"border-white/20 text-white/60"}`}>All Proxies</button>
            <button onClick={()=>setFilter("ip")} className={`px-4 py-2 rounded-full border font-bold ${filter==="ip"?"bg-white text-black":"border-white/20 text-white/60"}`}>IP Based</button>
            <button onClick={()=>setFilter("gb")} className={`px-4 py-2 rounded-full border font-bold ${filter==="gb"?"bg-white text-black":"border-white/20 text-white/60"}`}>GB Based</button>
          </div>
        </div>

        <div className="grid gap-4 mb-10">
          {filtered.map(proxy=>(
            <div key={proxy.id} className="bg-[#151c2e] rounded-2xl p-4 border border-white/5 relative">
              {proxy.tag && <div className="absolute top-3 right-3 bg-white text-black text-[9px] px-2.5 py-1 rounded-full font-black">{proxy.tag}</div>}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl ${proxy.color} ${proxy.color.includes('white')?'text-black':'text-white'} flex items-center justify-center font-black text-lg`}>{proxy.letter}</div>
                <div><h2 className="font-bold">{proxy.name} — {proxy.rating} ★</h2><p className="text-[11px] text-white/50">Instant Delivery • Paystack Secured</p></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {proxy.plans.map((plan,i)=><button key={i} onClick={()=>payWithPaystack(proxy,plan)} className="bg-white text-black hover:bg-cyan-400 rounded-xl py-3.5 text-center transition font-bold"><div className="text-sm">{plan.label}</div><div className="text-xs opacity-70">{currency} {currency==="GHS"?plan.ghs:plan.ngn}</div><div className="text-[10px] mt-1">Pay Now</div></button>)}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#151c2e] rounded-2xl p-6 mb-10 border border-white/5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-black">⭐ What Customers Say</h3>
            <span className="text-xs bg-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full font-bold">{reviews.length} Reviews • 4.9/5</span>
          </div>
          <div className="grid md:grid-cols-3 gap-3 mb-6">
            {reviews.map((r,i)=><div key={i} className="bg-[#0a0f1e] rounded-xl p-4 border border-white/5"><div className="flex gap-1 text-yellow-400 text-xs mb-2">★★★★★</div><p className="text-sm text-white/80 mb-3">"{r.text}"</p><div className="flex items-center gap-2"><div className="w-7 h-7 rounded-full bg-cyan-400 text-black flex items-center justify-center font-black text-xs">{r.name?.[0]}</div><div><div className="text-xs font-bold">{r.name}</div><div className="text-[10px] text-white/40">{r.loc} • Verified Buyer</div></div></div></div>)}
          </div>
          <div className="bg-black/30 rounded-xl p-4 border border-white/10">
            <h4 className="text-sm font-bold mb-3">Leave a Review</h4>
            <div className="grid md:grid-cols-3 gap-2 mb-2">
              <input value={newReview.name} onChange={e=>setNewReview({...newReview,name:e.target.value})} placeholder="Your name" className="bg-[#0a0f1e] border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none" />
              <input value={newReview.loc} onChange={e=>setNewReview({...newReview,loc:e.target.value})} placeholder="Location" className="bg-[#0a0f1e] border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none" />
              <input value={newReview.text} onChange={e=>setNewReview({...newReview,text:e.target.value})} placeholder="Your experience..." className="bg-[#0a0f1e] border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none" />
            </div>
            <button onClick={addReview} className="w-full md:w-auto bg-cyan-400 hover:bg-cyan-300 text-black font-black px-6 py-2.5 rounded-lg text-sm mt-2">Submit Review ⭐</button>
          </div>
        </div>

        <div className="text-center text-[11px] text-white/30 py-8 border-t border-white/5">© 2026 Proxy Get • Paystack Secured • WhatsApp: +233 59 468 2085</div>
      </div>

      {/* LEFT SIDE RECENT PURCHASE POPUP - RESTORED */}
      <div className={`fixed bottom-5 left-5 z-50 transition-all duration-500 ${showRecent? 'translate-x-0 opacity-100' : '-translate-x-[150%] opacity-0'}`}>
        <div className="bg-white text-black rounded-xl shadow-2xl px-4 py-3 flex gap-3 items-center max-w-[320px] border border-black/10">
          <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-black text-sm">✓</div>
          <div>
            <div className="text-xs font-black">{recent?.name} purchased</div>
            <div className="text-xs text-black/70">{recent?.item}</div>
            <div className="text-[10px] text-black/40">{recent?.time} • Verified ✓</div>
          </div>
          <button onClick={()=>setShowRecent(false)} className="ml-2 text-black/20 hover:text-black">✕</button>
        </div>
      </div>

      {/* WHATSAPP FLOATING BUTTON */}
      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Proxy%20Get!%20I%20need%20help`} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 bg-[#25D366] hover:bg-[#128C7E] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl text-2xl z-50 transition">
        💬
      </a>
    </div>
  );
}