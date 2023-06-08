import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Image,
  FormGroup,
  Table,
} from "react-bootstrap";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import useAxios from "axios-hooks";
import FormData from "form-data";

import AddOrderListModal from "./AddOrderListModal";

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

  const addFormFields = () => {
    setFormValues([...formValues, { distance: "", addOn: "" }]);
  };

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

  const handleDelAddOnRate = (id) => {
    try {
      delAddOnRate({
        url: "/api/addOnRate/" + id,
        method: "DELETE",
      }).then(() => getAddOnRate());
    } catch (error) {
      // console.log(error);
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
        size="xl"
        className="form-Products"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">เพิ่มรายการสั่งซื้อ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md="5">
              <Form.Label className="d-block">ข้อมูลลูกค้า</Form.Label>

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

            <Col md="7">
              <Form.Label className="d-block">
                {" "}
                ข้อมูลสินค้า/การสั่งซื้อ
              </Form.Label>

              <div className="d-flex align-items-center justify-content-between ">
                <Form.Label className="d-block"> รายการสั่งซื้อ : </Form.Label>
                <AddOrderListModal />
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>ชื่อสินค้า</th>
                    <th>จำนวนสินค้า</th>
                    <th>ราคารวม</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>ช่องลม</td>
                    <td>500</td>
                    <td>4,000 บาท</td>
                  </tr>
                </tbody>
              </Table>

              <Row>
                <Col xl={{ span: 6 }}>
                  <Form.Group className="mb-3" controlId="formFile">
                    <Form.Label className="d-block">
                      ประเภทรถที่ใช้ขนส่ง :
                    </Form.Label>
                    <Form.Select>
                      <option value="">เลือกสินค้า</option>
                      <option value="">สินค้า1</option>
                      <option value="">สินค้า2</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col xl={{ span: 6 }}>
                  <Form.Label className="d-block"> วันที่จัดส่ง :</Form.Label>
                  <div className="d-flex mb-3">
                    <input
                      defaultValue={
                        props?.value?.deliveryAt
                          ? format(
                              new Date(props?.value?.deliveryAt),
                              "yyyy-MM-dd"
                            )
                          : ""
                      }
                      className="form-control"
                      type="date"
                      id="date"
                      name="date"
                    />
                  </div>
                </Col>
              </Row>

              <Col xl={6}>
                <Form.Group className="mb-3" controlId="formFile">
                  <Form.Label className="d-block">ค่ามัดจำ</Form.Label>
                  {imageURL.map((imageSrcSlip, index) => (
                    <Image
                      key={index}
                      className="mb-2"
                      style={{ height: 200 }}
                      src={imageSrcSlip}
                      alt="product_img"
                      fluid
                      rounded
                    />
                  ))}
                  <Form.Control
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onImageProductChange}
                  />
                </Form.Group>
              </Col>

              <Modal.Title className="mb-3 text-center">
                ราคารวมทั้งสิ้น : <span className="text-danger "> บาท</span>
              </Modal.Title>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button bg="danger" className="my-0 btn-danger" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button bg="succeed" className="my-0" onClick={handleSubmit}>
            บันทึกการทำรายการ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
