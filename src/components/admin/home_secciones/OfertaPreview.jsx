import React from "react";
import { Pencil, Trash2, Flame } from "lucide-react";
import Swal from "sweetalert2";

const OfertaPreview = ({ oferta, onEdit, onDelete }) => {

    const handleDelete = () => {
        Swal.fire({
            title: "¿Eliminar oferta?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(oferta.id);

                Swal.fire({
                    title: "Eliminado",
                    text: "La oferta fue eliminada correctamente.",
                    icon: "success",
                    timer: 1800,
                    showConfirmButton: false,
                });
            }
        });
    };

    return (
        <div className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300">

            {/* Imagen */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={oferta.imagen_url}
                    alt={oferta.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-1 bg-red-600 text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                    <Flame size={14} />
                    -{oferta.descuento}%
                </div>

                <div className="absolute bottom-4 right-4 bg-emerald-500 text-white font-extrabold text-lg px-4 py-2 rounded-2xl shadow-lg">
                    S/. {oferta.precio_especial}
                </div>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-4">
                <div>
                    <h3 className="text-2xl font-extrabold text-slate-800 leading-tight">
                        {oferta.titulo}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                        Moto: <span className="font-semibold">{oferta.moto_seleccionada}</span>
                    </p>
                </div>

                <p className="text-slate-600 text-sm line-clamp-3">
                    {oferta.descripcion}
                </p>

                <div className="flex items-center justify-between">
                    <span className="text-slate-400 line-through text-sm">
                        S/. {oferta.precio_original}
                    </span>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                        Precio especial
                    </span>
                </div>

                {/* Acciones */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                    <button
                        onClick={() => onEdit(oferta)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold py-2.5 transition"
                    >
                        <Pencil size={16} />
                        Editar
                    </button>

                    <button
                        onClick={handleDelete}
                        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2.5 transition"
                    >
                        <Trash2 size={16} />
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OfertaPreview;
