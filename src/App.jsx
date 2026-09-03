import React, { useState, useMemo, useEffect } from 'react';

const WHATSAPP_NUMBER = "233594682085";
const PAYSTACK_PUBLIC_KEY = "pk_test_5f501031e23522ce04d75524a9a35f1a69d11445";
const NGN_TO_GHS_RATE = 95;

const ALL_PRODUCTS = [
  // 711Proxy GB - GHC - from screenshot 2
  { id: "711gb-2", cat: "711Proxy GB", name: "711Proxy GB - 2GB", price: 50, currency: "GHS", popular: false },
  { id: "711gb-5", cat: "711Proxy GB", name: "711Proxy GB - 5GB", price: 80, currency: "GHS", popular: false },
  { id: "711gb-10", cat: "711Proxy GB", name: "711Proxy GB - 10GB", price: 150, currency: "GHS", popular: true },
  { id: "711gb-15", cat: "711Proxy GB", name: "711Proxy GB - 15GB", price: 220, currency: "GHS", popular: false },
  { id: "711gb-20", cat: "711Proxy GB", name: "711Proxy GB - 20GB", price: 290, currency: "GHS", popular: true },
  { id: "711gb-25", cat: "711Proxy GB", name: "711Proxy GB - 25GB", price: 350, currency: "GHS", popular: false },
  { id: "711gb-30", cat: "711Proxy GB", name: "711Proxy GB - 30GB", price: 410, currency: "GHS", popular: false },
  { id: "711gb-40", cat: "711Proxy GB", name: "711Proxy GB - 40GB", price: 500, currency: "GHS", popular: true },
  { id: "711gb-100", cat: "711Proxy GB", name: "711Proxy GB - 100GB", price: 1000, currency: "GHS", popular: true },
  { id: "711gb-250", cat: "711Proxy GB", name: "711Proxy GB - 250GB", price: 1800, currency: "GHS", popular: true },

  // 711Proxy IPs - GHC - from screenshot 5
  { id: "711ip-25", cat: "711Proxy", name: "711Proxy - 25 IPs", price: 40, currency: "GHS", popular: false },
  { id: "711ip-50", cat: "711Proxy", name: "711Proxy - 50 IPs", price: 75, currency: "GHS", popular: false },
  { id: "711ip-100", cat: "711Proxy", name: "711Proxy - 100 IPs", price: 140, currency: "GHS", popular: true },
  { id: "711ip-200", cat: "711Proxy", name: "711Proxy - 200 IPs", price: 250, currency: "GHS", popular: false },
  { id: "711ip-300", cat: "711Proxy", name: "711Proxy - 300 IPs", price: 380, currency: "GHS", popular: false },
  { id: "711ip-400", cat: "711Proxy", name: "711Proxy - 400 IPs", price: 450, currency: "GHS", popular: false },
  { id: "711ip-500", cat: "711Proxy", name: "711Proxy - 500 IPs", price: 500, currency: "GHS", popular: true },
  { id: "711ip-2000", cat: "711Proxy", name: "711Proxy - 2000 IPs", price: 1000, currency: "GHS", popular: true },

  // 9Proxy IPs - GHC - from screenshot 6 + 5 IPs new
  { id: "9ip-5", cat: "9Proxy", name: "9Proxy - 5 IPs", price: 15, currency: "GHS", popular: false },
  { id: "9ip-50", cat: "9Proxy", name: "9Proxy - 50 IPs", price: 100, currency: "GHS", popular: false },
  { id: "9ip-100", cat: "9Proxy", name: "9Proxy - 100 IPs", price: 170, currency: "GHS", popular: false },
  { id: "9ip-200", cat: "9Proxy", name: "9Proxy - 200 IPs", price: 340, currency: "GHS", popular: true },
  { id: "9ip-300", cat: "9Proxy", name: "9Proxy - 300 IPs", price: 480, currency: "GHS", popular: false },
  { id: "9ip-400", cat: "9Proxy", name: "9Proxy - 400 IPs", price: 570, currency: "GHS", popular: false },
  { id: "9ip-500", cat: "9Proxy", name: "9Proxy - 500 IPs", price: 650, currency: "GHS", popular: true },
  { id: "9ip-800", cat: "9Proxy", name: "9Proxy - 800 IPs", price: 850, currency: "GHS", popular: false },
  { id: "9ip-1000", cat: "9Proxy", name: "9Proxy - 1000 IPs", price: 1050, currency: "GHS", popular: true },
  { id: "9ip-1200", cat: "9Proxy", name: "9Proxy - 1200 IPs", price: 1150, currency: "GHS", popular: false },
  { id: "9ip-1600", cat: "9Proxy", name: "9Proxy - 1600 IPs", price: 1350, currency: "GHS", popular: true },

  // LokiProxy - GHC - from screenshot 3
  { id: "loki-25", cat: "LokiProxy", name: "LokiProxy - 25 IPs", price: 60, currency: "GHS", popular: false },
  { id: "loki-50", cat: "LokiProxy", name: "LokiProxy - 50 IPs", price: 100, currency: "GHS", popular: false },
  { id: "loki-100", cat: "LokiProxy", name: "LokiProxy - 100 IPs", price: 140, currency: "GHS", popular: true },
  { id: "loki-200", cat: "LokiProxy", name: "LokiProxy - 200 IPs", price: 260, currency: "GHS", popular: false },
  { id: "loki-400", cat: "LokiProxy", name: "LokiProxy - 400 IPs", price: 400, currency: "GHS", popular: false },
  { id: "loki-500", cat: "LokiProxy", name: "LokiProxy - 500 IPs", price: 500, currency: "GHS", popular: true },
  { id: "loki-1500", cat: "LokiProxy", name: "LokiProxy - 1500 IPs", price: 940, currency: "GHS", popular: false },
  { id: "loki-3000", cat: "LokiProxy", name: "LokiProxy - 3000 IPs", price: 1350, currency: "GHS", popular: true },

  // NovProxy - NGN - from screenshot 1
  { id: "nov-25", cat: "NovProxy", name: "NovProxy - 25 IPs", price: 6000, currency: "NGN", popular: false },
  { id: "nov-50", cat: "NovProxy", name: "NovProxy - 50 IPs", price: 10000, currency: "NGN", popular: false },
  { id: "nov-100", cat: "NovProxy", name: "NovProxy - 100 IPs", price: 13000, currency: "NGN", popular: true },
  { id: "nov-200", cat: "NovProxy", name: "NovProxy - 200 IPs", price: 21000, currency: "NGN", popular: false },
  { id: "nov-300", cat: "NovProxy", name: "NovProxy - 300 IPs", price: 32000, currency: "NGN", popular: false },
  { id: "nov-400", cat: "NovProxy", name: "NovProxy - 400 IPs", price: 41000, currency: "NGN", popular: false },
  { id: "nov-500", cat: "NovProxy", name: "NovProxy - 500 IPs", price: 50000, currency: "NGN", popular: true },
  { id: "nov-1000", cat: "NovProxy", name: "NovProxy - 1000 IPs", price: 65000, currency: "NGN", popular: true },

  // 9Proxy GB - NGN - from screenshot 4 + 1GB new
  { id: "9gb-1", cat: "9Proxy GB", name: "9Proxy GB - 1GB", price: 5000, currency: "NGN", popular: false },
  { id: "9gb-2", cat: "9Proxy GB", name: "9Proxy GB - 2GB", price: 10000, currency: "NGN", popular: false },
  { id: "9gb-5", cat: "9Proxy GB", name: "9Proxy GB - 5GB", price: 15000, currency: "NGN", popular: false },
  { id: "9gb-10", cat: "9Proxy GB", name: "9Proxy GB - 10GB", price: 30000, currency: "NGN", popular: true },
  { id: "9gb-15", cat: "9Proxy GB", name: "9Proxy GB - 15GB", price: 43000, currency: "NGN", popular: false },
  { id: "9gb-20", cat: "9Proxy GB", name: "9Proxy GB - 20GB", price: 55000, currency: "NGN", popular: true },
  { id: "9gb-25", cat: "9Proxy GB", name: "9Proxy GB - 25GB", price: 65000, currency: "NGN", popular: false },
  { id: "9gb-30", cat: "9Proxy GB", name: "9Proxy GB - 30GB", price: 75000, currency: "NGN", popular: false },
  { id: "9gb-35", cat: "9Proxy GB", name: "9Proxy GB - 35GB", price: 80000, currency: "NGN", popular: false },
  { id: "9gb-50", cat: "9Proxy GB", name: "9Proxy GB - 50GB", price: 100000, currency: "NGN", popular: true },

  // Swift Proxy - from proxyuniverse screenshot
  { id: "swift-25", cat: "Swift Proxy", name: "Swift Proxy - 25 IPs", price: 60, currency: "GHS", popular: false },
  { id: "swift-50", cat: "Swift Proxy", name: "Swift Proxy - 50 IPs", price: 110, currency: "GHS", popular: false },
  { id: "swift-100", cat: "Swift Proxy", name: "Swift Proxy - 100 IPs", price: 160, currency: "GHS", popular: true },
  { id: "swift-200", cat: "Swift Proxy", name: "Swift Proxy - 200 IPs", price: 300, currency: "GHS", popular: false },
  { id: "swift-500", cat: "Swift Proxy", name: "Swift Proxy - 500 IPs", price: 550, currency: "GHS", popular: true },
  { id: "swift-1000", cat: "Swift Proxy", name: "Swift Proxy - 1000 IPs", price: 950, currency: "GHS", popular: true },

  // Vless VPN Premium - Free from screenshot
  { id: "vless-free", cat: "Vless VPN", name: "Vless VPN Premium - Free", price: 0, currency: "GHS", popular: true },
];

const CATEGORIES = ["All", "711Proxy GB", "711Proxy", "9Proxy", "LokiProxy", "NovProxy", "9Proxy GB", "Swift Proxy", "Vless VPN"];
const INITIAL_REVIEWS = [
  { name: "Kwame A.", location: "Accra", text: "Fast delivery! Got my 711Proxy 100GB in 3 mins on WhatsApp.", stars: 5, product: "711Proxy GB - 100GB" },
  { name: "David O.", location: "Lagos", text: "ProxyGet is legit. 9Proxy IPs working for my bot.", stars: 5, product: "9Proxy - 500 IPs" },
  { name: "Sarah M.", location: "Kumasi", text: "Support is 10/10. Helped me setup LokiProxy.", stars: 5, product: "LokiProxy - 100 IPs" },
  { name: "Chidi E.", location: "Abuja", text: "NovProxy 500 IPs very clean. Will buy again!", stars: 5, product: "NovProxy - 500 IPs" },
];
const LIVE_NAMES = ["Ama K.", "John D.", "Samuel T.", "Fatima L.", "Grace O.", "Yaw B.", "Chinedu", "Kwesi"];

function LivePurchasePopup(){
  const [item, setItem] = useState(null);
  useEffect(()=>{
    const show = ()=>{ const p = ALL_PRODUCTS[Math.floor(Math.random()*ALL_PRODUCTS.length)]; const n = LIVE_NAMES[Math.floor(Math.random()*LIVE_NAMES.length)]; setItem({...p, buyer: n, time: `${Math.floor(Math.random()*9)+1} min ago` }); setTimeout(()=>setItem(null), 4500); };
    const i = setInterval(show, 8000); setTimeout(show, 2500); return ()=>clearInterval(i);
  },[]);
  if(!item) return null;
  return (<div className="fixed bottom-6 left-6 z-[60] bg-[#1e1e1e] border border-white/10 rounded-2xl p-3 flex gap-3 items-center shadow-2xl max-w-[320px] animate-[slideIn_0.5s_ease]"><div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-black text-black">{item.buyer[0]}</div><div><div className="text-[11px] text-white/60">{item.buyer} purchased</div><div className="text-[13px] font-bold">{item.name}</div><div className="text-[10px] text-green-400">{item.time} • Verified ✅</div></div></div>);
}
function LiveReviewPopup({ reviews }){
  const [review, setReview] = useState(null);
  useEffect(()=>{ const show = ()=>{ const r = reviews[Math.floor(Math.random()*reviews.length)]; setReview(r); setTimeout(()=>setReview(null), 5000); }; const i = setInterval(show, 11000); setTimeout(show, 6000); return ()=>clearInterval(i); },[reviews]);
  if(!review) return null;
  return (<div className="fixed top-20 left-6 z-[60] bg-white text-black rounded-2xl p-3 flex gap-3 shadow-2xl max-w-[340px] animate-[slideIn_0.5s_ease]"><div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-black">{review.name[0]}</div><div><div className="flex gap-1 items-center"><span className="text-xs font-black">{review.name}</span><span className="text-[9px] bg-green-500 px-1.5 py-0.5 rounded-full font-bold">VERIFIED</span></div><div className="text-yellow-500 text-[11px]">{"★".repeat(review.stars)}</div><div className="text-xs mt-1">"{review.text}"</div></div></div>);
}

export default function App() {
  const [search, setSearch] = useState(""); const [currency, setCurrency] = useState("GHS"); const [activeCat, setActiveCat] = useState("All"); const [email, setEmail] = useState(""); const [reviews, setReviews] = useState(INITIAL_REVIEWS); const [showAdd, setShowAdd] = useState(false); const [newReview, setNewReview] = useState({ name:"", text:"", stars:5, product:"711Proxy GB - 10GB" });
  useEffect(() => { const s = document.createElement("script"); s.src = "https://js.paystack.co/v1/inline.js"; s.async=true; document.body.appendChild(s); const saved = localStorage.getItem("proxyget_reviews"); if(saved) setReviews(JSON.parse(saved)); }, []);
  const saveReviews = (r) => { setReviews(r); localStorage.setItem("proxyget_reviews", JSON.stringify(r)); };
  const handleAddReview = () => { if(!newReview.name ||!newReview.text) { alert("Fill name and review"); return; } const r = { name: newReview.name, text: newReview.text, stars: newReview.stars, product: newReview.product, location: "Verified Buyer" }; saveReviews([r,...reviews]); setNewReview({ name:"", text:"", stars:5, product:"711Proxy GB - 10GB" }); setShowAdd(false); };
  const filtered = useMemo(() => ALL_PRODUCTS.filter(p => { const matchCat = activeCat === "All" || p.cat === activeCat; const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.cat.toLowerCase().includes(search.toLowerCase()); return matchCat && matchSearch; }), [search, activeCat]);
  const displayProducts = search.length > 1? filtered : filtered.filter(p=>p.popular).slice(0,8);
  const getPrice = (product) => { if(product.price===0) return "FREE"; if (product.currency === currency) return currency === "GHS"? `GHC ${product.price}` : `₦${product.price.toLocaleString()}`; if (currency === "GHS") return `GHC ${Math.ceil(product.price / NGN_TO_GHS_RATE)}`; return `₦${Math.ceil(product.price * NGN_TO_GHS_RATE).toLocaleString()}`; };
  const handlePay = (product) => { if(product.price===0){ window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi ProxyGet! I want Vless VPN Premium Free. My email: ${email}`)}`; return; } if (!email.includes("@")) { alert("Enter email first"); return; } const amountGHS = product.currency === "GHS"? product.price : Math.ceil(product.price / NGN_TO_GHS_RATE); if (!window.PaystackPop) { alert("Wait 2s"); return; } const handler = window.PaystackPop.setup({ key: PAYSTACK_PUBLIC_KEY, email, amount: amountGHS*100, currency: "GHS", ref: `ProxyGet_${Date.now()}`, callback: function(res){ window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi ProxyGet! Paid for ${product.name} ${getPrice(product)} Ref:${res.reference} Email:${email}`)}`; } }); handler.openIframe(); };
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <LivePurchasePopup /><LiveReviewPopup reviews={reviews} />
      <style>{`@keyframes slideIn { from{transform:translateX(-100%);opacity:0} to{transform:translateX(0);opacity:1} }`}</style>
      <header className="sticky top-0 z-40 bg-[#111]/90 backdrop-blur border-b border-white/10 px-4 md:px-8 py-4 flex justify-between"><div className="flex gap-2 items-center"><div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center font-black text-black">P</div><h1 className="font-black text-xl">ProxyGet</h1></div><div className="bg-[#1a1a1a] border border-white/10 rounded-full p-1 flex text-xs font-bold"><button onClick={()=>setCurrency("GHS")} className={`px-4 py-1.5 rounded-full ${currency==="GHS"?"bg-white text-black":"text-white/60"}`}>GHS</button><button onClick={()=>setCurrency("NGN")} className={`px-4 py-1.5 rounded-full ${currency==="NGN"?"bg-white text-black":"text-white/60"}`}>NGN</button></div></header>
      <section className="px-4 md:px-8 py-10 text-center max-w-4xl mx-auto"><h2 className="text-4xl md:text-6xl font-black">Fast & Anonymous <span className="text-green-500">Proxies</span></h2><div className="mt-6 max-w-xl mx-auto flex flex-col gap-3"><div className="relative"><span className="absolute left-4 top-3.5">🔍</span><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search e.g. 100 IPs, 10GB, Swift, Vless..." className="w-full bg-[#1a1a1a] border border-white/10 rounded-full pl-11 pr-4 py-3.5 focus:border-green-500 outline-none" /></div><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com for receipt" className="w-full bg-[#1a1a1a] border border-white/10 rounded-full px-6 py-3 text-center text-sm outline-none focus:border-green-500" />{search && <p className="text-xs text-white/40">{filtered.length} results for "{search}" - <button onClick={()=>setSearch("")} className="text-green-500">clear</button></p>}</div></section>
      <div className="px-4 md:px-8 flex gap-2 overflow-x-auto pb-4 max-w-6xl mx-auto"><span className="text-xs text-white/30 py-2">Filter:</span>{CATEGORIES.map(c=><button key={c} onClick={()=>setActiveCat(c)} className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold border ${activeCat===c?"bg-white text-black":"bg-[#1a1a1a] text-white/60 border-white/10"}`}>{c}</button>)}</div>
      <section className="px-4 md:px-8 pb-10 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">{displayProducts.map(p=><div key={p.id} className="bg-[#161616] border border-white/10 rounded-2xl p-5"><div className="text-[10px] text-white/40 font-bold">{p.cat}</div><h3 className="font-bold text-sm mt-1">{p.name}</h3><div className="mt-4 flex justify-between items-center"><span className="font-black text-xl">{getPrice(p)}</span><button onClick={()=>handlePay(p)} className={`px-5 py-2 rounded-full font-bold text-sm ${p.price===0?"bg-green-500 text-black":"bg-white text-black hover:bg-green-500"}`}>{p.price===0?"Get Free":"Pay Now"}</button></div></div>)}</section>
      {search.length===0 && <div className="text-center pb-4 text-white/30 text-xs">Showing 8 popular only. Type in search to see all {ALL_PRODUCTS.length} products.</div>}
      <section className="px-4 md:px-8 py-16 bg-[#111] border-t border-white/5"><div className="max-w-6xl mx-auto"><div className="flex flex-col md:flex-row justify-between items-center gap-4"><div><h3 className="text-2xl font-black">Customer Reviews ⭐⭐⭐⭐⭐</h3><p className="text-white/50 text-sm">Live reviews • {reviews.length} verified buyers</p></div><button onClick={()=>setShowAdd(!showAdd)} className="bg-green-500 text-black px-6 py-2.5 rounded-full font-black text-sm hover:bg-white">{showAdd?"Cancel":" + Add Review"}</button></div>
      {showAdd && (<div className="mt-6 bg-[#161616] border border-green-500/30 rounded-2xl p-6 max-w-2xl mx-auto"><h4 className="font-bold mb-4">Add Your Review</h4><div className="grid gap-3"><input value={newReview.name} onChange={e=>setNewReview({...newReview,name:e.target.value})} placeholder="Your Name" className="bg-[#0a0a0a] border border-white/10 rounded-full px-4 py-3 text-sm outline-none focus:border-green-500" /><select value={newReview.product} onChange={e=>setNewReview({...newReview,product:e.target.value})} className="bg-[#0a0a0a] border border-white/10 rounded-full px-4 py-3 text-sm outline-none">{ALL_PRODUCTS.slice(0,15).map(pr=><option key={pr.id}>{pr.name}</option>)}</select><div className="flex gap-2 items-center"><span className="text-sm">Rating:</span>{[1,2,3,4,5].map(s=><button key={s} onClick={()=>setNewReview({...newReview,stars:s})} className={`text-xl ${s<=newReview.stars?"text-yellow-400":"text-white/20"}`}>★</button>)}</div><textarea value={newReview.text} onChange={e=>setNewReview({...newReview,text:e.target.value})} placeholder="Write your review..." rows={3} className="bg-[#0a0a0a] border border-white/10 rounded-2xl px-4 py-3 text-sm outline-none focus:border-green-500"></textarea><button onClick={handleAddReview} className="bg-white text-black py-3 rounded-full font-black hover:bg-green-500">Submit Review</button></div></div>)}
      <div className="grid md:grid-cols-3 gap-4 mt-8">{reviews.map((r,i)=><div key={i} className="bg-[#161616] border border-white/10 rounded-2xl p-5"><div className="flex justify-between"><span className="text-yellow-400 text-sm">{"★".repeat(r.stars)}</span><span className="text-[10px] text-white/40">{r.location}</span></div><p className="text-sm mt-3 text-white/80">"{r.text}"</p><p className="text-xs mt-3 font-bold text-white/60">— {r.name} • {r.product}</p></div>)}</div></div></section>
      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center z-50 shadow-xl"><svg viewBox="0 0 24 24" className="w-8 h-8 fill-white"><path d="M19.05 4.91A9.9 9.9 0 0 0 12.03 2C6.16 2 1.39 6.77 1.39 12.65c0 1.87.49 3.7 1.42 5.31L1 22l4.18-1.1a9.88 9.88 0 0 0 4.85 1.23h.01c5.87 0 10.64-4.77 10.64-10.65 0-2.84-1.11-5.52-3.13-7.53l.5-.09zM12.04 20.2h-.01a8.14 8.14 0 0 1-4.15-1.14l-.3-.18-2.48.65.66-2.42-.19-.32a8.2 8.2 0 0 1-1.26-4.35c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24zm4.52-6.17c-.25-.12-1.47-.73-1.7-.81-.23-.09-.39-.12-.56.12-.17.25-.65.81-.8.97-.15.17-.3.19-.55.06-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.1-.51.1-.1.25-.3.37-.45.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.41.51.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28z"/></svg></a>
    </div>
  );
}