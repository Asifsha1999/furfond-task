import { useState, useEffect } from 'react';

// 1. UPDATE THIS URL to your Render Backend URL
const API_URL = "https://furfond-backend.onrender.com/api/content";

export default function App() {
  const [data, setData] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // FETCH DATA FROM LIVE BACKEND
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(val => setData(val))
      .catch(err => console.error("API Error:", err));
  }, []);

  // SAVE DATA TO LIVE BACKEND
  const saveChanges = () => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then(res => {
      if (res.ok) {
        setEditMode(false);
        alert("FurFond Content Updated Successfully!");
      }
    })
    .catch(err => alert("Error saving changes. Check console."));
  };

  if (!data) return (
    <div className="h-screen flex items-center justify-center bg-slate-900 text-white font-black tracking-widest uppercase italic text-center px-6">
      <div className="animate-pulse">Initializing FurFond Experience...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-green-100 tracking-tight">
      
      {/* --- NAVIGATION --- */}
      <nav className="absolute top-0 w-full z-40 px-8 h-24 flex justify-between items-center bg-transparent">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white font-black shadow-lg">F</div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase italic">FurFond</span>
        </div>
        <button 
          onClick={() => setEditMode(true)} 
          className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase hover:bg-white/30 transition-all shadow-xl"
        >
          Editor Login
        </button>
      </nav>

      {/* --- HERO SECTION WITH VIDEO --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 bg-slate-950/70 backdrop-blur-[1px]"></div>
        
        {/* Assets in public folder work with /filename.ext */}
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>

        <div className="relative z-20 max-w-5xl mx-auto text-center px-6">
          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter text-white leading-[0.9] uppercase italic">
            {data.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            {data.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-green-500 text-white px-12 py-6 rounded-2xl text-xl font-black hover:bg-green-400 hover:scale-105 transition-all shadow-2xl shadow-green-900/40 uppercase italic">
              Order Your Comb
            </button>
          </div>
        </div>
      </section>

      {/* --- PRODUCT SPECIFICATIONS --- */}
      <section className="py-32 px-6 bg-slate-950 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-green-500 font-black tracking-widest uppercase text-sm mb-4 block underline decoration-2 underline-offset-8">The Engineering</span>
            <h2 className="text-5xl font-black mb-12 tracking-tight uppercase italic">Built For <br/>Cat Comfort.</h2>
            <div className="space-y-16 text-left">
              <div className="relative pl-8 border-l-2 border-green-600 group">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-green-400 transition-colors uppercase italic">{data.feature1}</h3>
                <p className="text-slate-400 text-lg leading-relaxed">Simply press the button after grooming. The bristles retract, allowing the hair to slide off instantly. No more manual cleaning.</p>
              </div>
              <div className="relative pl-8 border-l-2 border-slate-800 group hover:border-green-600 transition-colors">
                <h3 className="text-2xl font-bold mb-4 group-hover:text-green-400 transition-colors uppercase italic">{data.feature2}</h3>
                <p className="text-slate-400 text-lg leading-relaxed">Featuring rounded safety tips that gently massage the skin and stimulate blood flow while removing 95% of loose fur.</p>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-10 bg-green-500/10 blur-[100px] rounded-full group-hover:bg-green-500/20 transition-all duration-700"></div>
            <div className="relative bg-slate-900 rounded-[3rem] p-4 border border-slate-800 shadow-2xl overflow-hidden">
              <img 
                src="/comb-preview.png" 
                alt="FurFond Comb Design" 
                className="w-full h-auto rounded-[2.5rem] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
               <div className="absolute bottom-8 left-8 bg-green-500 text-white px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase shadow-xl">
                  Cat Comb
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ADMIN DRAWER --- */}
      {editMode && (
        <>
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50" onClick={() => setEditMode(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[60] p-12 flex flex-col border-l-8 border-green-500 animate-in slide-in-from-right duration-500">
            <h3 className="text-4xl font-black tracking-tighter mb-12 uppercase italic">Editor</h3>
            <div className="space-y-10 flex-1 overflow-y-auto pr-2">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Product Headline</label>
                <textarea className="w-full border-b-4 border-slate-100 focus:border-green-600 py-4 outline-none text-2xl font-black transition uppercase italic" rows="2" value={data.heroTitle} onChange={e => setData({...data, heroTitle: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Product Details</label>
                <textarea className="w-full border-b-4 border-slate-100 focus:border-green-600 py-4 outline-none text-slate-500 text-lg transition font-medium" rows="4" value={data.heroSubtitle} onChange={e => setData({...data, heroSubtitle: e.target.value})} />
              </div>
            </div>
            <button onClick={saveChanges} className="mt-12 w-full bg-black text-white py-6 rounded-2xl font-black hover:bg-green-600 transition-all uppercase italic tracking-widest shadow-2xl hover:scale-[1.02] active:scale-[0.98]">
              Publish Updates
            </button>
          </div>
        </>
      )}
    </div>
  );
}