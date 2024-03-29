import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Container } from 'react-bootstrap';
import HtmlReactParser from 'html-react-parser';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { getAxios } from '@/api';

function isLogin() {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    return true;
  }
}

export default function QnaCreate(props) {
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
        <div className="mx-auto w-[70%] mt-[15%] pb-[15%]">
          <div className='text-center mb-[3%]'>
            <strong>고객센터</strong>
            <div className='text-center text-[16px] mt-[5px]'>
              궁금한 점이나 문의 사항을 남겨주세요.
            </div>
          </div>
          <div className='w-full mb-[2%]'>
            <p>제목</p>
            <input
              type="text"
              maxLength="50"
              className='w-full border-[1px] border-solid border-[#cccccc] p-[10px]'
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <p>내용</p>
          <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
          />

          <div className='py-10 text-center'>
            <Link to="/Qna">
              <Button
                className='bg-gray-500 border-gray-500'
                variant="danger"
                size="lg">
                취소
              </Button>
            </Link>{' '}
            {/* <Link to = '/Qna'> */}
            <Button
              className='bg-[#ea580c] border-[#ea580c]'
              size="lg"
              variant="danger"
              onClick={(e) => {
                createQna();
              }}
            >
              등록
            </Button>
            {/* </Link> */}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </Container>
  );
}
