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

export default function HomeTopEditModal(props) {
  const [
    { loading: updateHomeTopLoading, error: updateHomeTopError },
    executeHomeTopPut,
  ] = useAxios({}, { manual: true });

  const [checkValue, setCheckValue] = useState(true);

  const [showCheck, setShowCheck] = useState(false);
  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);

  const [fromHomeTop, setFromHomeTop] = useState({
    title: "",
    subTitle: "",
  });

  useEffect(() => {
    if (props) {
      setFromHomeTop({
        title: props?.value?.title,
        subTitle: props?.value?.subTitle,
      });
    }
  }, [props]);

  const handlePutData = async () => {
    setCheckValue(false);
    if (fromHomeTop?.address !== "") {
      await executeHomeTopPut({
        url: "/api/homeTop/" + props?.value?.id,
        method: "PUT",
        data: {
          title: fromHomeTop?.title,
          subTitle: fromHomeTop?.subTitle,
        },
      }).then(() => {
        setFromHomeTop({
          title: "",
          subTitle: "",
        }),
          props.getHomeTopData().then(() => {
            if (updateHomeTopLoading?.success) {
              handleClose();
            }
          });
      });
    }
  };

  // if (loading || updateHomeTopLoading) return <ModelLoading showCheck={showCheck}/>
  // if (error || updateHomeTopError) return <ModalError show={showCheck} fnShow={handleClose} centered size='lg'/>

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
            แก้ไขหน้าบ้าน
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
              {EditFunction("ชื่อร้าน",fromHomeTop?.title,setFromHomeTop,"title")}
              {EditFunction("คำอธิบาย",fromHomeTop?.subTitle, setFromHomeTop, "subTitle")}
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
      {console.log(fromHomeTop)}
    </>
  );

  function EditFunction(label, value, setValue, name) {
    return (
      <>
        <Form.Label className="mt-2">{label}</Form.Label>
        <Form.Control
          type="text"
          placeholder="กรุณากรอกข้อมูลา"
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
