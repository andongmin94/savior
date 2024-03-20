import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

export default function LoginModal() {
  let navigate = useNavigate();
  return (
    <div className="mt-[200px]">
      <Modal.Dialog>
        <Modal.Body>
          <p>로그인이 필요한 페이지입니다.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            className="bg-[#ea580c] border-[#ea580c]"
            onClick={() => {
              navigate("/");
            }}
          >
            닫기
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}
