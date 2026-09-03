import React, { useState, useMemo, useEffect } from 'react';

const WHATSAPP_NUMBER = "233594682085";
const PAYSTACK_PUBLIC_KEY = "pk_test_5f501031e23522ce04d75524a9a35f1a69d11445";
const NGN_TO_GHS_RATE = 95;

const ALL_PRODUCTS = [
  // 711Proxy GB - GHC
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

  // 711Proxy IPs - GHC
  { id: "711ip-25", cat: "711Proxy", name: "711Proxy - 25 IPs", price: 40, currency: "GHS", popular: false },
  { id: "711ip-50", cat: "711Proxy", name: "711Proxy - 50 IPs", price: 75, currency: "GHS", popular: false },
  { id: "711ip-100", cat: "711Proxy", name: "711Proxy - 100 IPs", price: 140, currency: "GHS", popular: true },
  { id: "711ip-200", cat: "711Proxy", name: "711Proxy - 200 IPs", price: 250, currency: "GHS", popular: false },
  { id: "711ip-300", cat: "711Proxy", name: "711Proxy - 300 IPs", price: 380, currency: "GHS", popular: false },
  { id: "711ip-400", cat: "711Proxy", name: "711Proxy - 400 IPs", price: 450, currency: "GHS", popular: false },
  { id: "711ip-500", cat: "711Proxy", name: "711Proxy - 500 IPs", price: 500, currency: "GHS", popular: true },
  { id: "711ip-2000", cat: "711Proxy", name: "711Proxy - 2000 IPs", price: 1000, currency: "GHS", popular: true },

  // 9Proxy IPs - GHC
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

  // LokiProxy - GHC
  { id: "loki-25", cat: "LokiProxy", name: "LokiProxy - 25 IPs", price: 60, currency: "GHS", popular: false },
  { id: "loki-50", cat: "LokiProxy", name: "LokiProxy - 50 IPs", price: 100, currency: "GHS", popular: false },
  { id: "loki-100", cat: "LokiProxy", name: "LokiProxy - 100 IPs", price: 140, currency: "GHS", popular: true },
  { id: "loki-200", cat: "LokiProxy", name: "LokiProxy - 200 IPs", price: 260, currency: "GHS", popular: false },
  { id: "loki-400", cat: "LokiProxy", name: "LokiProxy - 400 IPs", price: 400, currency: "GHS", popular: false },
  { id: "loki-500", cat: "LokiProxy", name: "LokiProxy - 500 IPs", price: 500, currency: "GHS", popular: true },
  { id: "loki-1500", cat: "LokiProxy", name: "LokiProxy - 1500 IPs", price: 940, currency: "GHS", popular: false },
  { id: "loki-3000", cat: "LokiProxy", name: "LokiProxy - 3000 IPs", price: 1350, currency: "GHS", popular: true },

  // NovProxy - NGN
  { id: "nov-25", cat: "NovProxy", name: "NovProxy - 25 IPs", price: 6000, currency: "NGN", popular: false },
  { id: "nov-50", cat: "NovProxy", name: "NovProxy - 50 IPs", price: 10000, currency: "NGN", popular: false },
  { id: "nov-100", cat: "NovProxy", name: "NovProxy - 100 IPs", price: 13000, currency: "NGN", popular: true },
  { id: "nov-200", cat: "NovProxy", name: "NovProxy - 200 IPs", price: 21000, currency: "NGN", popular: false },
  { id: "nov-300", cat: "NovProxy", name: "NovProxy - 300 IPs", price: 32000, currency: "NGN", popular: false },
  { id: "nov-400", cat: "NovProxy", name: "NovProxy - 400 IPs", price: 41000, currency: "NGN", popular: false },
  { id: "nov-500", cat: "NovProxy", name: "NovProxy - 500 IPs", price: 50000, currency: "NGN", popular: true },
  { id: "nov-1000", cat: "NovProxy", name: "NovProxy - 1000 IPs", price: 65000, currency: "NGN", popular: true },

  // 9Proxy GB - NGN
  { id: "9gb-2", cat: "9Proxy GB", name: "9Proxy GB - 2GB", price: 10000, currency: "NGN", popular: false },
  { id: "9gb-5", cat: "9Proxy GB", name: "9Proxy GB - 5GB", price: 15000, currency: "NGN", popular: false },
  { id: "9gb-10", cat: "9Proxy GB", name: "9Proxy GB - 10GB", price: 30000, currency: "NGN", popular: true },
  { id: "9gb-15", cat: "9Proxy GB", name: "9Proxy GB - 15GB", price: 43000, currency: "NGN", popular: false },
  { id: "9gb-20", cat: "9Proxy GB", name: "9Proxy GB - 20GB", price: 55000, currency: "NGN", popular: true },
  { id: "9gb-25", cat: "9Proxy GB", name: "9Proxy GB - 25GB", price: 65000, currency: "NGN", popular: false },
  { id: "9gb-30", cat: "9Proxy GB", name: "9Proxy GB - 30GB", price: 75000, currency: "NGN", popular: false },
  { id: "9gb-35", cat: "9Proxy GB", name: "9Proxy GB - 35GB", price: 80000, currency: "NGN", popular: false },
  { id: "9gb-50", cat: "9Proxy GB", name: "9Proxy GB - 50GB", price: 100000, currency: "NGN", popular: true },
];

const CATEGORIES = ["All", "711Proxy GB", "711Proxy", "9Proxy", "LokiProxy", "NovProxy", "9Proxy GB"];

export default function App() {
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("GHS");
  const [activeCat, setActiveCat] = useState("All");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); }
  }, []);

  const filtered = useMemo(() => {
    return ALL_PRODUCTS.filter(p => {
      const matchCat = activeCat === "All" || p.cat === activeCat;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.cat.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCat]);

  const getDisplayPrice = (product) => {
    if (product.currency === currency) {
      return currency === "GHS"? `GHC ${product.price}` : `₦${product.price.toLocaleString()}`;
    } else {
      if (currency === "GHS") {
        const converted = Math.ceil(product.price / NGN_TO_GHS_RATE);
        return `GHC ${converted}`;
      } else {
        const converted = Math.ceil(product.price * NGN_TO_GHS_RATE);
        return `₦${converted.toLocaleString()}`;
      }
    }
  };

  const handlePay = (product) => {
    if (!email ||!email.includes("@")) {
      alert("Please enter your email first - for Paystack receipt");
      return;
    }
    const amountGHS = product.currency === "GHS"? product.price : Math.ceil(product.price / NGN_TO_GHS_RATE);
    const amountKobo = amountGHS * 100;

    if (!window.PaystackPop) {
      alert("Paystack loading... wait 2 seconds and try again");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: email,
      amount: amountKobo,
      currency: "GHS",
      ref: `ProxyGet_${Date.now()}_${product.id}`,
      metadata: {
        custom_fields: [
          { display_name: "Product", variable_name: "product", value: product.name },
          { display_name: "Category", variable_name: "category", value: product.cat }
        ]
      },
      callback: function(response) {
        const msg = `Hi ProxyGet! ✅ I just paid for ${product.name} (${getDisplayPrice(product)}). Ref: ${response.reference}. My email: ${email}. Please deliver.`;
        window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
      },
      onClose: function() {
        console.log("Payment closed");
      }
    });
    handler.openIframe();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      <header className="sticky top-0 z-40 bg-[#111] border-b border-white/10 px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center font-black text-black">P</div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight">ProxyGet</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." className="bg-[#1a1a1a] border border-white/10 rounded-full px-4 py-2 pl-10 w-[200px] focus:outline-none focus:border-green-500 text-sm" />
            <span className="absolute left-3 top-2.5 text-white/40">🔍</span>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-full p-1 flex text-sm font-bold">
            <button onClick={()=>setCurrency("GHS")} className={`px-4 py-1.5 rounded-full transition ${currency==="GHS"?"bg-white text-black":"text-white/60"}`}>GHS</button>
            <button onClick={()=>setCurrency("NGN")} className={`px-4 py-1.5 rounded-full transition ${currency==="NGN"?"bg-white text-black":"text-white/60"}`}>NGN</button>
          </div>
        </div>
      </header>

      <div className="md:hidden px-4 py-3 bg-[#111] border-b border-white/10">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search e.g. 100 IPs, 10GB..." className="w-full bg-[#1a1a1a] border border-white/10 rounded-full px-4 py-3 focus:outline-none focus:border-green-500 text-sm" />
      </div>

      <section className="px-4 md:px-8 py-8 text-center">
        <h2 className="text-3xl md:text-5xl font-black leading-tight">Fast & Anonymous <br/><span className="text-green-500">Residential Proxies</span></h2>
        <p className="text-white/60 mt-3 text-sm max-w-xl mx-auto">Pay instantly with Paystack. Instant delivery on WhatsApp after payment.</p>
        <div className="max-w-md mx-auto mt-5">
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email for receipt" className="w-full bg-[#1a1a1a] border border-white/10 rounded-full px-6 py-3 text-center text-sm focus:outline-none focus:border-green-500" />
        </div>
      </section>

      <div className="px-4 md:px-8 flex gap-2 overflow-x-auto pb-4 max-w-6xl mx-auto">
        {CATEGORIES.map(c=>(
          <button key={c} onClick={()=>setActiveCat(c)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold border transition ${activeCat===c?"bg-white text-black border-white":"bg-[#1a1a1a] text-white/70 border-white/10 hover:border-white/20"}`}>{c}</button>
        ))}
      </div>

      <section className="px-4 md:px-8 pb-32 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {filtered.length===0? <p className="col-span-4 text-center text-white/40 py-20">No product found for "{search}"</p> : filtered.map(p=>(
          <div key={p.id} className="bg-[#161616] border border-white/10 rounded-2xl p-5 hover:border-green-500/50 transition relative">
            <div className="text-[10px] tracking-widest text-white/40 font-bold uppercase">{p.cat}</div>
            {p.popular && <span className="absolute top-3 right-3 bg-green-500 text-black text-[9px] font-black px-2 py-1 rounded-full">POPULAR</span>}
            <h3 className="font-bold text-[15px] mt-1 leading-tight">{p.name}</h3>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-xl font-black">{getDisplayPrice(p)}</span>
              <button onClick={()=>handlePay(p)} className="bg-white text-black px-5 py-2.5 rounded-full font-bold text-sm hover:bg-green-500 transition">Pay Now</button>
            </div>
          </div>
        ))}
      </section>

      <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi ProxyGet, I need help")}`} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:scale-110 transition z-50">
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white"><path d="M19.05 4.91A9.9 9.9 0 0 0 12.03 2C6.16 2 1.39 6.77 1.39 12.65c0 1.87.49 3.7 1.42 5.31L1 22l4.18-1.1a9.88 9.88 0 0 0 4.85 1.23h.01c5.87 0 10.64-4.77 10.64-10.65 0-2.84-1.11-5.52-3.13-7.53l.5-.09zM12.04 20.2h-.01a8.14 8.14 0 0 1-4.15-1.14l-.3-.18-2.48.65.66-2.42-.19-.32a8.2 8.2 0 0 1-1.26-4.35c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24zm4.52-6.17c-.25-.12-1.47-.73-1.7-.81-.23-.09-.39-.12-.56.12-.17.25-.65.81-.8.97-.15.17-.3.19-.55.06-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.1-.51.1-.1.25-.3.37-.45.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.41.51.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28z"/></svg>
      </a>
    </div>
  );
}