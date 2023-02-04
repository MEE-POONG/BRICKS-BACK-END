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

export default function UsersEditModal(props) {
  const [
    { loading: updateUsersLoading, error: updateUsersError },
    executeUsersPut,
  ] = useAxios({}, { manual: true });

  const [checkValue, setCheckValue] = useState(true);

  const [showCheck, setShowCheck] = useState(false);
  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);

  const [fromUsers, setFromUsers] = useState({
    fname: "",
    lname: "",
    tel: "",
    email: "",
    username: "",
    password: "",

  });

  useEffect(() => {
    if (props) {
      setFromUsers({
        fname: props?.value?.fname,
        lname:  props?.value?.lname,
        tel:  props?.value?.tel,
        email:  props?.value?.email,
        username:  props?.value?.username,
        password:  props?.value?.password,

      });
    }
  }, [props]);

  const handlePutData = async () => {
    setCheckValue(false);
     {
      await executeUsersPut({
        url: "/api/users/" + props?.value?.id,
        method: "PUT",
        data: {
            fname: fromUsers?.fname,
            lname: fromUsers?.lname,
            tel: fromUsers?.tel,
            email: fromUsers?.email,
            username: fromUsers?.username,
            password: fromUsers?.password,
        },
      }).then(() => {
        setFromUsers({
            fname: "",
            lname: "",
            tel: "",
            email: "",
            username: "",
            password: "",
        }),
          props?.getUsers().then(() => {
            if (updateUsersLoading?.success) {
              handleClose();
            }
          });
      });
    }
  };

  // if (loading || updateUsersLoading) return <ModelLoading showCheck={showCheck}/>
  // if (error || updateUsersError) return <ModalError show={showCheck} fnShow={handleClose} centered size='lg'/>

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
                <Form.Group className="mb-3" controlId="fname">
                                        <Form.Label>ชื่อจริง</Form.Label>
                                        <Form.Control type="text"
                                         onChange={(e) => {setFromUsers((oldState)=> {
                                           return { ...oldState, fname: e.target.value }
                                         })}}
                                         value={fromUsers.fname} autoComplete="off"
                                         isValid={checkValue === false && fromUsers.fname !== '' ? true : false}
                                         isInvalid={checkValue === false && fromUsers.fname === '' ? true : false}
                                        />
                                    </Form.Group>
                <Form.Group className="mb-3" controlId="lname">
                                        <Form.Label>นามสกุล</Form.Label>
                                        <Form.Control type="text"
                                         onChange={(e) => {setFromUsers((oldState)=> {
                                           return { ...oldState, lname: e.target.value }
                                         })}}
                                         value={fromUsers.lname} autoComplete="off"
                                         isValid={checkValue === false && fromUsers.lname !== '' ? true : false}
                                         isInvalid={checkValue === false && fromUsers.lname === '' ? true : false}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="tel">
                                        <Form.Label>เบอร์โทร</Form.Label>
                                        <Form.Control type="text"
                                         onChange={(e) => {setFromUsers((oldState)=> {
                                           return { ...oldState, tel: e.target.value }
                                         })}}
                                         value={fromUsers.tel} autoComplete="off"
                                         isValid={checkValue === false && fromUsers.tel !== '' ? true : false}
                                         isInvalid={checkValue === false && fromUsers.tel === '' ? true : false}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>อีเมล์</Form.Label>
                                        <Form.Control type="text"
                                         onChange={(e) => {setFromUsers((oldState)=> {
                                           return { ...oldState, email: e.target.value }
                                         })}}
                                         value={fromUsers.email} autoComplete="off"
                                         isValid={checkValue === false && fromUsers.email !== '' ? true : false}
                                         isInvalid={checkValue === false && fromUsers.email === '' ? true : false}
                                        />
                                    </Form.Group>
                                    </Col>
                <Col md='6'>
                <Form.Group className="mb-3" controlId="username">
                                        <Form.Label>ชื่อผู้ใช้</Form.Label>
                                        <Form.Control type="text"
                                         onChange={(e) => {setFromUsers((oldState)=> {
                                           return { ...oldState, username: e.target.value }
                                         })}}
                                         value={fromUsers.username} autoComplete="off"
                                         isValid={checkValue === false && fromUsers.username !== '' ? true : false}
                                         isInvalid={checkValue === false && fromUsers.username === '' ? true : false}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>รหัสผ่าน</Form.Label>
                                        <Form.Control type="text"
                                         onChange={(e) => {setFromUsers((oldState)=> {
                                           return { ...oldState, password: e.target.value }
                                         })}}
                                         value={fromUsers.password} autoComplete="off"
                                         isValid={checkValue === false && fromUsers.password !== '' ? true : false}
                                         isInvalid={checkValue === false && fromUsers.password === '' ? true : false}
                                        />
                                    </Form.Group>
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
      {console.log(fromUsers)}
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
