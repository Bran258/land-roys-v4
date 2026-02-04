import { useNavigate } from "react-router-dom"

const Experiencia = () => {
    const navigate = useNavigate()

    return (
        <div className="p-12">
            <button
                onClick={() => navigate("/admin/home_secciones")}
                className="mb-6 px-6 py-3 rounded-xl bg-slate-900 text-white font-black text-xs tracking-widest"
            >
                ← Volver
            </button>
            {/* Contenido de Experiencia */}
        </div>
    );
};

export default Experiencia