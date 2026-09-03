import React, { useState, useMemo } from 'react';

const WHATSAPP_NUMBER = "233594682085";
const PAYSTACK_PUBLIC_KEY = "pk_test_5f501031e23522ce04d75524a9a35f1a69d11445"; // change to pk_live_ when approved

const PRODUCTS = [
  { id: 1, name: "US Residential Proxy - 1GB", priceGHS: 65, popular: true, desc: "Premium US IP, never blocked" },
  { id: 2, name: "UK Residential Proxy - 1GB", priceGHS: 70, popular: false, desc: "Clean UK IP for sneaker sites" },
  { id: 3, name: "Nigeria ISP Proxy - 1GB", priceGHS: 50, popular: true, desc: "Fast NG proxy, low latency" },
  { id: 4, name: "Ghana Dedicated Proxy", priceGHS: 120, popular: false, desc: "Static IP, unlimited bandwidth" },
  { id: 5, name: "Data Center Proxy - 10 Pack", priceGHS: 90, popular: true, desc: "Fast & cheap for scraping" },
];

const EXCHANGE_RATE = 95; // 1 GHS = ~95 NGN - you can edit this

export default function App() {
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("GHS"); // GHS or NGN

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const formatPrice = (priceGHS) => {
    if (currency === "GHS") return `₵${priceGHS}`;
    return `₦${(priceGHS * EXCHANGE_RATE).toLocaleString()}`;
  };

  const handleBuy = (product) => {
    const message = `Hi ProxyGet, I want to buy: ${product.name} - ${formatPrice(product.priceGHS)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* HEADER - Green bar removed */}
      <header className="sticky top-0 z-40 bg-[#111] border-b border-white/10 px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center font-black text-black">P</div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight">ProxyGet</h1>
        </div>

        {/* Search Bar + Currency Switch */}
        <div className="flex items-center gap-3 md:gap-6">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search proxies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#1a1a1a] border border-white/10 rounded-full px-4 py-2 pl-10 w-[260px] focus:outline-none focus:border-green-500 text-sm"
            />
            <span className="absolute left-3 top-2.5 text-white/40">🔍</span>
          </div>

          {/* GHS / NGN Switch */}
          <div className="bg-[#1a1a1a] border border-white/10 rounded-full p-1 flex text-sm font-bold">
            <button
              onClick={() => setCurrency("GHS")}
              className={`px-4 py-1.5 rounded-full transition ${currency === "GHS"? "bg-white text-black" : "text-white/60"}`}
            >
              GHS
            </button>
            <button
              onClick={() => setCurrency("NGN")}
              className={`px-4 py-1.5 rounded-full transition ${currency === "NGN"? "bg-white text-black" : "text-white/60"}`}
            >
              NGN
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Search */}
      <div className="md:hidden px-4 py-3 bg-[#111] border-b border-white/10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search proxies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-full px-4 py-3 pl-10 focus:outline-none focus:border-green-500"
          />
          <span className="absolute left-3 top-3.5 text-white/40">🔍</span>
        </div>
      </div>

      {/* HERO */}
      <section className="px-4 md:px-8 py-10 md:py-16 text-center">
        <h2 className="text-4xl md:text-6xl font-black leading-tight">
          Fast & Anonymous <br/><span className="text-green-500">Proxies</span> for Ghana & Nigeria
        </h2>
        <p className="text-white/60 mt-4 max-w-xl mx-auto">Residential, ISP and Datacenter proxies. Instant delivery via WhatsApp after payment.</p>
      </section>

      {/* PRODUCTS */}
      <section className="px-4 md:px-8 pb-32 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {filteredProducts.length === 0? (
          <p className="col-span-3 text-center text-white/40 py-10">No proxy found for "{search}"</p>
        ) : filteredProducts.map(product => (
          <div key={product.id} className="bg-[#161616] border border-white/10 rounded-2xl p-5 hover:border-green-500/50 transition relative">
            {product.popular && <span className="absolute top-3 right-3 bg-green-500 text-black text-[10px] font-black px-2 py-1 rounded-full">POPULAR</span>}
            <h3 className="font-bold text-lg pr-16">{product.name}</h3>
            <p className="text-white/50 text-sm mt-1 h-10">{product.desc}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-2xl font-black">{formatPrice(product.priceGHS)}</span>
              <button onClick={() => handleBuy(product)} className="bg-white text-black px-5 py-2.5 rounded-full font-bold text-sm hover:bg-green-500 transition">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi ProxyGet, I need help with proxies")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:scale-110 transition z-50"
      >
        {/* WhatsApp SVG Icon */}
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
          <path d="M19.05 4.91A9.9 9.9 0 0 0 12.03 2C6.16 2 1.39 6.77 1.39 12.65c0 1.87.49 3.7 1.42 5.31L1 22l4.18-1.1a9.88 9.88 0 0 0 4.85 1.23h.01c5.87 0 10.64-4.77 10.64-10.65 0-2.84-1.11-5.52-3.13-7.53l.5-.09zM12.04 20.2h-.01a8.14 8.14 0 0 1-4.15-1.14l-.3-.18-2.48.65.66-2.42-.19-.32a8.2 8.2 0 0 1-1.26-4.35c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24zm4.52-6.17c-.25-.12-1.47-.73-1.7-.81-.23-.09-.39-.12-.56.12-.17.25-.65.81-.8.97-.15.17-.3.19-.55.06-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.1-.51.1-.1.25-.3.37-.45.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.41.51.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28z"/>
        </svg>
      </a>
    </div>
  );
}