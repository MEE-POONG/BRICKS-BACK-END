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
import CardLoading from "@/components/CardChange/CardLoading";

export default function HomeTopEditModal(props) {
  const [
    { loading: updateHomeTopLoading, error: updateHomeTopError },
    executeHomeTopPut,
  ] = useAxios({}, { manual: true });

  const [{ loading: imgLoading, error: imgError }, uploadImage] = useAxios(
    { url: "/api/upload", method: "POST" },
    { manual: true }
  );

  const [img, setImg] = useState([]);
  const [image, setImage] = useState([]);
  const [imageURL, setImageURL] = useState([]);

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
      setImg(props?.value?.image);
      setFromHomeTop({
        title: props?.value?.title,
        subTitle: props?.value?.subTitle,
      });
    }

    if (image.length < 1) return;
    const newImageUrl = [];
    image.forEach((image) => newImageUrl.push(URL.createObjectURL(image)));
    setImageURL(newImageUrl);

  }, [props, image]);

  const onImageSrcHomePageChange = (e) => {
    setImage([...e.target.files]);
  };


  const handlePutData = async () => {
    setCheckValue(false);
    if (image[0] === undefined) {
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
    } else{

      let data = new FormData();
      data.append("file", image[0]);
      const imageData = await uploadImage({ data: data });
      const id = imageData.data.result.id;

      await executeHomeTopPut({
        url: "/api/homeTop/" + props?.value?.id,
        method: "PUT",
        data: {
          title: fromHomeTop?.title,
          subTitle: fromHomeTop?.subTitle,
          image: `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,
        },
      }).then(() => {
        setImage(""),
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

  if (updateHomeTopLoading)
  return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
  if (updateHomeTopError)
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
         แก้ไข
      </Button>

      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            แก้ไขหน้าบ้าน
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <Form.Group className="mb-3" controlId="formFile">
                <Form.Label className="text-center">เลือกรูปปก</Form.Label>

                {imageURL?.length === 0 && (
                  <Image
                    className="mb-2"
                    style={{ height: 200 }}
                    src={img}
                    alt="home_img"
                    fluid
                    rounded
                  />
                )}
                {imageURL?.map((imageSrcHomePage, index) => (
                  <Image
                    key={index}
                    className="mb-2"
                    style={{ height: 200 }}
                    src={imageSrcHomePage}
                    alt="home_img"
                    fluid
                    rounded
                  />
                ))}
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={onImageSrcHomePageChange}
                />
              </Form.Group>
    
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
