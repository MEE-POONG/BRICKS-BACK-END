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

export default function HowtoplaceOderEditModal(props) {
  const [
    { loading: updateHowtoplaceOderLoading, error: updateHowtoplaceOderError },
    executeHowtoplaceOderPut,
  ] = useAxios({}, { manual: true });

  const [checkValue, setCheckValue] = useState(true);

  const [showCheck, setShowCheck] = useState(false);
  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);

  const [fromHowtoplaceOder, setFromHowtoplaceOder] = useState({
    headtitle: "",
    title: "",
    steps1: "",
    substeps1: "",
    steps2: "",
    substeps2: "",
    steps3: "",
    substeps3: "",
    steps4: "",
    substeps4: "",
    steps5: "",
    substeps5: "",
  });

  useEffect(() => {
    if (props) {
      setFromHowtoplaceOder({
        headtitle: props?.value?.headtitle,
        title:  props?.value?.title,
        steps1:  props?.value?.steps1,
        substeps1:  props?.value?.substeps1,
        steps2:  props?.value?.steps2,
        substeps2:  props?.value?.substeps2,
        steps3:  props?.value?.steps3,
        substeps3:  props?.value?.substeps3,
        steps4: props?.value?.steps4,
        substeps4: props?.value?.substeps4,
        steps5: props?.value?.steps5,
        substeps5: props?.value?.substeps5,
      });
    }
  }, [props]);

  const handlePutData = async () => {
    setCheckValue(false);
     {
      await executeHowtoplaceOderPut({
        url: "/api/howtoplaceOder/" + props?.value?.id,
        method: "PUT",
        data: {
          headtitle: fromHowtoplaceOder?.headtitle,
          title: fromHowtoplaceOder?.title,
          steps1: fromHowtoplaceOder?.steps1,
          substeps1: fromHowtoplaceOder?.substeps1,
          steps2: fromHowtoplaceOder?.steps2,
          substeps2: fromHowtoplaceOder?.substeps2,
          steps3: fromHowtoplaceOder?.steps1,
          substeps3: fromHowtoplaceOder?.substeps1,
          steps4: fromHowtoplaceOder?.steps4,
          substeps4: fromHowtoplaceOder?.substeps4,
          steps5: fromHowtoplaceOder?.steps5,
          substeps5: fromHowtoplaceOder?.substeps5,

          
        },
      }).then(() => {
        setFromHowtoplaceOder({
          headtitle: "",
          title: "",
          steps1: "",
          substeps1: "",
          steps2: "",
          substeps2: "",
          steps3: "",
          substeps3: "",
          steps4: "",
          substeps4: "",
          steps5: "",
          substeps5: "",
        }),
          props.getHowtoplaceOderData().then(() => {
            if (updateHowtoplaceOderLoading?.success) {
              handleClose();
            }
          });
      });
    }
  };

  if (updateHowtoplaceOderLoading)
  return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
  if (updateHowtoplaceOderError)
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
         แก้ไข
      </Button>

      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            แก้ไขข้อมูลเกี่ยวกับเรา
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md='12'>
              {EditFunction("ชื่อหัวข้อหลัก",fromHowtoplaceOder?.headtitle,setFromHowtoplaceOder,"headtitle")}
              {EditFunction("ชื่อหัวข้อย่อย",fromHowtoplaceOder?.title,setFromHowtoplaceOder,"title")}
              <Form.Group className="mb-3" controlId="steps1">
                                        <Form.Label>หัวข้อขั้นตอน1</Form.Label>
                                        <Form.Control type="text"
                                         onChange={(e) => {setFromHowtoplaceOder((oldState)=> {
                                           return { ...oldState, steps1: e.target.value }
                                         })}}
                                         value={fromHowtoplaceOder.steps1} autoComplete="off"
                                         isValid={checkValue === false && fromHowtoplaceOder.steps1 !== '' ? true : false}
                                         isInvalid={checkValue === false && fromHowtoplaceOder.steps1 === '' ? true : false}
                                        />
                                    </Form.Group>
                            <Form.Group className="mb-3" controlId="detail">
                                <Form.Label>รายละเอียดขั้นตอน1</Form.Label>
                                <CKEditor
                                    initData={fromHowtoplaceOder?.substeps1}
                                    onChange={(e) => {setFromHowtoplaceOder((oldState)=> {
                                      return { ...oldState, substeps1: e.editor.getData() }
                                    })}}
                                    config={{
                                    uiColor: "#ddc173 ",
                                    language: "th",
                                    extraPlugins: "easyimage,autogrow,emoji",
                                    }}
                                    />   
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="steps2">
                                        <Form.Label>หัวข้อขั้นตอน2</Form.Label>
                                        <Form.Control type="text"
                                         onChange={(e) => {setFromHowtoplaceOder((oldState)=> {
                                           return { ...oldState, steps2: e.target.value }
                                         })}}
                                         value={fromHowtoplaceOder.steps2} autoComplete="off"
                                         isValid={checkValue === false && fromHowtoplaceOder.steps2 !== '' ? true : false}
                                         isInvalid={checkValue === false && fromHowtoplaceOder.steps2 === '' ? true : false}
                                        />
                                    </Form.Group>
                            <Form.Group className="mb-3" controlId="detail">
                                <Form.Label>รายละเอียดขั้นตอน2</Form.Label>
                                <CKEditor
                                    initData={fromHowtoplaceOder?.substeps2}
                                    onChange={(e) => {setFromHowtoplaceOder((oldState)=> {
                                      return { ...oldState, substeps2: e.editor.getData() }
                                    })}}
                                    config={{
                                    uiColor: "#ddc173 ",
                                    language: "th",
                                    extraPlugins: "easyimage,autogrow,emoji",
                                    }}
                                    />   
                            </Form.Group>
                            </Col>
                            <Col md='12'>
                            <Form.Group className="mb-3" controlId="steps3">
                                        <Form.Label>หัวข้อขั้นตอน3</Form.Label>
                                        <Form.Control type="text"
                                         onChange={(e) => {setFromHowtoplaceOder((oldState)=> {
                                           return { ...oldState, steps3: e.target.value }
                                         })}}
                                         value={fromHowtoplaceOder.steps3} autoComplete="off"
                                         isValid={checkValue === false && fromHowtoplaceOder.steps3 !== '' ? true : false}
                                         isInvalid={checkValue === false && fromHowtoplaceOder.steps3 === '' ? true : false}
                                        />
                                    </Form.Group>
                            <Form.Group className="mb-3" controlId="detail">
                                <Form.Label>รายละเอียดขั้นตอน3</Form.Label>
                                <CKEditor
                                    initData={fromHowtoplaceOder?.substeps3}
                                    onChange={(e) => {setFromHowtoplaceOder((oldState)=> {
                                      return { ...oldState, substeps3: e.editor.getData() }
                                    })}}
                                    config={{
                                    uiColor: "#ddc173 ",
                                    language: "th",
                                    extraPlugins: "easyimage,autogrow,emoji",
                                    }}
                                    />   
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="steps4">
                                        <Form.Label>หัวข้อขั้นตอน4</Form.Label>
                                        <Form.Control type="text"
                                         onChange={(e) => {setFromHowtoplaceOder((oldState)=> {
                                           return { ...oldState, steps4: e.target.value }
                                         })}}
                                         value={fromHowtoplaceOder.steps4} autoComplete="off"
                                         isValid={checkValue === false && fromHowtoplaceOder.steps4 !== '' ? true : false}
                                         isInvalid={checkValue === false && fromHowtoplaceOder.steps4 === '' ? true : false}
                                        />
                                    </Form.Group>
                            <Form.Group className="mb-3" controlId="detail">
                                <Form.Label>รายละเอียดขั้นตอน4</Form.Label>
                                <CKEditor
                                    initData={fromHowtoplaceOder?.substeps4}
                                    onChange={(e) => {setFromHowtoplaceOder((oldState)=> {
                                      return { ...oldState, substeps4: e.editor.getData() }
                                    })}}
                                    config={{
                                    uiColor: "#ddc173 ",
                                    language: "th",
                                    extraPlugins: "easyimage,autogrow,emoji",
                                    }}
                                    />   
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="steps5">
                                        <Form.Label>หัวข้อขั้นตอน5</Form.Label>
                                        <Form.Control type="text"
                                         onChange={(e) => {setFromHowtoplaceOder((oldState)=> {
                                           return { ...oldState, steps5: e.target.value }
                                         })}}
                                         value={fromHowtoplaceOder.steps5} autoComplete="off"
                                         isValid={checkValue === false && fromHowtoplaceOder.steps5 !== '' ? true : false}
                                         isInvalid={checkValue === false && fromHowtoplaceOder.steps5 === '' ? true : false}
                                        />
                                    </Form.Group>
                            <Form.Group className="mb-3" controlId="detail">
                                <Form.Label>รายละเอียดขั้นตอน5</Form.Label>
                                <CKEditor
                                    initData={fromHowtoplaceOder?.substeps5}
                                    onChange={(e) => {setFromHowtoplaceOder((oldState)=> {
                                      return { ...oldState, substeps5: e.editor.getData() }
                                    })}}
                                    config={{
                                    uiColor: "#ddc173 ",
                                    language: "th",
                                    extraPlugins: "easyimage,autogrow,emoji",
                                    }}
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
                        ยืนยันการเพิ่ม
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  {console.log(fromHowtoplaceOder)}
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
