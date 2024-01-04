import React, { useState } from 'react';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import './swiper.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const YachtCard = React.lazy(() => import('./YachtCard'));
function YachtSwiper() {
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  const { yachts } = useSelector((state) => state.yacht);

  window.addEventListener('resize', () => {
    setWidthScreen(window.innerWidth);
  });

  return (
    <Swiper
      slidesPerView={widthScreen > 799 ? 3 : 1}
      spaceBetween={30}
      slidesPerGroup={widthScreen > 799 ? 3 : 1}
      loop
      loopFillGroupWithBlank
      pagination={{
        clickable: true,
      }}
      navigation
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      { yachts.map((yacht) => (
        <SwiperSlide key={yacht.id}>
          <YachtCard yacht={yacht} imageUrl={yacht.image_url} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
export default YachtSwiper;
