import { Component, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getAxios } from '@/api';
import HtmlReactParser from 'html-react-parser';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function isLogin() {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    return false;
  }
}
function QnaPatch(props) {
  let navigate = useNavigate();
  let state = useSelector((state) => state);
  let [제목, 제목값변경] = useState('');
  let [내용, 내용값변경] = useState('');
  let dispatch = useDispatch();
  const qnaId = useParams().qnaId;
  const [qna, setQna] = useState({});

  const axios = getAxios();
  const getQna = () => {
    axios
      .get(`/api/qna/mine/${qnaId}`)
      .then((res) => {
        제목값변경(res.data.body.success.title);
        내용값변경(res.data.body.success.content);
      })
      .catch((err) => console.log(err));
  };
  const patchQna = () => {
    axios.patch(`/api/qna/mine/${qnaId}`, {
      title: 제목,
      content: 내용,
    });
    navigate(`/QnaDetail/${qnaId}`);
  };
  const checkLogin = () => {
    if (!isLogin()) {
      alert('로그인해주세요');
      navigate(`/`);
    } else {
      getQna();
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <Container>
      {isLogin() ? (
        <div className="mx-auto" style={{ width: '70%', marginTop: '15%', paddingBottom: '15%'}}>
          <h1 className='text-center' style={{marginBottom:'5%'}}>
            <strong>고객센터</strong>
            <div style={{ textAlign: 'center', fontSize: '16px', marginTop: '5px' }}>
              궁금한 점이나 문의 사항을 남겨주세요.
            </div>
          </h1>
          <div className='w-full' style={{marginBottom:'2%'}}>
            <p>제목</p>
            {/* value={qna.title || ""} */}

            <input
              type="text"
              maxLength="50"
              style={{ width: '100%' }}
              value={제목 || ''}
              onChange={(e) => {
                제목값변경(e.target.value);
              }}
            />
          </div>
          <p>내용</p>
          <CKEditor
            editor={ClassicEditor}
            data={내용 || ''}
            onChange={(event, editor) => {
              const data = editor.getData();

              내용값변경(data);
            }}
          />

          <div className="text-center" style={{ paddingTop: '3%'}}>
            <Link to="/Qna">
              <Button variant="secondary" size="lg">
                취소
              </Button>
            </Link>{' '}
            <Button
              variant="primary"
              size="lg"
              onClick={(e) => {
                patchQna();
              }}
            >
              등록
            </Button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </Container>
  );
}
export default QnaPatch;
