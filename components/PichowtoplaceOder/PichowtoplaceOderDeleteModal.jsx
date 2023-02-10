/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Modal, Button, Image, Row, Col } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import useAxios from "axios-hooks";
import CardLoading from "@/components/CardChange/CardLoading";
import CardError from "@/components/CardChange/CardError";

export default function PichowtoplaceOderDeleteModal(props) {
  const [showCheck, setShowCheck] = useState(false);
  const handleShow = () => setShowCheck(true);
  const handleClose = () => setShowCheck(false);
  const [
    {
      loading: deletePichowtoplaceOderLoading,
      error: deletePichowtoplaceOderError,
    },
    executePichowtoplaceOderDelete,
  ] = useAxios({}, { manual: true });
  const handleDeleteData = () => {
    executePichowtoplaceOderDelete({
      url: "/api/pichowtoplaceOder/" + props?.value?.id,
      method: "DELETE",
    }).then(() => {
      Promise.all([props.getPichowtoplaceOder()]).then(() => {
        if (deletePichowtoplaceOderLoading?.success) {
          handleClose();
        }
      });
    });
  };

  if (deletePichowtoplaceOderLoading)
    return (
      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <CardLoading />
      </Modal>
    );
  if (deletePichowtoplaceOderError)
    return (
      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <CardError />
      </Modal>
    );

  return (
    <>
      <Button
        bsPrefix="delete"
        className={showCheck ? "icon active" : "icon"}
        onClick={handleShow}
      >
        <FaTrash />
      </Button>
      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            ลบรายการรูปวิธีการสั่งซื้อ
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={4}>
              <Image
                src={props?.value?.image}
                width="250px"
                height="250px"
                className="object-fit-cover"
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button bg="cancel" className="my-0" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button
            bg="danger"
            className="my-0 btn-danger"
            onClick={handleDeleteData}
          >
            ยืนยันการลบ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  function DeleteFunction(label, value) {
    return (
      <div class="">
        <label>{label}</label>
        <input class="form-control" value={value} readonly />
      </div>
    );
  }
}
