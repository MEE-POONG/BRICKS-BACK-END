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
    { loading: deleteProductsLoading, error: deleteProductsError },
    executeProductsDelete,
  ] = useAxios({}, { manual: true });
  const handleDeleteData = () => {
    executeProductsDelete({
      url: "/api/products/" + props?.value?.id,
      method: "DELETE",
    }).then(() => {
      Promise.all([props.getData()]).then(() => {
        if (deleteProductsLoading?.success) {
          handleClose();
        }
      });
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
      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">ลบรายการสินค้า</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>ภาพเพิ่มเติม</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th>ชื่อสินค้า</th>
                <th>จำนวนสินค้า</th>
                <th>ราคารวม</th>
              </tr>
            </thead>
            <tbody>
              {props?.value?.imageProduct?.map((image, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Image
                      src={image.image}
                      width="150px"
                      height="150px"
                      className="object-fit-cover"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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
