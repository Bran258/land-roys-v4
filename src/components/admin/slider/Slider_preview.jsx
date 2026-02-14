import React, { useEffect, useState, useRef } from "react";
import { Save, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { getPublicImageUrl } from "../../../services/Slider.service";

const Slider_preview = ({ slide, onSave, onDelete }) => {
  const [localSlide, setLocalSlide] = useState(slide);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const inputRef = useRef(null);

  const isUrl = (str) => str?.startsWith("http");

  useEffect(() => {
    const imageUrl = isUrl(slide.url_image) ? slide.url_image : getPublicImageUrl(slide.url_image);
    setLocalSlide({ ...slide, url_image: imageUrl });
    setPreview(imageUrl);
  }, [slide]);

  const handleFileChange = (selectedFile) => {
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setError("El tamaño máximo permitido es 5MB.");
      setFile(null);
      setPreview(localSlide.url_image);
    } else {
      setError("");
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFileChange(droppedFile);
  };

  const handleSave = async () => {
    if (!localSlide?.id) return;
    if (onSave) onSave({ ...localSlide, file });
    setFile(null);
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "¿Eliminar slide?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed || !localSlide?.id) return;
    if (onDelete) onDelete(localSlide.id);
  };

  return (
    <div className="bg-gray-50 p-8 min-h-screen">
      {/* Preview de imagen */}
      <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl mb-6 bg-black flex items-center justify-center">
        {preview ? (
          <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 font-semibold">Sin imagen</span>
        )}
      </div>

      {/* Formulario */}
      <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input de imagen Drag & Drop */}
          <div
            className="col-span-1 md:col-span-2 border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition relative"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => inputRef.current.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files[0])}
              className="hidden"
            />

            {/* Cuadro de recomendaciones */}
            <div className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded shadow-md">
              Recomendado: 1667×787 px
            </div>

            <p className="text-gray-500 text-sm mb-2 text-center">
              Arrastra la imagen aquí o haz clic para seleccionar
            </p>
            <p className="text-xs text-gray-400 text-center">
              Tamaño máximo recomendado: 5MB
            </p>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>

          {/* Selector Activo/Inactivo */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Estado</label>
            <div className="flex gap-4">
              <button
                className={`px-4 py-2 rounded-full font-medium text-sm transition ${localSlide?.estado
                    ? "bg-green-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                onClick={() => setLocalSlide({ ...localSlide, estado: true })}
              >
                Activo
              </button>
              <button
                className={`px-4 py-2 rounded-full font-medium text-sm transition ${!localSlide?.estado
                    ? "bg-red-500 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                onClick={() => setLocalSlide({ ...localSlide, estado: false })}
              >
                Inactivo
              </button>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4 pt-6 mt-6 border-t border-gray-200">
          <button
            className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-700 transition"
            onClick={handleDelete}
          >
            <Trash2 size={16} /> Eliminar
          </button>
          <button
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded-full text-sm uppercase shadow-md transition"
            onClick={handleSave}
            disabled={!!error}
          >
            Guardar cambios <Save size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slider_preview;
