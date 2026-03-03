import React, { useEffect, useState } from 'react'
import Seccion_Slider from '../../../components/client/home/Seccion_Slider'
import Seccion_top from '../../../components/client/home/Seccion_top'
import Seccion_promociones from '../../../components/client/home/Seccion_promociones'
import Seccion_trayectoria from '../../../components/client/home/Seccion_trayectoria'
import { getSlides, getPublicImageUrl } from '../../../services/Slider.service'
import { getRankingHomePublic } from '../../../services/rankingHome.service'
import { getOfertasPublicas } from '../../../services/ofertas.public.service'


const Home = () => {
  const [homeData, setHomeData] = useState({
    slides: null,
    ranking: null,
    oferta: null,
  })

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [slidesResponse, rankingResponse, ofertasResponse] = await Promise.all([
          getSlides(),
          getRankingHomePublic(),
          getOfertasPublicas(),
        ])

        const slides = slidesResponse.map((slide) => ({
          ...slide,
          url_image: getPublicImageUrl(slide.url_image),
        }))

        setHomeData({
          slides,
          ranking: rankingResponse,
          oferta: ofertasResponse?.[0] || null,
        })
      } catch (error) {
        console.error('Error cargando datos del home:', error)
      }
    }

    fetchHomeData()
  }, [])

  return (
    <>
      <Seccion_Slider slidesData={homeData.slides} />

      <Seccion_top rankingData={homeData.ranking} />

      <Seccion_promociones ofertaData={homeData.oferta} />

      <Seccion_trayectoria/>
    </>
  )
}

export default Home
