import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router";
import BookDetail from "./BookDetail";

const BookDetailModal = ({ ...props }) => {
  const { bookId } = props;
  const [show, setShow] = useState(true);

  let history = useHistory();

  const handleOnHide = () => {
    setShow(false);
  };

  const handleOnExited = () => {
    history.push('/');
  };

  return (
    <Modal id="book-detail-modal" show={ show } fullscreen onHide={ handleOnHide } onExited={ handleOnExited }>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <BookDetail bookId={ bookId } />
      </Modal.Body>
    </Modal>
  );
}

export default BookDetailModal;
