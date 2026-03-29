import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import { getActiveSlides, getPublicImageUrl } from "../../../services/Slider.service";
import "./Seccion_Slider.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const Seccion_Slider = () => {
  const [slides, setSlides] = useState(() => {
    const cached = localStorage.getItem("cachedSlides");
    return cached ? JSON.parse(cached) : [];
  });

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await getActiveSlides();

        const slidesWithUrl = data.map(slide => ({
          ...slide,
          url_image: getPublicImageUrl(slide.url_image),
        }));

        localStorage.setItem("cachedSlides", JSON.stringify(slidesWithUrl));
        setSlides(slidesWithUrl);
      } catch (err) {
        console.error("Error al cargar slides:", err);
      }
    };

    fetchSlides();
  }, []);

  if (!slides.length) {
    return (
      <div className="w-full h-[600px] md:h-[85vh] bg-gray-100" />
    );
  }

  return (
    <div className="w-full h-[600px] md:h-[85vh] relative">

      <Swiper
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
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

      {/* Flechas */}
      <div ref={prevRef} className="swiper-button-prev custom-arrow">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </div>

      <div ref={nextRef} className="swiper-button-next custom-arrow">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>

    </div>
  );
};

export default Seccion_Slider;