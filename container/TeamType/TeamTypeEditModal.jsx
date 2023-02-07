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
import CardLoading from "@/components/CardChange/CardLoading";

export default function TeamTypeEditModal(props) {
  const [
    { loading: updateTeamTypeLoading, error: updateTeamTypeError },
    executeTeamTypePut,
  ] = useAxios({}, { manual: true });

  const [checkValue, setCheckValue] = useState(true);
  const [showCheck, setShowCheck] = useState(false);
  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);

  const [name, setName] = useState("");
  const [teamTypeId, setTeamTypeId] = useState("");

  useEffect(() => {
    if (props) {

      setName(props?.value?.name);
      setTeamTypeId(props?.value?.TeamTypeId);
    }
  }, [props]);

  const handlePutData = () => {
    setCheckValue(false);
    if (name !== "") {
      executeTeamTypePut({
        url: "/api/teamType/" + props?.value?.id,
        method: "PUT",
        data: {
          name: name,
          teamTypeId: teamTypeId,
        },
      }).then(() => {
        Promise.all([setName(""), setTeamTypeId(""), props.getData()]).then(() => {
          if (updateTeamTypeLoading?.success) {
            handleClose();
          }
        });
      });
    }
  };

    if (updateTeamTypeLoading)
    return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    if (updateTeamTypeError)
    return (
      <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>
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
          <Modal.Title className="text-center">แก้ไขประเภทสิทธิ์ผู้ใช้</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>ประเภทสิทธิ์ผู้ใช้</Form.Label>
            <Form.Select
              onChange={(e) => {
                setTeamTypeId(e.target.value);
              }}
              value={teamTypeId}
              autoComplete="off"
              isValid={checkValue === false && teamTypeId !== "" ? true : false}
              isInvalid={checkValue === false && teamTypeId === "" ? true : false}
            >
              <option value="">ประเภทสิทธิ์ผู้ใช้</option>
              {props?.getTypeData?.map((TypeData, index) => (
                <option key={index} value={TypeData.id}>
                  {TypeData.name}
                </option>
              ))}
            </Form.Select>
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
