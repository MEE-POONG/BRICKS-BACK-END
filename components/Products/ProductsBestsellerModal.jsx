import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Image, Card, InputGroup } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import useAxios from "axios-hooks";
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from "@/components/CardChange/CardError";
import ModelLoading from "@/components/ModelChange/ModelLoading";
import ModelError from "@/components/ModelChange/ModelError";

import FormData from "form-data";
import { CKEditor } from "ckeditor4-react";

export default function ProductsBestsellerModal(props) {
  const [showCheck, setShowCheck] = useState(false);
  const [newBestsellerValue, setNewBestsellerValue] = useState(0);
  const [
    { data: bestsellerData, loading: bestsellerLoading, error: bestsellerError },
    executeGetBestseller,
  ] = useAxios(
    {
      url: `/api/products/bestseller`,
      method: "GET",
    },
    { manual: true } // set manual to true to delay the HTTP request
  );

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [detail, setDetail] = useState('');
  const [subTypeId, setSubTypeId] = useState('');

  const [
    { loading: updateProductsLoading, error: updateProductsError },
    executeProductsPut,
  ] = useAxios({}, { manual: true });

  useEffect(() => {
    if (showCheck) {
      executeGetBestseller();
    }
  }, [showCheck]);
  useEffect(() => {
    if (props) {
      setName(props?.value?.name);
      setPrice(props?.value?.price);
      setDetail(props?.value?.detail);
      setSubTypeId(props?.value?.subTypeId);
    }


  }, [props]);

  const handleClose = () => {
    setShowCheck(false);
  };
  const handleShow = () => setShowCheck(true);

  const updateBestseller = async (productId) => {

    await executeProductsPut({
      url: "/api/products/" + props?.value?.id,
      method: "PUT",
      data: {
        name: name,
        price: price,
        subTypeId: subTypeId,
        detail: detail,
        bestseller: props?.value?.bestseller + newBestsellerValue,
      },
    }).then(() => {
      Promise.all([
        setName(''),
        setPrice(''),
        setSubTypeId(''),
        setDetail(''),
        setNewBestsellerValue(''),
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
        <Modal.Body className="h-80">
          <Row>

            <Col sm={8} className="y-scroll h-100">
              {bestsellerData &&
                [...bestsellerData?.data]
                  .sort((a, b) => b.bestseller - a.bestseller)
                  .map((product, index) => {
                    // Exclude if bestseller is 0
                    const isBestseller = props?.value?.id === product?.id;

                    if (product?.bestseller === 0 && !isBestseller) {
                      return null;
                    }
                    return (
                      <Card
                        key={index}
                        className={isBestseller ? "bestseller mb-1" : "mb-1"}
                      >
                        <Card.Body className="d-space-between">
                          <span>
                            {" "}
                            สินค้า : <span>{product?.name}</span>
                          </span>
                          <span>
                            {" "}
                            ขายสะสม : <span>{product?.bestseller}</span>
                          </span>
                        </Card.Body>
                      </Card>
                    );
                  })}
            </Col>
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
              <Modal.Title>
                <InputGroup className="mb-3">
                  <Form.Control type="number" placeholder="เพิ่มยอดขายสะสม" min={0} onChange={(e) => { setNewBestsellerValue(parseInt(e.target.value)) }} />
                  <Button variant="outline-secondary" id="button-addon1" onClick={() => updateBestseller(props?.value?.id)}>
                    ยืนยัน
                  </Button>
                </InputGroup>
              </Modal.Title>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" className="my-0" onClick={handleClose}>
            ยกเลิก
          </Button>
          {/* <Button bg="succeed" className="my-0" >
            ยืนยันสินค้าขายดี
          </Button> */}
        </Modal.Footer>
      </Modal >
    </>
  );
}
