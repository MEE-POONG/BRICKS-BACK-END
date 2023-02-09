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

export default function UserEditModal(props) {
  const [
    { loading: updateUserLoading, error: updateUserError },
    executeUserPut,
  ] = useAxios({}, { manual: true });

  const [checkValue, setCheckValue] = useState(true);

  const [showCheck, setShowCheck] = useState(false);
  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);

  const [fromUser, setFromUser] = useState({
    fname: "",
    lname: "",
    tel: "",
    email: "",
    name: "",
    password: "",

  });

  useEffect(() => {
    if (props) {
      setFromUser({
        fname: props?.value?.fname,
        lname:  props?.value?.lname,
        tel:  props?.value?.tel,
        email:  props?.value?.email,
        name:  props?.value?.name,
        password:  props?.value?.password,

      });
    }
  }, [props]);

  const handlePutData = async () => {
    setCheckValue(false);
     {
      await executeUserPut({
        url: "/api/user/" + props?.value?.id,
        method: "PUT",
        data: {
            fname: fromUser?.fname,
            lname: fromUser?.lname,
            tel: fromUser?.tel,
            email: fromUser?.email,
            name: fromUser?.name,
            password: fromUser?.password,
        },
      }).then(() => {
        setFromUser({
            fname: "",
            lname: "",
            tel: "",
            email: "",
            name: "",
            password: "",
        }),
          props?.getUser().then(() => {
            if (updateUserLoading?.success) {
              handleClose();
            }
          });
      });
    }
  };

  if (updateUserLoading)
  return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
  if (updateUserError)
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
          <Modal.Title className="text-center">
            แก้ไขข้อมูลสมาชิก
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
                <Col md='6'>
                  {EditFunction("ชื่อจริง",fromUser?.fname,setFromUser,"fname")}
                  {EditFunction("นามสกุล",fromUser?.lname,setFromUser,"lname")}
                  {EditFunction("เบอร์โทร",fromUser?.tel,setFromUser,"tel")}
                  {EditFunction("อีเมล์",fromUser?.email,setFromUser,"email")}
                </Col>
                <Col md='6'>
                  {EditFunction("ชื่อผู้ใช้",fromUser?.name,setFromUser,"name")}
                  {EditFunction("รหัสผ่าน",fromUser?.password,setFromUser,"password")}
                </Col>
                </Row>
      
        </Modal.Body>
        <Modal.Footer>
          <Button bg="danger" className="my-0 btn-danger"onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button bg="succeed" className='my-0' onClick={handlePutData}>
            ยืนยันการแก้ไข
          </Button>
        </Modal.Footer>
      </Modal>
      {console.log(fromUser)}
    </>
  );

  function EditFunction(label, value, setValue, name) {
    return (
      <>
        <Form.Label className="mt-2 mb-3">{label}</Form.Label>
        <Form.Control
          type="text"
          placeholder="กรุณากรอกข้อมูล"
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
