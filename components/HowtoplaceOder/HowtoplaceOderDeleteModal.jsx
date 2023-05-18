/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Modal, Button, Image, Row, Col } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import useAxios from "axios-hooks";
import CardLoading from "@/components/CardChange/CardLoading";
import CardError from "@/components/CardChange/CardError";

export default function HowtoplaceOderDeleteModal(props) {
  const [showCheck, setShowCheck] = useState(false);
  const handleShow = () => setShowCheck(true);
  const handleClose = () => setShowCheck(false);
  const [
    {
      loading: deleteHowtoplaceOderLoading,
      error: deleteHowtoplaceOderError,
    },
    executeHowtoplaceOderDelete,
  ] = useAxios({}, { manual: true });
  const handleDeleteData = () => {
    executeHowtoplaceOderDelete({
      url: "/api/howtoplaceOder/" + props?.value?.id,
      method: "DELETE",
    }).then(() => {
      Promise.all([props.getHowtoplaceOder()]).then(() => {
        if (deleteHowtoplaceOderLoading?.success) {
          handleClose();
        }
      });
    });
  };

  if (deleteHowtoplaceOderLoading)
    return (
      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <CardLoading />
      </Modal>
    );
  if (deleteHowtoplaceOderError)
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
            ลบรายการวิธีการสั่งซื้อ
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
          <Modal.Title>ชื่อหัวข้อขั้นตอน <span className='text-danger'> {props?.value?.steps}</span></Modal.Title>
          <Modal.Title>รายละเอียดขั้นตอน : <span className='text-danger'><div dangerouslySetInnerHTML={{ __html: props?.value?.substeps}} /></span></Modal.Title>
        
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
      <div className="">
        <label>{label}</label>
        <input className="form-control" value={value} readonly />
      </div>
    );
  }
}
