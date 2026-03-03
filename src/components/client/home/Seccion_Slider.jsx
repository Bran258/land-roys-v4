import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Seccion_Slider = ({ slidesData = [] }) => {
  if (!slidesData.length) return null;

  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectFade]}
      effect="fade"
      speed={1000}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="h-[600px] md:h-[85vh] w-full"
    >
      {slidesData.map(slide => (
        <SwiperSlide key={slide.id}>
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.url_image})` }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Seccion_Slider;
