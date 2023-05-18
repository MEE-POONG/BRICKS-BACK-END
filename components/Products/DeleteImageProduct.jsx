/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Modal, Button, Image, Row, Col, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import useAxios from "axios-hooks";
import CardLoading from "@/components/CardChange/CardLoading";
import CardError from "@/components/CardChange/CardError";
export default function DeleteImageProduct(props) {
  const [showCheck, setShowCheck] = useState(false);
  const handleShow = () => setShowCheck(true);
  const handleClose = () => setShowCheck(false);
  const [
    { loading: deleteImageProductsLoading, error: deleteImageProductsError },
    executeProductsDelete,
  ] = useAxios({}, { manual: true });
  const handleDeleteData = () => {
    executeProductsDelete({
      url: "/api/imageProduct/" + props.imageId,
      method: "DELETE",
    }).then(() => {
      Promise.all([props.getImageProduct()]).then(() => {
        if (deleteImageProductsLoading?.success) {
          handleClose();
        }
      });
    });
  };

  if (deleteImageProductsLoading)
    return (
      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <CardLoading />
      </Modal>
    );
  if (deleteImageProductsError)
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
      <Modal show={showCheck} onHide={handleClose} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">ลบรายการสินค้า</Modal.Title>
        </Modal.Header>
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
