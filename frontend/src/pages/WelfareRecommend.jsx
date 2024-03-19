import React, { useEffect, useState } from 'react';
import Chart from '@/components/WelfareRecommend/Chart';
import LineChart from '@/components/WelfareRecommend/LineChart';
import FilterSlide from '@/components/WelfareRecommend/FilterSlide';
import RecommendSlid from '@/components/WelfareRecommend/RecommendSlide';
import ProfileCard from '@/components/WelfareRecommend/ProfileCard';
import { getAxios } from '@/api';
import Norecommend from '@/components/WelfareRecommend/Norecommend';
import LoginModal from '@/components/LoginModal';

import styled from 'styled-components';

const isLogin = () => {
  if (localStorage.getItem('token')) {
    return true;
  } else {
    return true;
  }
};

function WelfareRecommend() {
  const axios = getAxios();
  const [name, setName] = useState('User');
  const [profile, setProfile] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (isLogin()) {
      setName(localStorage.getItem('name'));
      setProfile(localStorage.getItem('profile'));
    }
  }, []);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const request = await axios.get('/api/welfare/recommend');
        // console.log(request.data.body.welfare);
        setCards(request.data.body.welfare);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCard();
  }, []);

  return isLogin() ? (
    cards.length === 0 ? (
      <Norecommend profile={profile} name={name}></Norecommend>
    ) : (
      <StyledContainer>
        <StyledTop>
          <ProfileCard profile={profile} name={name} />
          <Chart />
          <LineChart />
        </StyledTop>
        <StyledMain>
          <div>
            <h2 style={{ margin: '5% 1% -2% 0', fontWeight: '600' }}>{name}님에게 추천하는 복지</h2>
            <FilterSlide name={name} cards={cards} />
          </div>
          <RecommendSlid />
        </StyledMain>
      </StyledContainer>
    )
  ) : (
    <LoginModal />
  );
}

const StyledTop = styled.div`
  display: grid;
  grid-template-columns: 20% 30% 50%;
  justify-content: center;
  align-items: center;
  margin-top: 5vh;
  // margin-bottom: 5vh;
`;
const StyledMain = styled.div`
  display: grid;
  justify-content: center;
  // margin-bottom: 5vh;
  // margin-top: 5vh;
  grid-row-gap: 2vh;
  width: 70vw;
`;
const StyledContainer = styled.div`
  display: grid;
  justify-content: center;
  margin-top: 10vh;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
  grid-template-columns: 70vw;
  font-family: 'Pretendard';
  margin-bottom: 5vh;
`;

export default WelfareRecommend;
