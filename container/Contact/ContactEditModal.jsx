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

  // if (loading || updateContactLoading) return <ModelLoading showCheck={showCheck}/>
  // if (error || updateContactError) return <ModalError show={showCheck} fnShow={handleClose} centered size='lg'/>

  return (
    <>
      <Button
        bsPrefix="edit"
        className={showCheck ? "icon active" : "icon"}
        onClick={handleShow}
      >
         แก้ไข
      </Button>

      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            เพิ่มสมาชิกพนักงานองค์กร
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              {EditFunction("ที่ตั้ง",fromContact?.address,setFromContact,"address")}
              {EditFunction("เบอร์มือถือ",fromContact?.tel, setFromContact, "tel")}
              {EditFunction("อีเมล์",fromContact?.email, setFromContact, "email")}
              {EditFunction("ลิงค์ Map",fromContact?.linkMap,setFromContact,"linkMap")}
            </Col>
            <Col>
              {EditFunction("Facebook",fromContact?.facebook,setFromContact,"facebook")}
              {EditFunction("ลิงค์ Facebook",fromContact?.linkFacebook,setFromContact,"linkFacebook")}
              {EditFunction("Line", fromContact?.line, setFromContact, "line")}
              {EditFunction("ลิงค์ Line",fromContact?.linkLine,setFromContact,"linkLine")}
            </Col>
          </Row>
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
      {console.log(fromContact)}
    </>
  );

  function EditFunction(label, value, setValue, name) {
    return (
      <>
        <Form.Label className="mt-2">{label}</Form.Label>
        <Form.Control
          type="text"
          placeholder="เพิ่ม ราคาของสินค้า"
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
