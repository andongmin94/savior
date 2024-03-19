import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay, Navigation } from "swiper/core";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import RecommendCard from "./RecommendCard";
import { useSelector } from "react-redux";

SwiperCore.use([Pagination, Autoplay, Navigation]);

function RecommendSlide() {
  const { title, content, id } = useSelector(state => state.welData);

  return (
    <div className="main-wrap">
      <h2 style={{ marginBottom: "3vh", fontWeight: "600" }}>
        지금 인기있는 복지
      </h2>
      <Swiper
        style={{
          width: "70vw",
          height: "40vh",
          borderRadius: "12px",
        }}
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
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <RecommendCard
            style={{
              alignItems: "center",
              border: "1px solid",
            }}
            title={title[0]}
            id={id[0]}
            content={content[0]}
          />
        </SwiperSlide>
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <RecommendCard title={title[1]} id={id[1]} content={content[1]} />
        </SwiperSlide>
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <RecommendCard title={title[2]} id={id[2]} content={content[2]} />
        </SwiperSlide>
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <RecommendCard title={title[3]} id={id[3]} content={content[3]} />
        </SwiperSlide>
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <RecommendCard title={title[4]} id={id[4]} content={content[4]} />
        </SwiperSlide>
        <SwiperSlide
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <RecommendCard title={title[5]} id={id[5]} content={content[5]} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
export default RecommendSlide;
