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
      setFromAbout({
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
    if (fromAbout?.address !== "") {
      await executeAboutPut({
        url: "/api/about/" + props?.value?.id,
        method: "PUT",
        data: {
          address: fromAbout?.address,
        },
      }).then(() => {
        setFromAbout({
          address: "",
          tel: "",
          email: "",
          linkMap: "",
          facebook: "",
          linkFacebook: "",
          line: "",
          linkLine: "",
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
        <FaEdit /> แก้ไข
      </Button>

      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            เพิ่มสมาชิกพนักงานองค์กร
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="form-customer">
          <Row>
            <Col>
              {EditFunction("ที่ตั้ง", fromAbout?.address, setFromAbout, "address")}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button bsPrefix="cancel" className="my-0" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button bsPrefix="succeed" className="my-0" onClick={handlePutData}>
            ยืนยันการเพิ่ม
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );

  function EditFunction(label, value, setValue, name) {
    return (
      <>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          type="text"
          placeholder="เพิ่ม ราคาของสินค้า"
          onChange={(e) => setValue({ [name]: e.target.value })}
          value={value}
          autoComplete="off"
          isValid={checkValue === false && { value } !== "" ? true : false}
          isInvalid={checkValue === false && { value } === "" ? true : false}
        />
      </>
    );
  }
}
