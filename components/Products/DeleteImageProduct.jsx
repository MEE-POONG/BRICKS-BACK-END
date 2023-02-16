/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Modal, Button, Image, Row, Col, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import useAxios from "axios-hooks";
import CardLoading from "@/components/CardChange/CardLoading";
import CardError from "@/components/CardChange/CardError";
export default function DeleteImageProduct(props) {
  console.log(props);
  const [showCheck, setShowCheck] = useState(false);
  const handleShow = () => setShowCheck(true);
  const handleClose = () => setShowCheck(false);
  const [
    { loading: deleteProductsLoading, error: deleteProductsError },
    executeProductsDelete,
  ] = useAxios({}, { manual: true });
  const handleDeleteData = () => {
    executeProductsDelete({
      url: "/api/imageProduct/" + props.imageId,
      method: "DELETE",
    }).then(() => {
        if (deleteProductsLoading?.success) {
          handleClose();
        }
    });
  };

  if (deleteProductsLoading)
    return (
      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <CardLoading />
      </Modal>
    );
  if (deleteProductsError)
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
      <div class="">
        <label>{label}</label>
        <input class="form-control" value={value} readonly />
      </div>
    );
  }
}
