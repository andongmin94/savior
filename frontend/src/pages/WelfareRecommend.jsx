import React, { useEffect, useState } from 'react';
import Chart from '@/components/WelfareRecommend/Chart';
import LineChart from '@/components/WelfareRecommend/LineChart';
import FilterSlide from '@/components/WelfareRecommend/FilterSlide';
import RecommendSlid from '@/components/WelfareRecommend/RecommendSlide';
import ProfileCard from '@/components/WelfareRecommend/ProfileCard';
import { getAxios } from '@/api';
import Norecommend from '@/components/WelfareRecommend/Norecommend';
import LoginModal from '@/components/LoginModal';

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
      <div className="grid justify-center mx-auto" style={{ marginTop: '10vh', marginBottom: '5vh', gridColumn: '70vw' }}>
        <div className="grid justify-center items-center" style={{ gridTemplateColumns: '20% 30% 50%', marginTop: '5vh' }}>
          <ProfileCard profile={profile} name={name} />
          <Chart />
          <LineChart />
        </div>
        <div className="gap-y-2vw w-70vw" style={{ gridRowGap: '2vh', width: '70vw' }}>
          <div>
            <h2 style={{ margin: '5% 1% -2% 0', fontWeight: '600' }}>{name}님에게 추천하는 복지</h2>
            <FilterSlide name={name} cards={cards} />
          </div>
          <RecommendSlid />
        </div>
      </div>
    )
  ) : (
    <LoginModal />
  );
}

export default WelfareRecommend;
