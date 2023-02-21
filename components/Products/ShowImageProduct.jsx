/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Modal, Button, Image, Row, Col, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import useAxios from "axios-hooks";
import CardLoading from "@/components/CardChange/CardLoading";
import CardError from "@/components/CardChange/CardError";
import DeleteImageProduct from "./DeleteImageProduct";
export default function ShowImageProduct(props) {
  const [showCheck, setShowCheck] = useState(false);
  const handleShow = () => setShowCheck(true);
  const handleClose = () => setShowCheck(false);

  return (
    <>
      <Button
        bsPrefix="create"
        className={showCheck ? "icon active " : "icon "}
        onClick={handleShow}
      >
        จัดการรูปสินค้า
      </Button>
      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">ภาพเพิ่มเติมทั่งหมด</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>ภาพเพิ่มเติม</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>No.</th>
                <th>ภาพเพิ่มเติม</th>
                <th>จัดการ</th>
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
                  <td>
                  <DeleteImageProduct  imageId={image.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button bg="cancel" className="my-0" onClick={handleClose}>
            ปิด
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

}
