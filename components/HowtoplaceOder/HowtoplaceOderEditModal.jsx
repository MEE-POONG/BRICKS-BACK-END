import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Image } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import useAxios from "axios-hooks";
import AutoComplete from "@/components/AutoComplete";
import CardLoading from "@/components/CardChange/CardLoading";
import CardError from "@/components/CardChange/CardError";
import ModelLoading from "@/components/ModelChange/ModelLoading";
import ModelError from "@/components/ModelChange/ModelError";

import FormData from "form-data";
import { CKEditor } from "ckeditor4-react";

export default function HowtoplaceOderEditModal(props) {
  const [
    { loading: updateHowtoplaceOderLoading, error: updateHowtoplaceOderError },
    executeHowtoplaceOderPut,
  ] = useAxios({}, { manual: true });

  const [checkValue, setCheckValue] = useState(true);

  const [{ loading: imgLoading, error: imgError }, uploadImage] = useAxios(
    { url: "/api/upload", method: "POST" },
    { manual: true }
  );

  const [img, setImg] = useState([]);
  const [image, setImage] = useState([]);
  const [imageURL, setImageURL] = useState([]);

  const [headtitle, setHeadtitle] = useState("");
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState("");
  const [substeps, setSubsteps] = useState("");

  const [showCheck, setShowCheck] = useState(false);
  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);


  useEffect(() => {
    if (props) {
      setHeadtitle(props?.value?.headtitle);
      setTitle(props?.value?.title);
      setSteps(props?.value?.steps);
      setSubsteps(props?.value?.substeps);
      setImg(props?.value?.image);
    }

    if (image.length < 1) return;
    const newImageUrl = [];
    image.forEach((image) => newImageUrl.push(URL.createObjectURL(image)));
    setImageURL(newImageUrl);
  }, [props, image]);

  const onImageProductChange = (e) => {
    setImage([...e.target.files]);
  };

  const handlePutData = async () => {
    setCheckValue(false);
    if (image[0] === undefined) {
      await executeHowtoplaceOderPut({
        url: "/api/howtoplaceOder/" + props?.value?.id,
        method: "PUT",
        data: {
          headtitle: headtitle,
          title: title,
          steps: steps,
          substeps: substeps,
        },
      }).then(() => {
        Promise.all([
          setHeadtitle(""),
          setTitle(""),
          setSteps(""),
          setSubsteps(""),
          props.getHowtoplaceOder(),
        ]).then(() => {
          if (updateHowtoplaceOderLoading?.success) {
            handleClose();
          }
        });
      });
    } else {
      let data = new FormData();
      data.append("file", image[0]);
      const imageData = await uploadImage({ data: data });
      const id = imageData.data.result.id;

      await executeHowtoplaceOderPut({
        url: "/api/howtoplaceOder/" + props?.value?.id,
        method: "PUT",
        data: {
          headtitle: headtitle,
          title: title,
          steps: steps,
          substeps: substeps,
          image: `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,
        },
      }).then(() => {
        Promise.all([
          setHeadtitle(""),
          setTitle(""),
          setSteps(""),
          setSubsteps(""),
          setImg(""),
          props.getHowtoplaceOder(),
        ]).then(() => {
          if (updateHowtoplaceOderLoading?.success) {
            handleClose();
          }
        });
      });
    }
  };

  if (updateHowtoplaceOderLoading || imgLoading)
    return (
      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <CardLoading />
      </Modal>
    );
  if (updateHowtoplaceOderError || imgError)
    return (
      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <CardError />
      </Modal>
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
          <Modal.Title className="text-center">แก้ไขสินค้า</Modal.Title>
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
                    alt="product_img"
                    fluid
                    rounded
                  />
                )}
                {imageURL?.map((imageSrcProduct, index) => (
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
                  onChange={onImageProductChange}
                />
              </Form.Group>
            </Col>

          </Row>
          <Form.Group className="mb-3" controlId="steps">
                <Form.Label>ชื่อหัวข้อย่อย</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="เพิ่มชื่อหัวข้อย่อย"
                  onChange={(e) => {
                    setSteps(e.target.value);
                  }}
                  value={steps}
                  autoComplete="off"
                  isValid={checkValue === false && steps !== "" ? true : false}
                  isInvalid={
                    checkValue === false && steps === "" ? true : false
                  }
                />
              </Form.Group>
          <Form.Group className="mb-3" controlId="detail">
            <Form.Label>รายละเอียดสินค้า</Form.Label>
            <CKEditor
              initData={substeps}
              onChange={(event) => setSubsteps(event.editor.getData())}
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
