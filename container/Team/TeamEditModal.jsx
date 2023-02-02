import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import useAxios from "axios-hooks";
import AutoComplete from "@/components/AutoComplete";
import CardError from "@/components/CardChange/CardError";
import ModelLoading from "@/components/ModelChange/ModelLoading";
import ModelError from "@/components/ModelChange/ModelError";
import FormData from "form-data";
import { CKEditor } from "ckeditor4-react";

export default function TeamEditModal(props) {
  const [
    { loading: updateSubTypeLoading, error: updateSubTypeError },
    executeSubTypePut,
  ] = useAxios({}, { manual: true });

  const [checkValue, setCheckValue] = useState(true);
  const [showCheck, setShowCheck] = useState(false);
  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);

  const [name, setName] = useState("");
  const [TypeId, setTypeId] = useState("");

  useEffect(() => {
    if (props) {

      setName(props?.value?.name);
      setTypeId(props?.value?.TypeId);
    }
  }, [props]);

  const handlePutData = () => {
    setCheckValue(false);
    if (name !== "") {
      executeSubTypePut({
        url: "/api/subType/" + props?.value?.id,
        method: "PUT",
        data: {
          name: name,
          TypeId: TypeId,
        },
      }).then(() => {
        Promise.all([setName(""), setTypeId(""), props.getData()]).then(() => {
          if (updateSubTypeLoading?.success) {
            handleClose();
          }
        });
      });
    }
  };

  if (updateSubTypeLoading) return <ModelLoading showCheck={showCheck} />;
  if (updateSubTypeError)
    return (
      <ModelError show={showCheck} fnShow={handleClose} centered size="lg" />
    );

  return (
    <>
      <Button
        bsPrefix="edit"
        className={showCheck ? "icon active" : "icon"}
        onClick={handleShow}
      >
        <FaEdit />
      </Button>

      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">แก้ไขประเภทย่อยสินค้า</Modal.Title>
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
              placeholder="แก้ไขประเภทย่อยสินค้า"
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
          <Button bg="danger" className="my-0 btn-danger" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button bg="succeed" className="my-0"  onClick={handlePutData}>
            ยืนยันการแก้ไข
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
