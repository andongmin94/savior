import React, { useEffect } from 'react';
import styled from 'styled-components';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { getAxios } from '@/api';
import HtmlReactParser from 'html-react-parser';
let BoardName = styled.h1`
  text-align: center;
  margin-bottom: 3%;
`;

let QnaName = styled.div`
  width: 100%;
  margin-bottom: 2%;
`;
let WritePlace = styled.div`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15%;
  padding-bottom: 15%;
  font-family: 'Pretendard';
`;
let ButtonPlace = styled.div`
  padding-top: 3%;
  text-align: center;
`;
function isLogin() {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    return false;
  }
}
function QnaCreate(props) {
  let navigate = useNavigate();
  let state = useSelector((state) => state);
  let [title, setTitle] = useState('');
  let [content, setContent] = useState('');

  const qnaId = useParams().qnaId;
  const axios = getAxios();

  const createQna = async () => {
    if (title == '') {
      alert('제목을 입력해주세요');
    } else if (content == '') {
      alert('내용을 입력해주세요');
    } else if (title !== '' && content !== '') {
      await axios.post('/api/qna/mine', {
        title: title,
        content: content,
      });
      navigate(`/Qna`);
    }
  };
  const checkLogin = () => {
    if (!isLogin()) {
      alert('로그인해주세요');
      navigate(`/`);
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <Container>
      {isLogin() ? (
        <WritePlace>
          <BoardName>
            <strong>고객센터</strong>
            <div style={{ textAlign: 'center', fontSize: '16px', marginTop: '5px' }}>
              궁금한 점이나 문의 사항을 남겨주세요.
            </div>
          </BoardName>
          <QnaName>
            <p>제목</p>
            <input
              type="text"
              maxLength="50"
              style={{ width: '100%' }}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </QnaName>
          <p>내용</p>
          <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor) => {
              const data = editor.getData();

              setContent(data);
            }}
          />

          <ButtonPlace>
            <Link to="/Qna">
              <Button variant="secondary" size="lg">
                취소
              </Button>
            </Link>{' '}
            {/* <Link to = '/Qna'> */}
            <Button
              variant="primary"
              size="lg"
              onClick={(e) => {
                createQna();
              }}
            >
              등록
            </Button>
            {/* </Link> */}
          </ButtonPlace>
        </WritePlace>
      ) : (
        <div></div>
      )}
    </Container>
  );
}

export default QnaCreate;
