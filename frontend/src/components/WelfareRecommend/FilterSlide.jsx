import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay, Navigation } from 'swiper/core';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import FilterCard from '@/components/WelfareRecommend/FilterCard';
import styled from 'styled-components';

SwiperCore.use([Pagination, Autoplay, Navigation]);

function FilterSlide(props) {
  return (
    <StyledBox className="main-wrap">
      {/* <h2 style={{ marginLeft: '60px', marginBottom: '3vh', fontWeight: '600' }}>
        {props.name}님에게 추천하는 복지
      </h2> */}
      <Swiper
        style={{
          width: '70vw',
          height: '40vh',
          borderRadius: '12px',
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
        {props.cards.map((card) => (
          <SwiperSlide
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
            key={card.welfareId}
          >
            <FilterCard
              style={{
                alignItems: 'center',
              }}
              name={card.welfare_service_name}
              content={card.welfare_service_content}
              id={card.welfareId}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledBox>
  );
}
const StyledBox = styled.div`
  box-sizing: border-box;
  margin-bottom: 5vh;
  margin-top: 5vh;
`;
export default FilterSlide;
