/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Modal, Button, Image, Row, Col } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import useAxios from "axios-hooks";
import CardLoading from "@/components/CardChange/CardLoading";
import CardError from "@/components/CardChange/CardError";

export default function PichomeTopDeleteModal(props) {
  const [showCheck, setShowCheck] = useState(false);
  const handleShow = () => setShowCheck(true);
  const handleClose = () => setShowCheck(false);
  const [
    { loading: deletePichomeTopLoading, error: deletePichomeTopError },
    executePichomeTopDelete,
  ] = useAxios({}, { manual: true });
  const handleDeleteData = () => {
    executePichomeTopDelete({
      url: "/api/pichomeTop/" + props?.value?.id,
      method: "DELETE",
    }).then(() => {
      Promise.all([props.getPichomeTopData()]).then(() => {
        if (deletePichomeTopLoading?.success) {
          handleClose();
        }
      });
    });
  };

  if (deletePichomeTopLoading)
    return (
      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <CardLoading />
      </Modal>
    );
  if (deletePichomeTopError)
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
          <Modal.Title className="text-center">ลบรูปภาพแบรนด์</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <Image
                src={props?.value?.image}
                width="250px"
                height="250px"
                className="object-fit-cover"
              />
            </Col>
            </Row>
            <Row>
            <Col sm={6}>
              <Modal.Title>
              ชื่อโลโก้ :{" "}
                <span className="text-danger"> {props?.value?.name}</span>
              </Modal.Title>
              <Modal.Title>
              ลิงค์โลโก้ :{" "}
                <span className="text-danger"> {props?.value?.links}</span>
              </Modal.Title>
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
      <div className="">
        <label>{label}</label>
        <input className="form-control" value={value} readonly />
      </div>
    );
  }
}
