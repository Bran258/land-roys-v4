import { useState } from "react";
import { Clock, ChevronDown, Mail, Phone } from "lucide-react";
import logoHeaderLandRoys from "../../assets/LogoHeaderCompleto.png";

function HorarioDropdown({ mobile = false }) {
    const [open, setOpen] = useState(false);

    return (
        <div className={`relative ${mobile ? "w-full" : ""}`}>

            {/* Botón */}
            <button
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm transition-all duration-300
        ${mobile ? "w-full justify-center" : ""}
        bg-yellow-400 text-gray-900 hover:bg-yellow-500`}
            >
                <Clock size={18} />
                <span>Info</span>
                <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {/* Dropdown */}
            {open && (
                <div
                    className={`
            ${mobile ? "mt-3" : "absolute right-0 mt-3 w-96"}
            bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 z-50
          `}
                >
                    {/* Logo centrado */}
                    <div className="flex justify-center mb-4">
                        <img
                            src={logoHeaderLandRoys}
                            alt="Land Roys - Logo oficial"
                            className="w-40 object-contain"
                        />
                    </div>

                    {/* Descripción */}
                    <p className="text-sm text-gray-700 text-center leading-relaxed">
                        En Land Roys motos tenemos variedad de modelos que se adaptan a tus
                        necesidades. Descubre nuestros increíbles modelos pensados para cada ocasión.
                    </p>

                    {/* Separador */}
                    <div className="my-5 border-t border-gray-200"></div>

                    {/* Título sección */}
                    <h4 className="text-xs font-bold text-gray-900 tracking-widest text-center mb-4">
                        HORARIOS Y CONTACTO
                    </h4>

                    {/* Información */}
                    <div className="space-y-3 text-sm text-gray-600">

                        <div className="flex items-start gap-3">
                            <Clock size={18} className="text-yellow-500 mt-0.5" />
                            <span>
                                <strong>Horario:</strong> 9am a 5pm <br />
                                <span className="text-gray-500">
                                    Sábado: 10am a 2pm
                                </span>
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Mail size={18} className="text-yellow-500" />
                            <span>serviciosalcliente@landroys.com.pe</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Phone size={18} className="text-yellow-500" />
                            <span>+ (511) 418-0418</span>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default HorarioDropdown;
