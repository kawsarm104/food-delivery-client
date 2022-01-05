import React, { useEffect, useState } from 'react';
import { ButtonGroup, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, deleteorders } from '../../../redux/slices/cartSlice';
import './MyOrder.css';

const MyOrder = (props) => {
  const { _id, name, email, ordereditemname, address, phone, status } =
    props.userData;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  // const { order } = useSelector((state) => state);
  // const dispatch = useDispatch();
  // const { orders } = order;
  // useEffect(() => {
  //   getTodos(dispatch);
  // }, []);

  const handleDelete = (_id) => {
    deleteorders(_id, dispatch);
  };

  return (
    <>
      <tr>
        <th scope="row">{props.index + 1}</th>

        <td>{name}</td>
        <td>{email}</td>
        <td>{ordereditemname}</td>
        <td>{address}</td>
        <td>{phone}</td>

        <td>
          <button
            onClick={handleShow}
            className="delete-btn btn btn-outline-danger border-0 "
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            <i className="far fa-trash-alt "></i>
          </button>
        </td>
        <td>
          <span className="badge rounded-pill bg-info text-dark">{status}</span>
        </td>
      </tr>

      {/* //  Modal  */}

      <Modal
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure , you want to delete?</Modal.Body>
        <Modal.Footer>
          <ButtonGroup variant="secondary" onClick={handleClose}>
            Cancel
          </ButtonGroup>
          <Button
            variant="primary"
            onClick={() => dispatch(deleteOrder(props.userData))}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyOrder;
