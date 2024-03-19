import React, { useEffect, useState } from 'react';
import { Container, Button, Modal } from 'react-bootstrap';
import { connect, useSelector } from 'react-redux';
import { getAxios } from '@/api';
import { useParams, Link, useNavigate } from 'react-router-dom';
import HtmlReactParser from 'html-react-parser';
import Comments from '@/components/Comments';

import styled from 'styled-components';
let 글작성틀 = styled.div`
  width: 70%;
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 5%;
  padding-bottom: 15%;
  font-family: 'Pretendard';
`;
let 게시판이름 = styled.h1`
  text-align: center;
  margin-bottom: 5%;
`;
let 제목 = styled.div`
  padding-left: 5%;
  padding-right: 5%;
`;
let 내용 = styled.div`
  background-color: #f9fafb;
  height: auto;
  padding-bottom: 5%;
  padding-top: 5%;
  padding-left: 5%;
  padding-right: 5%;
`;
let 버튼들 = styled.div`
  text-align: right;
`;
let 답변입력 = styled.textarea`
  width: 100%;
  min-height: 70px;
  resize: none;
`;
let 답변 = styled.h2`
  padding-bottom: 2%;
`;
let 답변내용 = styled.div`
    display: flex;
    width: 100%
    margin-top: 5%;
    margin-bottom: 5%;

`;
let 답변들 = styled.div`
    
    width: 100%
    margin-top: 5%;
    margin-bottom: 5%;
`;
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
        <글작성틀>
          <게시판이름>
            <strong>고객센터</strong>
            <div style={{ textAlign: 'center', fontSize: '16px', marginTop: '5px' }}>
              궁금한 점이나 문의 사항을 남겨주세요.
            </div>
          </게시판이름>

          <버튼들>
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
          </버튼들>
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

          <제목>{qna.title}</제목>
          <hr></hr>

          <내용>{HtmlReactParser(qna.content)}</내용>
          <hr></hr>
          <답변>답변</답변>
          <답변내용>
            <답변입력
              value={댓글}
              onChange={(e) => {
                댓글값변경(e.target.value);
              }}
            ></답변입력>
            <Button
              variant="dark"
              size="sm"
              onClick={(e) => {
                createComment();
              }}
            >
              등록
            </Button>
          </답변내용>
          <답변들>
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
          </답변들>

          <버튼들>
            <Link to="/Qna">
              <Button variant="secondary" size="sm">
                목록
              </Button>
            </Link>
          </버튼들>
        </글작성틀>
      ) : (
        <div></div>
      )}
    </Container>
  );
}
export default QnaDetail;
