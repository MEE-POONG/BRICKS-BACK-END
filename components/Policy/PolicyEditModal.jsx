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

export default function PolicyEditModal(props) {
  const [
    { loading: updatePolicyLoading, error: updatePolicyError },
    executePolicyPut,
  ] = useAxios({}, { manual: true });

  const [checkValue, setCheckValue] = useState(true);

  const [showCheck, setShowCheck] = useState(false);
  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);

  const [fromPolicy, setFromPolicy] = useState({
    headpolicy: "",
    subpolicy: "",
  });

  useEffect(() => {
    if (props) {
      setFromPolicy({
        headpolicy: props?.value?.headpolicy,
        subpolicy: props?.value?.subpolicy,
      });
    }
  }, [props]);

  const handlePutData = async () => {
    setCheckValue(false);
    if (fromPolicy?.address !== "") {
      await executePolicyPut({
        url: "/api/policy/" + props?.value?.id,
        method: "PUT",
        data: {
          headpolicy: fromPolicy?.headpolicy,
          subpolicy: fromPolicy?.subpolicy,
        },
      }).then(() => {
        setFromPolicy({
          headpolicy: "",
          subpolicy: "",
        }),
          props.getPolicy().then(() => {
            if (updatePolicyLoading?.success) {
              handleClose();
            }
          });
      });
    }
  };

  // if (loading || updatePolicyLoading) return <ModelLoading showCheck={showCheck}/>
  // if (error || updatePolicyError) return <ModalError show={showCheck} fnShow={handleClose} centered size='lg'/>

  return (
    <>
      <Button
        bsPrefix="edit"
        className={showCheck ? "icon active" : "icon"}
        onClick={handleShow}
      >
         <FaEdit />
      </Button>
        <Modal show={showCheck} onHide={handleClose} centered size='lg' className='form-Policy'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>แก้ไขนโยบาย</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Row>
                        <Col md='6'>
                            <Row>
                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="headpolicy">
                                        <Form.Label>ชื่อนโยบาย</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่มชื่อนโยบาย"
                                         onChange={(e) => {setFromPolicy((oldState)=> {
                                           return { ...oldState, headpolicy: e.target.value }
                                         })}}
                                         value={fromPolicy.headpolicy} autoComplete="off"
                                         isValid={checkValue === false && fromPolicy.headpolicy !== '' ? true : false}
                                         isInvalid={checkValue === false && fromPolicy.headpolicy === '' ? true : false}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <h4>เพิ่มข้อมูลรายละเอียดนโยบาย</h4>
                            <Form.Group className="mb-3" controlId="detail">
                                <Form.Label>รายละเอียดนโยบาย</Form.Label>
                                <CKEditor
                                    initData={fromPolicy?.subpolicy}
                                    onChange={(e) => {setFromPolicy((oldState)=> {
                                      return { ...oldState, subpolicy: e.editor.getData() }
                                    })}}
                                    config={{
                                    uiColor: "#ddc173 ",
                                    language: "th",
                                    // extraPlugins: "uploadimage",
                                    // filebrowserUploadMethod: "form",
                                    // filebrowserUploadUrl: ("/uploader/upload"),
                                    // filebrowserBrowseUrl: '/addgallery',
                                    // toolbar: [
                                    // ],
                                    extraPlugins: "easyimage,autogrow,emoji",
                                    // removePlugins: 'image',
                                    }}
                                    />           
                            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button bg="danger" className="my-0 btn-danger"onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button bg="succeed" className="my-0" onClick={handlePutData}>
            ยืนยันการเพิ่ม
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
