import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { getAxios } from "@/api";

export default function DeleteAccount() {
  let navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [showDone, setShowDone] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getDelete = async () => {
    try {
      const axios = getAxios();
      let res = await axios.delete("/api/users/delete");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button
        variant="danger"
        className="w-[100px]"
        onClick={() => {
          handleShow();
        }}
      >
        회원탈퇴
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>회원탈퇴</Modal.Title>
        </Modal.Header>
        <Modal.Body>회원탈퇴 하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button
            className="bg-blue-700 border-none"
            onClick={() => {
              handleClose();
              getDelete();
              setShowDone(true);
              localStorage.removeItem("token");
            }}
          >
            탈퇴
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDone}>
        <Modal.Body>탈퇴가 완료되었습니다.</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowDone(false);
              navigate("/", { replace: true });
            }}
          >
            메인으로 가기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
