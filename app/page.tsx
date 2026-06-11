export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-blue-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Hitta billigaste fotbollsbiljetterna</h1>
        <p className="text-lg text-blue-100 mb-8">Jämför priser från över 50 auktoriserade återförsäljare.</p>
        
        <div className="max-w-2xl mx-auto bg-white p-2 rounded-lg shadow-lg flex">
          <input 
            type="text" 
            placeholder="Sök på lag (t.ex. Arsenal, Malmö FF)..." 
            className="w-full p-3 text-gray-900 outline-none"
          />
          <button className="bg-blue-600 text-white px-8 py-3 rounded-md font-bold">SÖK NU</button>
        </div>
      </header>

      {/* Matchlista Placeholder */}
      <main className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-8">Kommande Toppmatcher</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((match) => (
            <div key={match} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="font-bold text-lg mb-2">Lag A vs Lag B</div>
              <div className="text-sm text-gray-500 mb-4">2026-06-20 | 19:00</div>
              <div className="text-xl font-bold text-blue-900 mb-4">Från 450 kr</div>
              <button className="w-full bg-gray-900 text-white py-2 rounded-md">Köp biljett</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}