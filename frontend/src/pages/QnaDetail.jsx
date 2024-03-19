import React, { useEffect, useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';
import { getAxios } from '@/api';
import { useParams, Link, useNavigate } from 'react-router-dom';
import HtmlReactParser from 'html-react-parser';
import Comments from '@/components/Comments';

function isLogin() {
  const token = localStorage.getItem('token');
  if (token) {
    return true;
  } else {
    return false;
  }
}
function QnaDetail(props) {
  let navigate = useNavigate();
  let state = useSelector((state) => state);
  const qnaId = useParams().qnaId;

  const [댓글, 댓글값변경] = useState('');
  const [댓글들, 댓글들변경] = useState([]);
  const [new댓글, new댓글값변경] = useState('');
  const [new댓글들, new댓글들변경] = useState([]);
  // const [editable, setEditable] = useState(false);
  const [show, setShow] = useState(false);
  const [showDone, setShowDone] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editable, setEditable] = useState('false');
  const [check, setCheck] = useState(false);
  const [qna, setQna] = useState({});
  const axios = getAxios();

  const deleteQna = async () => {
    await axios.delete(`/api/qna/mine/${qnaId}`);
    navigate(`/Qna/`);
  };
  const createComment = () => {
    if (댓글 == '') {
      alert('댓글을 입력하세요');
    } else if (댓글 !== '') {
      axios.post(`/api/comment/${qnaId}?content=${댓글}`, {
          // comment_content: 댓글,
        })
        .then((res) => {
          댓글값변경('');
          getComment();
        });
    }
  };
  const updateComment = (Id) => {
    axios.patch(`/api/comment/${Id}`, {
      comment_content: 댓글,
    });
    댓글값변경(댓글);
  };
  const getComment = () => {
    axios
      .get(`/api/qna/mine/${qnaId}`)
      .then((res) => {
        setCheck(true);
        setQna(res.data.body.success);
        댓글들변경(res.data.body.success.comments);
        // console.log(res)
      })
      .catch((err) => {
        alert('잘못된 접근입니다');
        navigate('/');
        // console.log(err);
      });
  };
  const checkLogin = () => {
    if (!isLogin()) {
      alert('로그인해주세요');
      navigate(`/`);
    } else {
      getComment();
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <Container style={{ marginBottom: '2vh' }}>
      {isLogin() && check ? (
        <div className="mx-auto" style={{ width: '70%', marginTop: '10%', paddingTop: '5%', paddingBottom: '15%' }}>
          <div className='text-center' style={{marginBottom:'5%'}}>
            <strong>고객센터</strong>
            <div style={{ textAlign: 'center', fontSize: '16px', marginTop: '5px' }}>
              궁금한 점이나 문의 사항을 남겨주세요.
            </div>
          </div>

          <div className='text-right'>
            <Button
              variant="secondary"
              size="sm"
              onClick={(e) => {
                navigate(`/QnaPatch/${qnaId}`);
              }}
            >
              수정
            </Button>{' '}
            <Button
              variant="danger"
              size="sm"
              onClick={(e) => {
                // deleteQna();
                handleShow();
              }}
            >
              삭제
            </Button>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>글 삭제</Modal.Title>
            </Modal.Header>
            <Modal.Body>글삭제 하시겠습니까?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={() => {
                  handleClose();
                  deleteQna();
                  setShowDone(true);
                }}
              >
                삭제
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                취소
              </Button>
            </Modal.Footer>
          </Modal>
          <hr></hr>

          <div style={{ paddingLeft: '5%', paddingRight: '5%' }}>{qna.title}</div>
          <hr></hr>

          <div style={{ backgroundColor: '#f9fafb', paddingBottom: '5%', paddingTop: '5%', paddingLeft: '5%', paddingRight: '5%' }}>{HtmlReactParser(qna.content)}</div>
          <hr></hr>
          <h2 style={{paddingBottom: '2%'}}>답변</h2>
          <div className='flex w-full' style={{ marginTop: '5%', marginBottom: '5%' }}>
            <textarea
              className='w-full resize-none'
              style={{ width: '100%', minHeight: '70px', resize: 'none' }}
              value={댓글}
              onChange={(e) => {
                댓글값변경(e.target.value);
              }}
            />
            <Button
              variant="dark"
              size="sm"
              onClick={(e) => {
                createComment();
              }}
            >
              등록
            </Button>
          </div>
          <div className='w-full' style={{ width: '100%', marginTop: '5%', marginBottom: '5%' }}>
            {댓글들.map((a) => {
              return (
                <Comments
                  key={a.comment_id}
                  id={a.comment_id}
                  content={a.comment_content}
                  name={a.name}
                  getDate={a.comment_updated_at}
                  checkDate={a.comment_created_at}
                  getComment={getComment}
                />
              );
            })}
          </div>

          <div className='text-right'>
            <Link to="/Qna">
              <Button variant="secondary" size="sm">
                목록
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </Container>
  );
}
export default QnaDetail;
