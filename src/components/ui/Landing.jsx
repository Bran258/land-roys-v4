import React, { useState, useEffect } from 'react';

const Landing = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) return 100;
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Elementos decorativos de fondo (formas geométricas tenues) */}
      <div className="absolute top-10 right-10 w-24 h-24 border border-slate-50 rounded-full" />
      <div className="absolute bottom-10 left-10 w-32 h-32 border border-slate-50 rounded-xl rotate-12" />

      <div className="text-center z-10 w-full max-w-md px-10">
        {/* Logo Central con Icono */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-400/20 mb-4 animate-pulse">
            {/* Reemplazar con el SVG del logo de la mano con la casa/moto */}
            <div className="text-black">
              <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
                <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">
            Land Roys
          </h1>
        </div>

        {/* Barra de Progreso */}
        <div className="space-y-3">
          <div className="flex justify-between items-end px-1">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">
              Iniciando Sistema
            </span>
            <span className="text-xs font-black text-slate-900">
              {Math.round(progress)}%
            </span>
          </div>
          
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-400 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Mensajes de Estado */}
        <div className="mt-8 space-y-2">
          <p className="text-slate-400 text-xs font-medium animate-bounce">
            Procesando tu solicitud...
          </p>
          <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.3em]">
            Calidad Premium
          </p>
        </div>
      </div>

      {/* Marca de agua o versión al pie (opcional) */}
      <div className="absolute bottom-8 text-[8px] font-bold text-slate-200 uppercase tracking-widest">
        © 2026 Land Roys System v2.0
      </div>
    </div>
  );
};

export default Landing;