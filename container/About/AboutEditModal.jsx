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
        headtitle: fromAbout?.headtitle,
        history: fromAbout?.history,
        subhistory: fromAbout?.subhistory,
        portfolio: fromAbout?.portfolio,
        subportfolio: fromAbout?.subportfolio,
        videotitle: fromAbout?.videotitle,
        video: fromAbout?.video,
        headpolicy: fromAbout?.headpolicy,
        subpolicy: fromAbout?.subpolicy,
      });
    }
  }, [props]);

  const handlePutData = async () => {
    setCheckValue(false);
    if (fromAbout?.address !== "") {
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
            <Col>
              {EditFunction("ชื่อหัวข้อหลัก",fromAbout?.headtitle,setFromAbout,"headtitle")}
              {EditFunction("ชื่อหัวข้อ1",fromAbout?.history, setFromAbout, "history")}
              {EditFunction("รายละเอียด1",fromAbout?.subhistory, setFromAbout, "subhistory")}
              {EditFunction("ชื่อหัวข้อ2",fromAbout?.portfolio,setFromAbout,"portfolio")}
              {EditFunction("รายละเอียด2",fromAbout?.subportfolio,setFromAbout,"subportfolio")}
              {EditFunction("ชื่อหัวข้อวีดิโอ",fromAbout?.videotitle,setFromAbout,"videotitle")}
              {EditFunction("ลิงค์ วีดิโอ",fromAbout?.video,setFromAbout,"linkvedio")}
              {EditFunction("ชื่อหัวข้อ3",fromAbout?.headpolicy,setFromAbout,"headpolicy")}
              {EditFunction("รายละเอียด3", fromAbout?.subpolicy,setFromAbout, "subpolicy")}
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
