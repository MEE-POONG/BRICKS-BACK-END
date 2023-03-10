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

export default function ContactEditModal(props) {
  const [
    { loading: updateContactLoading, error: updateContactError },
    executeContactPut,
  ] = useAxios({}, { manual: true });

  const [checkValue, setCheckValue] = useState(true);

  const [showCheck, setShowCheck] = useState(false);
  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);

  const [fromContact, setFromContact] = useState({
    address: "",
    tel: "",
    email: "",
    linkMap: "",
    facebook: "",
    linkFacebook: "",
    line: "",
    linkLine: "",
  });

  useEffect(() => {
    if (props) {
      setFromContact({
        address: props?.value?.address,
        tel: props?.value?.tel,
        email: props?.value?.email,
        linkMap: props?.value?.linkMap,
        facebook: props?.value?.facebook,
        linkFacebook: props?.value?.linkFacebook,
        line: props?.value?.line,
        linkLine: props?.value?.linkLine,
      });
    }
  }, [props]);

  const handlePutData = async () => {
    setCheckValue(false);
    if (fromContact?.address !== "") {
      await executeContactPut({
        url: "/api/contact/" + props?.value?.id,
        method: "PUT",
        data: {
          address: fromContact?.address,
          tel: fromContact?.tel,
          email: fromContact?.email,
          linkMap: fromContact?.linkMap,
          facebook: fromContact?.facebook,
          linkFacebook: fromContact?.linkFacebook,
          line: fromContact?.line,
          linkLine: fromContact?.linkLine,
        },
      }).then(() => {
        setFromContact({
          address: "",
          tel: "",
          email: "",
          linkMap: "",
          facebook: "",
          linkFacebook: "",
          line: "",
          linkLine: "",
        }),
          props.getContactData().then(() => {
            if (updateContactLoading?.success) {
              handleClose();
            }
          });
      });
    }
  };

  if (updateContactLoading)
  return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
  if (updateContactError)
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
         ???????????????
      </Button>

      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            ?????????????????????????????????????????????????????????????????????????????????
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              {EditFunction("?????????????????????",fromContact?.address,setFromContact,"address")}
              {EditFunction("?????????????????????????????????",fromContact?.tel, setFromContact, "tel")}
              {EditFunction("??????????????????",fromContact?.email, setFromContact, "email")}
              {EditFunction("??????????????? Map",fromContact?.linkMap,setFromContact,"linkMap")}
            </Col>
            <Col>
              {EditFunction("Facebook",fromContact?.facebook,setFromContact,"facebook")}
              {EditFunction("??????????????? Facebook",fromContact?.linkFacebook,setFromContact,"linkFacebook")}
              {EditFunction("Line", fromContact?.line, setFromContact, "line")}
              {EditFunction("??????????????? Line",fromContact?.linkLine,setFromContact,"linkLine")}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
        <Button bg="danger" className="my-0 btn-danger" onClick={handleClose}>
            ??????????????????
          </Button>
          <Button bg="succeed" className="my-0"  onClick={handlePutData}>
            ??????????????????????????????????????????
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  function EditFunction(label, value, setValue, name) {
    return (
      <>
        <Form.Label className="mt-2">{label}</Form.Label>
        <Form.Control
          type="text"
          placeholder="?????????????????????????????????????????????"
          onChange={(e) => {
            setValue((oldState) => {
              return { ...oldState, [name]: e.target.value };
            });
          }}
          value={value}
          autoComplete="off"
          isValid={checkValue === false && { value } !== "" ? true : false}
          isInvalid={checkValue === false && { value } === "" ? true : false}
        />
      </>
    );
  }
}
