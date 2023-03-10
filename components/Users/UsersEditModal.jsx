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
    firstName: "",
    lastName: "",
    tel: "",
    email: "",
    username: "",
    password: "",

  });

  useEffect(() => {
    if (props) {
      setFromUser({
        firstName: props?.value?.firstName,
        lastName:  props?.value?.lastName,
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
      await executeUserPut({
        url: "/api/user/" + props?.value?.id,
        method: "PUT",
        data: {
            firstName: fromUser?.firstName,
            lastName: fromUser?.lastName,
            tel: fromUser?.tel,
            email: fromUser?.email,
            username: fromUser?.username,
            password: fromUser?.password,
        },
      }).then(() => {
        setFromUser({
            firstName: "",
            lastName: "",
            tel: "",
            email: "",
            username: "",
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
            ???????????????????????????????????????????????????
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
                <Col md='12'>
                  {EditFunction("????????????????????????",fromUser?.firstName,setFromUser,"firstName")}
                  {EditFunction("?????????????????????",fromUser?.lastName,setFromUser,"lastName")}
                  {EditFunction("????????????????????????",fromUser?.tel,setFromUser,"tel")}
                  {EditFunction("??????????????????",fromUser?.email,setFromUser,"email")}
                </Col>
                {/* <Col md='6'> */}
                  {/* {EditFunction("??????????????????????????????",fromUser?.username,setFromUser,"username")} */}
                  {/* {EditFunction("????????????????????????",fromUser?.password,setFromUser,"password")} */}
                {/* </Col> */}
                </Row>
      
        </Modal.Body>
        <Modal.Footer>
          <Button bg="danger" className="my-0 btn-danger"onClick={handleClose}>
            ??????????????????
          </Button>
          <Button bg="succeed" className='my-0' onClick={handlePutData}>
            ??????????????????????????????????????????
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  function EditFunction(label, value, setValue, name) {
    return (
      <>
        <Form.Label className="mt-2 mb-3">{label}</Form.Label>
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
