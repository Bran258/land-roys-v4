import React, { useEffect, useState } from "react";
import SliderList from "../../../components/admin/slider/Slider_list";
import Slider_preview from "../../../components/admin/slider/Slider_preview";
import {
  getSlides,
  addSlide,
  updateSlide,
  reorderSlides,
  deleteSlide,
  uploadFileAndGetUrl,
  getPublicImageUrl
} from "../../../services/Slider.service";
import Swal from "sweetalert2";

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // Función para recargar slides desde la base de datos
  const reloadSlides = async () => {
    try {
      const data = await getSlides();

      // Transformar url_image para que sean URLs públicas
      const slidesWithUrl = data.map(slide => ({
        ...slide,
        url_image: slide.url_image ? getPublicImageUrl(slide.url_image) : null
      }));

      setSlides(slidesWithUrl);
      setSelectedId(slidesWithUrl[0]?.id || null);
    } catch (err) {
      console.error("Error cargando slides:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los slides"
      });
    }
  };


  // Cargar slides al inicio
  useEffect(() => {
    reloadSlides();
  }, []);

  const selectedSlide = slides.find((s) => s.id === selectedId);

  // Agregar nuevo slide
  const handleAddSlide = async (slideData) => {
    try {
      // Subir la imagen primero y obtener la URL
      let url_image = null;
      if (slideData.file) {
        url_image = await uploadFileAndGetUrl(slideData.file);
      }

      // Crear slide con la URL ya disponible
      const newSlide = await addSlide({
        ...slideData,
        url_image,
        orden: slides.length > 0 ? Math.max(...slides.map((s) => s.orden)) + 1 : 0,
      });

      // Actualizar estado local para mostrar inmediatamente
      setSlides((prev) => [...prev, newSlide]);
      setSelectedId(newSlide.id);

      Swal.fire({
        icon: "success",
        title: "¡Slide agregado!",
        timer: 1500,
        showConfirmButton: false
      });
    } catch (err) {
      console.error("Error creando slide:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "No se pudo crear el slide"
      });
    }
  };

  // Guardar cambios en un slide
  const handleSaveSlide = async (slideToSave) => {
    try {
      if (!slideToSave.id) throw new Error("ID del slide no disponible");

      await updateSlide(slideToSave.id, slideToSave);

      await reloadSlides();

      Swal.fire({
        icon: "success",
        title: "Slide guardado",
        timer: 1500,
        showConfirmButton: false
      });
    } catch (err) {
      console.error("Error guardando slide:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar el slide"
      });
    }
  };

  // Guardar orden de slides
  const handleSaveOrder = async (newSlides) => {
    try {
      await reorderSlides(newSlides);

      await reloadSlides();

      Swal.fire({
        icon: "success",
        title: "Orden guardado",
        timer: 2000,
        showConfirmButton: false
      });
    } catch (err) {
      console.error("Error guardando orden:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar el orden de los slides"
      });
    }
  };

  // Eliminar slide
  const handleDeleteSlide = async (deletedId) => {
    try {
      const result = await Swal.fire({
        title: "¿Eliminar slide?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
      });

      if (result.isConfirmed) {
        await deleteSlide(deletedId);

        await reloadSlides();

        Swal.fire({
          icon: "success",
          title: "Slide eliminado",
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (err) {
      console.error("Error eliminando slide:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar el slide"
      });
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 min-h-screen">
      <SliderList
        slides={slides}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onReorder={setSlides}
        onAddSlide={handleAddSlide}
        onSaveOrder={handleSaveOrder}
      />
      {selectedSlide && (
        <Slider_preview
          slide={selectedSlide}
          onSave={handleSaveSlide}
          onDelete={handleDeleteSlide}
        />
      )}
    </div>
  );
};

export default Slider;
