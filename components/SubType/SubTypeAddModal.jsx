import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import useAxios from "axios-hooks";
import AutoComplete from "@/components/AutoComplete";
import CardLoading from "@/components/CardChange/CardLoading";
import CardError from "@/components/CardChange/CardError";
import FormData from "form-data";
import axios from "axios";

export default function ProductsSubTypeAddModal(props) {
  const [{ error: errorMessage, loading: SubTypeLoading }, executeSubType] =
    useAxios({ url: "/api/subType", method: "POST" }, { manual: true });

  const [checkValue, setCheckValue] = useState(true);
  const [showCheck, setShowCheck] = useState(false);
  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);

  const [name, setName] = useState("");
  const [TypeId, setTypeId] = useState("");

  const handleSubmit = () => {
    setCheckValue(false);
    if (name !== "") {
      handleClose();

      executeSubType({
        data: {
          name: name,
          TypeId: TypeId,
        },
      }).then(() => {
        Promise.all([setName(""), setTypeId(""), props.getData()]);
      });
    }
  };

  if (SubTypeLoading)
  return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
  if (errorMessage)
  return (
    <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>
  );
  return (
    <>
      <Button
        bsPrefix="create"
        className={showCheck ? "icon active d-flex" : "icon d-flex"}
        onClick={handleShow}
      >
        <FaPlus /> เพิ่มประเภทย่อยสินค้า
      </Button>
      <Modal
        show={showCheck}
        onHide={handleClose}
        centered
        size="lg"
        className="form-Products"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">ชื่อประเภทย่อยสินค้า</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        <Form.Group className="mb-3" controlId="price">
            <Form.Label>ประเภทสินค้า</Form.Label>
            <Form.Select
              onChange={(e) => {
                setTypeId(e.target.value);
              }}
              value={TypeId}
              autoComplete="off"
              isValid={checkValue === false && TypeId !== "" ? true : false}
              isInvalid={checkValue === false && TypeId === "" ? true : false}
            >
              <option value="">ประเภทสินค้า</option>
              {props?.getTypeData?.map((TypeData, index) => (
                <option key={index} value={TypeData.id}>
                  {TypeData.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>ชื่อประเภทย่อยสินค้า</Form.Label>
            <Form.Control
              Type="text"
              placeholder="เพิ่มชื่อประเภทย่อยสินค้า"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              autoComplete="off"
              isValid={checkValue === false && name !== "" ? true : false}
              isInvalid={checkValue === false && name === "" ? true : false}
            />
          </Form.Group>


        </Modal.Body>
        <Modal.Footer>
          <Button bg="danger"className="my-0 btn-danger" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button bg="succeed" className="my-0" onClick={handleSubmit}>
            ยืนยันการเพิ่ม
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
