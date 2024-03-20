import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay, Navigation } from 'swiper/core';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import FilterCard from '@/components/WelfareRecommend/FilterCard';

SwiperCore.use([Pagination, Autoplay, Navigation]);

export default function FilterSlide(props) {
  return (
    <div className="box-border mb-[5vh] mt-[5vh">
      <Swiper
        className="w-[70vw] h-[40vh] rounded-[12px]"
        spaceBetween={20}
        slidesPerView={4}
        slidesPerGroup={4}
        initialSlide={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        loop
        autoplay={{ delay: 5000 }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
      >
        {props.cards.map((card) => (
          <SwiperSlide
            className="flex justify-center"
            key={card.welfareId}
          >
            <FilterCard
              className="items-center"
              name={card.welfare_service_name}
              content={card.welfare_service_content}
              id={card.welfareId}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}