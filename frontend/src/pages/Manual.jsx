import styled from 'styled-components';

function Manual() {
  const text = 'text';
  return (
    <StyledContainer>
      <StyledOneContentBox>
        <div className="text-area" style={{ width: '50vw' }}>
          <StyledLeftTextArea>
            <h4>
              <strong>'세이비어'는 회원가입 이후 사용하실 수 있습니다.</strong>
            </h4>
            <h6>메인 페이지에서 '10초만에 가입' 버튼을 눌러 가입을 완료해주세요.</h6>
          </StyledLeftTextArea>
        </div>
        <div className="img-area" style={{ width: '50vw' }}>
          <img src="/site-manual/example.png" alt="manual-image" width="100%" />
        </div>
      </StyledOneContentBox>
      <StyledTwoContentBox>
        <div className="text-area" style={{ width: '100vw' }}>
          <StyledTwoTextArea>
            <h4>
              <strong>회원가입 이후 정보 입력을 완료해주세요.</strong>
            </h4>
            <h6>
              회원 정보를 자세히 입력하면 나에게 딱 맞는 맞춤 복지 혜택을 안내받을 수 있습니다.
              <br />
              '정보 입력하기' 버튼을 눌러 입력을 완료해주세요.
            </h6>
          </StyledTwoTextArea>
        </div>
        <StyledImgArea>
          <div className="img-area" style={{ width: '50vw' }}>
            <img src="/site-manual/example.png" alt="manual-image" width="100%" />
          </div>
          <div className="img-area" style={{ width: '50vw' }}>
            <img src="/site-manual/example.png" alt="manual-image" width="100%" />
          </div>
        </StyledImgArea>
      </StyledTwoContentBox>
      <StyledOneContentBox>
        <div className="img-area" style={{ width: '50vw' }}>
          <img src="/site-manual/example.png" alt="manual-image" width="100%" />
        </div>
        <div className="text-area" style={{ width: '50vw' }}>
          <StyledTextArea>
            <h4>
              <strong>사용자 맞춤 복지 혜택을 찾아보세요.</strong>
            </h4>
            <h6>내가 받을 수 있는 지원 유형들과 다른 사용자가 많이 열람한 복지를 안내받으세요.</h6>
          </StyledTextArea>
        </div>
      </StyledOneContentBox>
      <StyledTwoContentBox>
        <div className="text-area" style={{ width: '60vw' }}>
          <StyledThreeTextArea>
            <h4>
              <strong>마음에 드는 복지를 찜하고, 사용한 복지를 체크하세요.</strong>
            </h4>
            <h6>
              맞춤 복지 혜택 중 이용하고 싶은 복지가 있다면 별 버튼을 클릭하여 찜해보세요.
              <br />
              또한 사용 중인 복지를 북마크 버튼을 클릭하여 관리하세요. <br />
              찜한 복지와 사용 중인 복지는 '내 정보' 페이지에서 확인할 수 있습니다.
            </h6>
          </StyledThreeTextArea>
        </div>
        <StyledImgArea>
          <div className="img-area" style={{ width: '50vw' }}>
            <img src="/site-manual/example.png" alt="manual-image" width="100%" />
          </div>
          <div className="img-area" style={{ width: '50vw' }}>
            <img src="/site-manual/example.png" alt="manual-image" width="100%" />
          </div>
        </StyledImgArea>
      </StyledTwoContentBox>

      <StyledOneContentBox>
        <div className="text-area" style={{ width: '50vw' }}>
          <StyledLeftTextArea>
            <h4>
              <strong>관심 있는 복지와 유사한 복지도 확인해보세요.</strong>
            </h4>
            <h6>
              복지서비스 상세 페이지에서 해당 복지와 유사한 복지도 안내해드립니다.
              <br />
              '상세보기'를 눌러 자세한 내용을 확인할 수 있습니다.
            </h6>
          </StyledLeftTextArea>
        </div>
        <div className="img-area" style={{ width: '50vw' }}>
          <img src="/site-manual/example.png" alt="manual-image" width="100%" />
        </div>
      </StyledOneContentBox>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: grid;
  margin-top: 90px;
  width: 100vw;
  height: 350vh;
  // background-image: url('/background/bg-orange.svg');
`;

const StyledOneContentBox = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
`;

const StyledTwoContentBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
`;

const StyledTwoTextArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 35vw;
`;

const StyledThreeTextArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 15vw;
`;

const StyledTextArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 5vw;
`;

const StyledLeftTextArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 12vw;
`;

const StyledImgArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;

export default Manual;
