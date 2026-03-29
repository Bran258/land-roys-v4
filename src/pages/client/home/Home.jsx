import React from 'react'
import Seccion_Slider from '../../../components/client/home/Seccion_Slider'
import Seccion_top from '../../../components/client/home/Seccion_top'
import Seccion_promociones from '../../../components/client/home/Seccion_promociones'
import Seccion_trayectoria from '../../../components/client/home/Seccion_trayectoria'
import LazyMount from '../../../components/common/LazyMount'

const SectionFallback = ({ className = 'h-[320px]' }) => (
  <div className={`w-full animate-pulse bg-gray-100 ${className}`} />
)

const Home = () => {
  return (
    <>
      <LazyMount eager fallback={<SectionFallback className="h-[600px] md:h-[85vh]" />}>
        <Seccion_Slider />
        <section className="w-full py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6">

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 items-center">

              <img
                src="./public/ZUERTS.webp"
                alt="ZUERTS"
                className="mx-auto h-24 object-contain opacity-70 hover:opacity-100 transition"
              />

              <img
                src="./public/ZKM.webp"
                alt="ZKM"
                className="mx-auto h-24 object-contain opacity-70 hover:opacity-100 transition"
              />

              <img
                src="./public/Vinto.webp"
                alt="Vinto"
                className="mx-auto h-24 object-contain opacity-70 hover:opacity-100 transition"
              />

            </div>

          </div>
        </section>
      </LazyMount>

      <LazyMount fallback={<SectionFallback className="h-[520px]" />}>
        <Seccion_top />
      </LazyMount>

      <LazyMount fallback={<SectionFallback className="h-[100vh]" />}>
        <Seccion_promociones />
      </LazyMount>

      <LazyMount fallback={<SectionFallback className="h-[260px]" />}>
        <Seccion_trayectoria />
      </LazyMount>
    </>
  )
}

export default Home
