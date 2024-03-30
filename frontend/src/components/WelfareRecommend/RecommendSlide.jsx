import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay, Navigation } from "swiper/core";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import RecommendCard from "./RecommendCard";

SwiperCore.use([Pagination, Autoplay, Navigation]);

export default function RecommendSlide() {
  const { title, content, id } = useSelector(state => state.welData);

  return (
    <div className="main-wrap">
      <h2 className="mb-[3vh] font-bold">
        지금 인기있는 복지
      </h2>
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
        <SwiperSlide className="flex justify-center">
          <RecommendCard title={title[0]} id={id[0]} content={content[0]} />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <RecommendCard title={title[1]} id={id[1]} content={content[1]} />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <RecommendCard title={title[2]} id={id[2]} content={content[2]} />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <RecommendCard title={title[3]} id={id[3]} content={content[3]} />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <RecommendCard title={title[4]} id={id[4]} content={content[4]} />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <RecommendCard title={title[5]} id={id[5]} content={content[5]} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}