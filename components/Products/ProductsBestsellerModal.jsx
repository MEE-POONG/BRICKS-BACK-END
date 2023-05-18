import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { FaEdit, FaStar } from "react-icons/fa";
import useAxios from "axios-hooks";
import AutoComplete from "@/components/AutoComplete";
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from "@/components/CardChange/CardError";
import ModelLoading from "@/components/ModelChange/ModelLoading";
import ModelError from "@/components/ModelChange/ModelError";

import FormData from "form-data";
import { CKEditor } from "ckeditor4-react";

export default function ProductsBestsellerModal(props) {
  const [
    { loading: updateProductsLoading, error: updateProductsError },
    executeProductsPut,
  ] = useAxios({}, { manual: true });

  const [checkValue, setCheckValue] = useState(true);





  const [bestseller, setBestseller] = useState('');

  const [showCheck, setShowCheck] = useState(false);
  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);


  useEffect(() => {
    // console.log("props : ",props?.value);
  }, [props]);


  const handlePutData = async () => {
    setCheckValue(false);

    let data = new FormData();
    data.append("file", image[0]);
    const imageData = await uploadImage({ data: data });
    const id = imageData.data.result.id;

    await executeProductsPut({
      url: "/api/products/" + props?.value?.id,
      method: "PUT",
      data: {
        name: name,
        price: price,
        subTypeId: subTypeId,
        detail: detail,
        detail: detail,
        image: `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,
      },
    }).then(() => {
      Promise.all([
        setName(''),
        setPrice(''),
        setImage(''),
        setSubTypeId(''),
        setDetail(''),
        props.getData()
      ]).then(() => {
        if (updateProductsLoading?.success) {
          handleClose();
        }
      });
    });
  };

  if (updateProductsLoading)
    return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
  if (updateProductsError)
    return (
      <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>
    );

  return (
    <>
      <Button
        bsPrefix="star"
        className={showCheck ? "icon active" : "icon"}
        onClick={handleShow}
      >
        <FaStar />
      </Button>

      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">ตั้งเป็นสินค้าขายดี</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={4}>
              <Image
                src={props?.value?.image}
                width="250px"
                height="250px"
                className="object-fit-cover"
              />
            </Col>
            <Col sm={6}>
              <Modal.Title>
                ชื่อสินค้า :{" "}
                <span className="text-danger"> {props?.value?.name}</span>
              </Modal.Title>
              <Modal.Title>
                ประเภทสินค้า :{" "}
                <span className="text-danger">{props?.value?.type}</span>
              </Modal.Title>
              <Modal.Title>
                ราคา :{" "}
                <span className="text-danger"> {props?.value?.price}</span>
              </Modal.Title>
              <Modal.Title>
                รายละเอียด :{" "}
                <span className="text-danger">
                  <div
                    dangerouslySetInnerHTML={{ __html: props?.value?.detail }}
                  />
                </span>
              </Modal.Title>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" className="my-0" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button bg="succeed" className="my-0" onClick={handlePutData}>
            ยืนยันสินค้าขายดี
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
