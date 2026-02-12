import React from 'react';
import {
  ArrowLeft,
  Plus,
  Bike,
  AlertTriangle,
  Wallet,
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import MotosTable from './MotosTable';

const GestionInventarioMoto = () => {
  const navigate = useNavigate();

  // Simulación de datos exactamente como tu tabla
  const motos = [
    {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      nombre: "Kawasaki Z900",
      descripcion: "Sport Naked de alto rendimiento",
      categoria: "Sport Naked",
      precio: 48500,
      stock: 12,
      imagen_url: "https://images.unsplash.com/photo-1622185135505-2d795003994a?w=200",
    },
    {
      id: "6b1c2a91-9a5f-4c5a-bc23-12aa11bb44cc",
      nombre: "Honda CB650R",
      descripcion: "Diseño Neo Sports Café",
      categoria: "Urban Retro",
      precio: 36900,
      stock: 2,
      imagen_url: null,
    },
    {
      id: "9e91aa12-cc44-4d99-a111-999aa2211bbb",
      nombre: "Ducati Monster",
      descripcion: "Premium deportiva",
      categoria: "Premium Sport",
      precio: 62000,
      stock: 0,
      imagen_url: null,
    },
    {
      id: "111aa222-bbbb-4ccc-9999-aaaa00001111",
      nombre: "Yamaha MT-07",
      descripcion: "Uso urbano deportivo",
      categoria: "Urban",
      precio: 38200,
      stock: 8,
      imagen_url: null,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 space-y-8">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/inventarios")}
            className="p-3 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 shadow-sm text-slate-400"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
              Gestión de <span className="text-yellow-400 italic">Motos</span>
            </h1>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-1">
              Inventario, precios y stock
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/admin/inventario")}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95">
          <Plus size={16} strokeWidth={3} /> Agregar Nueva Moto
        </button>
      </div>

      {/* Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex justify-between">
          <div>
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Total Motos</span>
            <div className="text-3xl font-black">{motos.length}</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-2xl text-yellow-400">
            <Bike size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex justify-between">
          <div>
            <span className="text-[8px] font-black text-red-400 uppercase tracking-widest">Stock Crítico</span>
            <div className="text-3xl font-black text-red-500">
              {motos.filter(m => m.stock > 0 && m.stock <= 3).length}
            </div>
          </div>
          <div className="bg-red-50 p-4 rounded-2xl text-red-400">
            <AlertTriangle size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex justify-between">
          <div>
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Valor Inventario</span>
            <div className="text-3xl font-black">
              S/ {motos.reduce((a, m) => a + m.precio * m.stock, 0).toLocaleString()}
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-2xl text-blue-400">
            <Wallet size={24} />
          </div>
        </div>
      </div>

      <MotosTable motos={motos} />
    </div>
  );
};

export default GestionInventarioMoto;
