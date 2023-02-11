import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import useAxios from "axios-hooks";
import AutoComplete from "@/components/AutoComplete";
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from "@/components/CardChange/CardError";
import ModelLoading from "@/components/ModelChange/ModelLoading";
import ModelError from "@/components/ModelChange/ModelError";

import FormData from "form-data";
import { CKEditor } from "ckeditor4-react";

export default function PichomeTopEditModal(props) {
  const [
    { loading: updatePichomeTopLoading, error: updatePichomeTopError },
    executePichomeTopPut,
  ] = useAxios({}, { manual: true });

  const [checkValue, setCheckValue] = useState(true);

  const [{ loading: imgLoading, error: imgError }, uploadImage] = useAxios(
    { url: "/api/upload", method: "POST" },
    { manual: true }
  );


  const [img, setImg] = useState([]);
  const [image, setImage] = useState([]);
  const [imageURL, setImageURL] = useState([]);

  const [name, setName] = useState([]);
  const [links, setLinks] = useState([]);


  const [showCheck, setShowCheck] = useState(false);
  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);

  console.log(image);

  useEffect(() => {
    if (props) {
      setName(props?.value?.name);
      setLinks(props?.value?.links);
      setImg(props?.value?.image);
    }

    if (image.length < 1) return;
    const newImageUrl = [];
    image.forEach((image) => newImageUrl.push(URL.createObjectURL(image)));
    setImageURL(newImageUrl);
    
  }, [props, image]);

  const onImagePichomeTopChange = (e) => {
    setImage([...e.target.files]);
  };

  const handlePutData = async () => {
    setCheckValue(false);
    if (image[0] === undefined) {
      await executePichomeTopPut({
        url: "/api/pichomeTop/" + props?.value?.id,
        method: "PUT",
        data: {
            
        },
      }).then(() => {
        Promise.all([   
        props.getPichomeTopData()
    ]).then(() => {
          if (updatePichomeTopLoading?.success) {
            handleClose();
          }
        });
      });
    } else {
      let data = new FormData();
      data.append("file", image[0]);
      const imageData = await uploadImage({ data: data });
      const id = imageData.data.result.id;

      await executePichomeTopPut({
        url: "/api/pichomeTop/" + props?.value?.id,
        method: "PUT",
        data: {
            name: name,
            links: links,
            image: `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,
        },
      }).then(() => {
        Promise.all([   
            setName(''),
            setLinks(''),
            setImage(''),
            props.getPichomeTopData()
        ]).then(() => {
          if (updatePichomeTopLoading?.success) {
            handleClose();
          }
        });
      });
    }
  };

  if (updatePichomeTopLoading || imgLoading)
    return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
  if (updatePichomeTopError || imgError)
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
                      <Modal.Title className="text-center">แก้ไขข้อมูลสินค้าของเรา</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Row>
                        <Col md="6">
                          <Form.Group className="mb-3" controlId="formFile">
                            <Form.Label className="text-center">เลือกรูปสินค้า</Form.Label>

                            <Form.Label className="d-block">รูปภาพ</Form.Label>
                            {imageURL?.length === 0 && (
                              <Image
                                className="mb-2"
                                style={{ height: 200 }}
                                src={img}
                                alt="PichomeTop_img"
                                fluid
                                rounded
                              />
                            )}
                            {imageURL?.map((imageSrcPichomeTop, index) => (
                              <Image
                                key={index}
                                className="mb-2"
                                style={{ height: 200 }}
                                src={imageSrcPichomeTop}
                                alt="PichomeTop_img"
                                fluid
                                rounded
                              />
                            ))}
                            <Form.Control
                              type="file"
                              accept="image/*"
                              onChange={onImagePichomeTopChange}
                            />
                          </Form.Group>
                        </Col>
                        
                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>ชื่อโลโก้</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่มชื่อสินค้า"
                                         onChange={(e) => { setName(e.target.value) }}
                                         value={name} autoComplete="off"
                                         isValid={checkValue === false && name !== '' ? true : false}
                                         isInvalid={checkValue === false && name === '' ? true : false}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="links">
                                        <Form.Label>ลิงค์โลโก้</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่ม links"
                                         onChange={(e) => { setLinks(e.target.value) }}
                                         value={links} autoComplete="off"
                                         isValid={checkValue === false && links !== '' ? true : false}
                                         isInvalid={checkValue === false && links === '' ? true : false}
                                        />
                                    </Form.Group>
                                </Col>
                    </Row>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button bg="danger" className="my-0 btn-danger" onClick={handleClose}>
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
