import React from "react";
import { Star, Clock, Award, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./SelectorSecciones.css";

const SelectorSecciones = () => {
    const secciones = [
        {
            id: "coleccion",
            titulo: "Colección Exclusiva",
            descripcion:
                "Organiza el escaparate principal con las piezas más icónicas y vanguardistas de tu catálogo.",
            icon: <Star size={22} className="text-black" />,
            tag: "ALTA PRIORIDAD",
            destacado: true,
            link: "/admin/home_secciones/ranking",
        },
        {
            id: "ofertas",
            titulo: "Ofertas por Vencer",
            descripcion:
                "Crea urgencia mediante promociones temporales y cronómetros de cuenta regresiva.",
            icon: <Clock size={22} className="text-yellow-500" />,
            destacado: false,
            link: "/admin/home_secciones/ofertas",
        },
        {
            id: "experiencia",
            titulo: "Land Roys Experience",
            descripcion:
                "Refuerza la confianza del cliente mediante testimonios y nuestra identidad de marca.",
            icon: <Award size={22} className="text-blue-500" />,
            destacado: false,
            link: "/admin/home_secciones/experiencia",
        },
    ];

    return (
        <section className="p-12 bg-slate-50 min-h-screen">
            {/* Header */}
            <div className="mb-16">
                <span className="text-[11px] font-black tracking-widest text-yellow-500 uppercase">
                    ----- Módulo de Contenido
                </span>

                <h2 className="text-5xl font-black text-slate-900 tracking-tight mt-3">
                    <span className="text-black">Selector de </span>
                    <span className="text-yellow-400 italic">Secciones</span>
                </h2>

                <p className="text-gray-500 text-sm max-w-xl mt-4">
                    Gestiona visualmente los bloques principales de tu página de inicio.
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {secciones.map((sec) => (
                    <div
                        key={sec.id}
                        className={`selector-card relative rounded-[2.75rem] p-9
                        ${sec.destacado
                                ? "selector-card--destacada border-2 border-yellow-400"
                                : "selector-card--normal border border-gray-100"
                            }`}
                    >
                        {/* Tag */}
                        {sec.tag && (
                            <span className="absolute top-7 right-7 text-[9px] font-black bg-yellow-100 text-yellow-600 px-4 py-1 rounded-full tracking-widest">
                                {sec.tag}
                            </span>
                        )}

                        {/* Icon */}
                        <div
                            className={`selector-icon w-16 h-16 flex items-center justify-center rounded-2xl mb-8
                            ${sec.destacado
                                    ? "bg-yellow-400"
                                    : "bg-slate-50 border border-gray-200"
                                }`}
                        >
                            {sec.icon}
                        </div>

                        {/* Content */}
                        <h3 className="text-2xl font-black text-slate-800 mb-3">
                            {sec.titulo}
                        </h3>

                        <p className="text-gray-500 text-sm leading-relaxed mb-10">
                            {sec.descripcion}
                        </p>

                        {/* Button */}
                        <Link
                            to={sec.link}
                            className={`selector-btn w-full flex items-center justify-center gap-2 py-4 rounded-2xl
                            font-black text-xs uppercase tracking-widest
                            ${sec.destacado
                                    ? "bg-yellow-400 text-black hover:bg-yellow-500"
                                    : "bg-slate-900 text-white hover:bg-slate-800"
                                }`}
                        >
                            Gestionar
                            <ChevronRight
                                size={16}
                                strokeWidth={3}
                                className="chevron"
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SelectorSecciones;
