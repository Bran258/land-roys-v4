import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { getActiveSlides, getPublicImageUrl } from "../../../services/Slider.service";
import "./Seccion_Slider.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Seccion_Slider = () => {
  // Usamos cache para mejorar rendimiento en visitas repetidas
  const [slides, setSlides] = useState(() => {
    const cached = localStorage.getItem("cachedSlides");
    return cached ? JSON.parse(cached) : [];
  });

  // Cargar slides al inicio
  useEffect(() => {
    // Si ya tenemos slides en cache, no hacemos fetch
    const fetchSlides = async () => {
      try {
        const data = await getActiveSlides();
        // Transformar url_image para que sean URLs públicas
        const slidesWithUrl = data.map(slide => ({
          ...slide,
          url_image: getPublicImageUrl(slide.url_image)
        }));

        // Guardamos en cache
        localStorage.setItem("cachedSlides", JSON.stringify(slidesWithUrl));
        // Actualizamos estado
        setSlides(slidesWithUrl);
      } catch (err) {
        console.error("Error al cargar slides:", err);
      }
    };

    fetchSlides();
  }, []);
  // Si no hay slides, mostramos un placeholder o nada
  if (!slides.length) {
    return (
      <div className="w-full h-[600px] md:h-[85vh] bg-gray-100 " />
    );
  }

  return (
      <div className="w-full h-[600px] md:h-[85vh] mb-5 shadow-[0_30px_8px_-20px_rgba(0,0,0,0.60)]">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <img
              src={slide.url_image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              decoding="async"
              width="1667"
              height="787"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Seccion_Slider;