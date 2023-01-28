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

export default function AboutEditModal(props) {
  const [
    { loading: updateAboutLoading, error: updateAboutError },
    executeAboutPut,
  ] = useAxios({}, { manual: true });

  const [checkValue, setCheckValue] = useState(true);

  const [showCheck, setShowCheck] = useState(false);
  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);

  const [fromAbout, setFromAbout] = useState({
    headtitle: "",
    history: "",
    subhistory: "",
    portfolio: "",
    subportfolio: "",
    videotitle: "",
    video: "",
    headpolicy: "",
    subpolicy: "",
  });

  useEffect(() => {
    if (props) {
      setFromAbout({
        headtitle: props?.value?.headtitle,
        history:  props?.value?.history,
        subhistory:  props?.value?.subhistory,
        portfolio:  props?.value?.portfolio,
        subportfolio:  props?.value?.subportfolio,
        videotitle:  props?.value?.videotitle,
        video:  props?.value?.video,
        headpolicy:  props?.value?.headpolicy,
        subpolicy: props?.value?.subpolicy,
      });
    }
  }, [props]);

  const handlePutData = async () => {
    setCheckValue(false);
     {
      await executeAboutPut({
        url: "/api/about/" + props?.value?.id,
        method: "PUT",
        data: {
          headtitle: fromAbout?.headtitle,
          history: fromAbout?.history,
          subhistory: fromAbout?.subhistory,
          portfolio: fromAbout?.portfolio,
          subportfolio: fromAbout?.subportfolio,
          videotitle: fromAbout?.videotitle,
          video: fromAbout?.video,
          headpolicy: fromAbout?.headpolicy,
          subpolicy: fromAbout?.subpolicy,

          
        },
      }).then(() => {
        setFromAbout({
          headtitle: "",
          history: "",
          subhistory: "",
          portfolio: "",
          subportfolio: "",
          videotitle: "",
          video: "",
          headpolicy: "",
          subpolicy: "",
        }),
          props.getAboutData().then(() => {
            if (updateAboutLoading?.success) {
              handleClose();
            }
          });
      });
    }
  };

  // if (loading || updateAboutLoading) return <ModelLoading showCheck={showCheck}/>
  // if (error || updateAboutError) return <ModalError show={showCheck} fnShow={handleClose} centered size='lg'/>

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
            <Col md='6'>
              {EditFunction("ชื่อหัวข้อหลัก",fromAbout?.headtitle,setFromAbout,"headtitle")}
              </Col>
              <Col md='6'>
              {EditFunction("ชื่อหัวข้อวีดิโอ",fromAbout?.videotitle,setFromAbout,"videotitle")}
              {EditFunction("ลิงค์ วีดิโอ",fromAbout?.video,setFromAbout,"video")}

              </Col>
              <Col md='12'>
               {/* History */}
              <Form.Group className="mb-3" controlId="history">
                                        <Form.Label>ชื่อหัวข้อ1</Form.Label>
                                        <Form.Control type="text"
                                         onChange={(e) => {setFromAbout((oldState)=> {
                                           return { ...oldState, history: e.target.value }
                                         })}}
                                         value={fromAbout.history} autoComplete="off"
                                         isValid={checkValue === false && fromAbout.history !== '' ? true : false}
                                         isInvalid={checkValue === false && fromAbout.history === '' ? true : false}
                                        />
                                    </Form.Group>
                            <Form.Group className="mb-3" controlId="detail">
                                <Form.Label>รายละเอียด1</Form.Label>
                                <CKEditor
                                    initData={fromAbout?.subhistory}
                                    onChange={(e) => {setFromAbout((oldState)=> {
                                      return { ...oldState, subhistory: e.editor.getData() }
                                    })}}
                                    config={{
                                    uiColor: "#ddc173 ",
                                    language: "th",
                                    extraPlugins: "easyimage,autogrow,emoji",
                                    }}
                                    />   
                            </Form.Group>
                                    {/*------------- Portfolio ----------- */}
                            <Form.Group className="mb-3" controlId="portfolio">
                                        <Form.Label>ชื่อหัวข้อ2</Form.Label>
                                        <Form.Control type="text" 
                                         onChange={(e) => {setFromAbout((oldState)=> {
                                           return { ...oldState, portfolio: e.target.value }
                                         })}}
                                         value={fromAbout.portfolio} autoComplete="off"
                                         isValid={checkValue === false && fromAbout.portfolio !== '' ? true : false}
                                         isInvalid={checkValue === false && fromAbout.portfolio === '' ? true : false}
                                        />
                                    </Form.Group>
                  
                            <Form.Group className="mb-3" controlId="detail">
                                <Form.Label>รายละเอียด2</Form.Label>
                                <CKEditor
                                    initData={fromAbout?.subportfolio}
                                    onChange={(e) => {setFromAbout((oldState)=> {
                                      return { ...oldState, subportfolio: e.editor.getData() }
                                    })}}
                                    config={{
                                    uiColor: "#ddc173 ",
                                    language: "th",
                                    extraPlugins: "easyimage,autogrow,emoji",
                                    }}
                                    />   
                            </Form.Group>
                                   {/*------------- Headpolicy ----------- */}
                                   <Form.Group className="mb-3" controlId="headpolicy">
                                        <Form.Label>ชื่อหัวข้อ3</Form.Label>
                                        <Form.Control type="text" 
                                         onChange={(e) => {setFromAbout((oldState)=> {
                                           return { ...oldState, headpolicy: e.target.value }
                                         })}}
                                         value={fromAbout.headpolicy} autoComplete="off"
                                         isValid={checkValue === false && fromAbout.headpolicy !== '' ? true : false}
                                         isInvalid={checkValue === false && fromAbout.headpolicy === '' ? true : false}
                                        />
                                    </Form.Group>
                  
                            <Form.Group className="mb-3" controlId="detail">
                                <Form.Label>รายละเอียด3</Form.Label>
                                <CKEditor
                                    initData={fromAbout?.subpolicy}
                                    onChange={(e) => {setFromAbout((oldState)=> {
                                      return { ...oldState, subpolicy: e.editor.getData() }
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
      {console.log(fromAbout)}
    </>
  );

  function EditFunction(label, value, setValue, name) {
    return (
      <>
        <Form.Label className="mt-2 mb-3">{label}</Form.Label>
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
