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

export default function TeamEditModal(props) {
  const [
    { loading: updateTeamLoading, error: updateTeamError },
    executeTeamPut,
  ] = useAxios({}, { manual: true });

  const [checkValue, setCheckValue] = useState(true);

  const [showCheck, setShowCheck] = useState(false);
  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);

  const [fromTeam, setFromTeam] = useState({
    fname: "",
    lname: "",
    tel: "",
    email: "",
    username: "",
    password: "",
    teamId: "",
    teamTypeId: "",

  });

  useEffect(() => {
    if (props) {
      setFromTeam({
        fname: props?.value?.fname,
        lname:  props?.value?.lname,
        tel:  props?.value?.tel,
        email:  props?.value?.email,
        username:  props?.value?.username,
        password:  props?.value?.password,
        teamId:  props?.value?.teamId,
        teamTypeId:  props?.value?.teamTypeId,

      });
    }
  }, [props]);

  const handlePutData = async () => {
    setCheckValue(false);
     {
      await executeTeamPut({
        url: "/api/team/" + props?.value?.id,
        method: "PUT",
        data: {
            fname: fromTeam?.fname,
            lname: fromTeam?.lname,
            tel: fromTeam?.tel,
            email: fromTeam?.email,
            username: fromTeam?.username,
            password: fromTeam?.password,
            teamId: fromTeam?.teamId,
            teamTypeId: fromTeam?.teamTypeId,
        },
      }).then(() => {
        setFromTeam({
            fname: "",
            lname: "",
            tel: "",
            email: "",
            username: "",
            password: "",
            teamId: "",
            teamTypeId: "",
        }),
          props?.getTeam().then(() => {
            if (updateTeamLoading?.success) {
              handleClose();
            }
          });
      });
    }
  };
  if (updateTeamLoading)
  return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
  if (updateTeamError)
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
            แก้ไขข้อมูลผู้ดูแลระบบ
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
                <Col md='6'>
                <Form.Group className="mb-3" controlId="fname">
                                        <Form.Label>ชื่อจริง</Form.Label>
                                        <Form.Control type="text"
                                         onChange={(e) => {setFromTeam((oldState)=> {
                                           return { ...oldState, fname: e.target.value }
                                         })}}
                                         value={fromTeam.fname} autoComplete="off"
                                         isValid={checkValue === false && fromTeam.fname !== '' ? true : false}
                                         isInvalid={checkValue === false && fromTeam.fname === '' ? true : false}
                                        />
                                    </Form.Group>
                <Form.Group className="mb-3" controlId="lname">
                                        <Form.Label>นามสกุล</Form.Label>
                                        <Form.Control type="text"
                                         onChange={(e) => {setFromTeam((oldState)=> {
                                           return { ...oldState, lname: e.target.value }
                                         })}}
                                         value={fromTeam.lname} autoComplete="off"
                                         isValid={checkValue === false && fromTeam.lname !== '' ? true : false}
                                         isInvalid={checkValue === false && fromTeam.lname === '' ? true : false}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="tel">
                                        <Form.Label>เบอร์โทร</Form.Label>
                                        <Form.Control type="text"
                                         onChange={(e) => {setFromTeam((oldState)=> {
                                           return { ...oldState, tel: e.target.value }
                                         })}}
                                         value={fromTeam.tel} autoComplete="off"
                                         isValid={checkValue === false && fromTeam.tel !== '' ? true : false}
                                         isInvalid={checkValue === false && fromTeam.tel === '' ? true : false}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Label>อีเมล์</Form.Label>
                                        <Form.Control type="text"
                                         onChange={(e) => {setFromTeam((oldState)=> {
                                           return { ...oldState, email: e.target.value }
                                         })}}
                                         value={fromTeam.email} autoComplete="off"
                                         isValid={checkValue === false && fromTeam.email !== '' ? true : false}
                                         isInvalid={checkValue === false && fromTeam.email === '' ? true : false}
                                        />
                                    </Form.Group>
                                    </Col>
                <Col md='6'>
                <Form.Group className="mb-3" controlId="username">
                                        <Form.Label>ชื่อผู้ใช้</Form.Label>
                                        <Form.Control type="text"
                                         onChange={(e) => {setFromTeam((oldState)=> {
                                           return { ...oldState, username: e.target.value }
                                         })}}
                                         value={fromTeam.username} autoComplete="off"
                                         isValid={checkValue === false && fromTeam.username !== '' ? true : false}
                                         isInvalid={checkValue === false && fromTeam.username === '' ? true : false}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>รหัสผ่าน</Form.Label>
                                        <Form.Control type="text"
                                         onChange={(e) => {setFromTeam((oldState)=> {
                                           return { ...oldState, password: e.target.value }
                                         })}}
                                         value={fromTeam.password} autoComplete="off"
                                         isValid={checkValue === false && fromTeam.password !== '' ? true : false}
                                         isInvalid={checkValue === false && fromTeam.password === '' ? true : false}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="price">
                                        <Form.Label>ประเภทสิทธิ์ผู้ใช้</Form.Label>
                                        <Form.Select  
                                          onChange={(e) => {setFromTeam((oldState)=> {
                                            return { ...oldState, teamTypeId: e.target.value }
                                          })}}
                                         value={fromTeam.teamTypeId} autoComplete="off"
                                         isValid={checkValue === false && fromTeam.teamTypeId !== '' ? true : false}
                                         isInvalid={checkValue === false && fromTeam.teamTypeId === '' ? true : false}>
                                            <option value="">ระดับสิทธิ์ผู้ใช้</option>
                                            {props?.getTeamType?.map((teamTypeData, index) => (
                                                <option key={index} value={teamTypeData.id}>{teamTypeData.name}</option>
                                            ))}

                                        </Form.Select>
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
      {console.log(fromTeam)}
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
