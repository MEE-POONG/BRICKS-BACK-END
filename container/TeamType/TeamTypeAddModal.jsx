import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import useAxios from "axios-hooks";
import AutoComplete from "@/components/AutoComplete";
import CardLoading from "@/components/CardChange/CardLoading";
import CardError from "@/components/CardChange/CardError";
import FormData from "form-data";
import axios from "axios";

export default function TeamTypeAddModal(props) {
  const [{ error: errorMessage, loading: TeamTypeLoading }, executeTeamType] =
    useAxios({ url: "/api/teamType", method: "POST" }, { manual: true });

  const [checkValue, setCheckValue] = useState(true);
  const [showCheck, setShowCheck] = useState(false);
  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);

  const [name, setName] = useState("");
  const [teamId, setTeamId] = useState("");

  const handleSubmit = () => {
    setCheckValue(false);
    if (name !== "") {
      handleClose();

      executeTeamType({
        data: {
          name: name,
          teamId: teamId,
        },
      }).then(() => {
        Promise.all([setName(""), setTeamId(""), props.getData()]);
      });
    }
  };

  // if (loading || ProductsLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
  // if (error || errorMessage) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

  return (
    <>
      <Button
        bsPrefix="create"
        className={showCheck ? "icon active d-flex" : "icon d-flex"}
        onClick={handleShow}
      >
        <FaPlus /> เพิ่มประเภทสิทธิ์ผู้ดูแล
      </Button>
      <Modal
        show={showCheck}
        onHide={handleClose}
        centered
        size="lg"
        className="form-Products"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">ชื่อประเภทสิทธิ์ผู้แล</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        <Form.Group className="mb-3" controlId="price">
            <Form.Label>ประเภทสิทธิ์ผู้ดูแล</Form.Label>
            <Form.Select
              onChange={(e) => {
                setTeamId(e.target.value);
              }}
              value={TeamId}
              autoComplete="off"
              isValid={checkValue === false && TeamId !== "" ? true : false}
              isInvalid={checkValue === false && TeamId === "" ? true : false}
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
            <Form.Label>ชื่อประเภทสิทธิ์ผู้ดูแล</Form.Label>
            <Form.Control
              Type="text"
              placeholder="เพิ่มชื่อประเภทสิทธิ์ผู้ดูแล"
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
