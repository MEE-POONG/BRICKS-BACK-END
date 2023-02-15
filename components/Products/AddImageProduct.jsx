import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { FaPlus, FaUserCircle } from "react-icons/fa";
import useAxios from "axios-hooks";
import AutoComplete from "@/components/AutoComplete";
import CardLoading from "@/components/CardChange/CardLoading";
import CardError from "@/components/CardChange/CardError";
import FormData from "form-data";

export default function AddImageProductModal(props) {
  const [
    { error: errorMessage, loading: AddImageProductLoading },
    executeAddImageProduct,
  ] = useAxios(
    { url: "/api/imageProduct", method: "POST" },
    { manual: true }
  );

  const[{loading: imgLoading, error: imgError}, uploadImage]= useAxios({url: '/api/upload', method: 'POST'},{manual: true});

  const [checkValue, setCheckValue] = useState(true);

  const [showCheck, setShowCheck] = useState(false);

  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);

  const [productId, setProductId] = useState(props?.value?.id);

  const [image, setImage] = useState([]);
  const [formValues, setFormValues] = useState([{ image: "" }]);
  const [imageURL, setImageURL] = useState([]);

  console.log(image);


  useEffect(() => {
    if (image.length < 1) return;
    const newImageUrl = [];
    image.forEach((image) => newImageUrl.push(URL.createObjectURL(image)));
    setImageURL(newImageUrl);
  }, [image]);

  const onImageProductChange = (e) => {
    setImage([...e.target.files]);
  };
  
  
  const handleSubmit = async () => { 
    setCheckValue(false);
    handleClose();
    for (var i = 0; i < image.length; i++) { 

    let data =new FormData()
    data.append('file', image[i])
    const imageData = await uploadImage({data: data})
    const id =imageData.data.result.id

   await  executeAddImageProduct({
        data: {
          productId: productId,
          image: `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,
        },
      })
      .then(
          () => {
            if (AddImageProductLoading?.success) {
              handleClose();
            }
          }
        );
    }
    Promise.all([setProductId(""), setImage(""), props.getData()])
      

  };

  if (imgLoading || AddImageProductLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
  if (imgError || errorMessage) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

  return (
    <>
      <Button
        bsPrefix="create"
        className={showCheck ? "icon active " : "icon "}
        onClick={handleShow}
      >
        เพิ่มรูปสินค้า
      </Button>
      <Modal
        show={showCheck}
        onHide={handleClose}
        centered
        size="lg"
        className="form-AddImageProduct"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">เพิ่มรูปสินค้า</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
            <Row>
              <Col xs={{ span: 10 }}>
                <Form.Group className="mb-3" controlId="formFile">
                  <Form.Label className="text-center">
                    เลือกรูปสินค้า
                  </Form.Label>
                  <Form.Label className="d-block">รูปภาพ</Form.Label>
                  {imageURL.map((imageSrcProduct, index) => (
                    <Image
                      key={index}
                      className="mb-2"
                      style={{ height: 200 }}
                      src={imageSrcProduct}
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

            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button bg="danger" className="my-0 btn-danger" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button bg="succeed" className="my-0" onClick={handleSubmit}>
            ยืนยันการเพิ่ม
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
