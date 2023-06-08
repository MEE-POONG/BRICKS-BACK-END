import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Image,
  FormGroup,
} from "react-bootstrap";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import useAxios from "axios-hooks";
import AutoComplete from "@/components/AutoComplete";
import CardLoading from "@/components/CardChange/CardLoading";
import CardError from "@/components/CardChange/CardError";
import FormData from "form-data";

import axios from "axios";
import { CKEditor } from "ckeditor4-react";

export default function OrderAddModal(props) {
  const [{ data: productsData }, getProducts] = useAxios({
    url: "/api/products",
  });
  const [{ data: productTypeData }, getProductsType] = useAxios({
    url: "../api/productType?",
  });

  const [
    { data: productsPost, error: errorMessage, loading: ProductsLoading },
    executeProducts,
  ] = useAxios({ url: "/api/products", method: "POST" }, { manual: true });

  const [checkValue, setCheckValue] = useState(true);

  const [showCheck, setShowCheck] = useState(false);

  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);

  const [{ loading: imgLoading, error: imgError }, uploadImage] = useAxios(
    { url: "/api/upload", method: "POST" },
    { manual: true }
  );

  const [image, setImage] = useState([]);
  const [imageURL, setImageURL] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (image.length < 1) return;
    const newImageUrl = [];
    image.forEach((image) => newImageUrl.push(URL.createObjectURL(image)));
    setImageURL(newImageUrl);
  }, [image]);

  const onImageProductChange = (e) => {
    setImage([...e.target.files]);
  };

  const handleSubmit = async (event) => {
    setCheckValue(false);
    if (name !== "" && price !== "") {
      handleClose();

      let data = new FormData();
      data.append("file", image[0]);
      const imageData = await uploadImage({ data: data });
      const id = imageData.data.result.id;

      await executeProducts({
        data: {
          name: name,
          price: price,
          type,
          type,
          image: `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,
        },
      }).then(() => {
        Promise.all([
          setName(""),
          setPrice(""),
          setImage(""),
          setType(""),

          props.getData(),
        ]);
      });
    }
  };

  

  return (
    <>
      <Button
        bsPrefix="create"
        className={showCheck ? "icon active d-flex" : "icon d-flex"}
        onClick={handleShow}
      >
        <FaPlus /> เพิ่มรายการสั่งซื้อ
      </Button>
      <Modal
        show={showCheck}
        onHide={handleClose}
        centered
        size="lg"
        className="form-Products"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">เพิ่มรายการสั่งซื้อ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md="7">
              <Form.Group className="mb-3" controlId="formFile">
                {/* <Form.Label className="text-center">
                  กรอกรายละเอียดสั่งซื้อ
                </Form.Label> */}

                <Form.Label className="d-block">ชื่อลูกค้า</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ชื่อ  - นามสกุล"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                  autoComplete="off"
                  isValid={checkValue === false && name !== "" ? true : false}
                  isInvalid={checkValue === false && name === "" ? true : false}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="price">
                <Form.Label>เบอร์โทรศัพท์</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="เบอร์โทรศัพท์"
                  autoComplete="off"
                  isValid={checkValue === false && price !== "" ? true : false}
                  isInvalid={
                    checkValue === false && price === "" ? true : false
                  }
                />
              </Form.Group>


              <Form.Label className="d-block mt-3">ที่อยู่จัดส่ง</Form.Label>
              <div className="mb-3">
                <textarea className="form-control" rows="5" />
              </div>

              <Form.Label className="d-block mt-3">
                หมายเหตุเพิ่มเติม
              </Form.Label>
              <div className="mb-3">
                <textarea className="form-control" rows="3" />
              </div>
            </Col>

            <Col md="5">
              <Form.Group className="mb-3" controlId="price">
                <Form.Label>ประเภทสินค้า</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                  value={type}
                  autoComplete="off"
                  isValid={checkValue === false && type !== "" ? true : false}
                  isInvalid={checkValue === false && type === "" ? true : false}
                >
                  <option value="">ประเภทสินค้า</option>
                  {productTypeData?.data?.map((productType, index) => (
                    <option key={index} value={productType.id}>
                      {productType.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="price">
                <Form.Label>ราคาสินค้า</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="เพิ่ม ราคาของสินค้า"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  value={price}
                  autoComplete="off"
                  isValid={checkValue === false && price !== "" ? true : false}
                  isInvalid={
                    checkValue === false && price === "" ? true : false
                  }
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button bg="danger" className="my-0 btn-danger" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button bg="succeed" className="my-0" onClick={handleSubmit}>
            ยืนยันการทำรายการ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
