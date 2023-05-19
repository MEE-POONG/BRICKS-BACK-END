import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Image, Card } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import useAxios from "axios-hooks";
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from "@/components/CardChange/CardError";

import FormData from "form-data";

export default function ProductsBestsellerModal(props) {
  const [
    { data: bestsellerData, loading: bestsellerLoading, error: bestsellerError },
    getBestseller,
  ] = useAxios({
    url: `/api/products/bestseller`,
    method: "GET",
  });

  const [
    { loading: updateProductsLoading, error: updateProductsError },
    executeProductsPut,
  ] = useAxios({}, { manual: true });


  const [checkValue, setCheckValue] = useState(true);

  const [showCheck, setShowCheck] = useState(false);
  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);



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

  if (updateProductsLoading || bestsellerLoading)
    return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
  if (updateProductsError || bestsellerError)
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
              <Modal.Title className="h6">
                ชื่อสินค้า :{" "}
                <span className="text-danger"> {props?.value?.name}</span>
              </Modal.Title>
              <Modal.Title className="h6">
                ประเภทสินค้า :{" "}
                <span className="text-danger">{props?.value?.type}</span>
              </Modal.Title>
              <Modal.Title className="h6">
                ราคา :{" "}
                <span className="text-danger"> {props?.value?.price}</span>
              </Modal.Title>
              <Modal.Title className="h6">
                รายละเอียด :{" "}
                <span className="text-danger">
                  <div
                    dangerouslySetInnerHTML={{ __html: props?.value?.detail }}
                  />
                </span>
              </Modal.Title>
            </Col>
            <Col sm={8}>
              <Card className="mb-3">
                <Card.Body className="d-space-between">
                  <span> ชื่อสินค้า :{" "} {props?.value?.name}</span>
                  <span> ขายสะสม :{" "} {props?.value?.bestseller}</span>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  s
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  s
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  s
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  s
                </Card.Body>
              </Card>
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
