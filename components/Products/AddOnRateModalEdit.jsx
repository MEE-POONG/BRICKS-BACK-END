import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import useAxios from "axios-hooks";

export default function AddOnRateModaEdit(props) {
  const [{ error: errorMessage, loading: AddOnRateLoading }, executeAddOnRate] =
    useAxios({ url: "/api/addOnRate", method: "POST" }, { manual: true });

  const [
    { data: addOnData, error: addOnError, loading: addOnLoading },
    getAddOnRate,
  ] = useAxios({
    url: `/api/addOnRate/${props?.value?.id}`,
    method: "GET",
  });

  console.log("addOnData", addOnData);
  const [checkValue, setCheckValue] = useState(true);

  const [showCheck, setShowCheck] = useState(false);

  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);

  const [productId, setProductId] = useState(props?.value?.id);
  const [qtyRate, setQtyRate] = useState(null);
  const [formValues, setFormValues] = useState([
    { qtyRateId: "", distance: "", addOn: "" },
  ]);

  const handleSubmit = async () => {
    setCheckValue(false);
    {
      handleClose();
      executeAddOnRate({
        data: {
          productId: productId,
          qtyCheck: qtyRate,
          addOnRate: formValues,
        },
      }).then(() => {
        Promise.all([
          setProductId(""),
          setQtyRate(null),
          setFormValues([{ distance: "", addOn: "" }]),
          props.getData(),
        ]).then(() => {
          if (AddOnRateLoading?.success) {
            handleClose();
          }
        });
      });
    }
  };

  const handleChange = (i, e) => {
    const newFormValues = [...formValues];
    newFormValues[i][e.name] = e.value;
    setFormValues(newFormValues);
  };

  const addFormFields = (qtyRateId) => {
    setFormValues([
      ...formValues,
      { qtyRateId: qtyRateId, distance: "", addOn: "" },
    ]);
  };

  const removeFormFields = (i) => {
    const newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  // if (imgLoading || AddOnRateLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
  // if (imgError || errorMessage) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

  return (
    <>
      <Button
        bsPrefix="create"
        className={showCheck ? "icon active " : "icon "}
        onClick={handleShow}
      >
        แก้ไขเรทราคา
      </Button>
      <Modal
        show={showCheck}
        onHide={handleClose}
        centered
        size="xl"
        className="form-AddOnRate"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">เพิ่มเรทราคา</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Row xs="12">
            <Col xs={{ span: 3 }}>
              <Form.Label>จำนวนก้อน ( เช่น 100 คือ 0-100 ก้อน)</Form.Label>
            </Col>
            <Col xs={{ span: 4 }}>
              <Form.Label>ระยะทาง ( เช่น 100 คือ 0-100 กิโลเมตร )</Form.Label>
            </Col>
            <Col xs={{ span: 4 }}>
              <Form.Label>
                ราคาที่บวกเพิ่ม ( เช่น 2 คือ บวกเพิ่ม 2 บาทจากราคาต้นทุน)
              </Form.Label>
            </Col>
            <Col xs={{ span: 1 }}></Col>
          </Row> */}

          {addOnData?.map((qtyRate, index) => (
            <Row key={index} xs="12">
              <Col xs={{ span: 3 }}>
                <Form.Group className="mb-3 " controlId="qty">
                  <Form.Control
                    type="number"
                    name="qty"
                    placeholder="เพิ่ม จำนวนก้อน"
                    onChange={(event) => {
                      setQtyRate(event.target.value);
                    }}
                    value={qtyRate.qtyCheck}
                    autoComplete="off"
                    isValid={
                      checkValue === false && length !== "" ? true : false
                    }
                    isInvalid={
                      checkValue === false && length === "" ? true : false
                    }
                  />
                </Form.Group>
              </Col>
              <Col xs={{ span: 9 }}>
                {qtyRate?.addOnRate?.map((element, index) => (
                  <Row key={index}>
                    <Col xs={{ span: 5 }}>
                      <Form.Group className="mb-3" controlId="distance">
                        <Form.Control
                          type="number"
                          name="distance"
                          placeholder="เพิ่ม ระยะทาง"
                          onChange={(event) => {
                            handleChange(index, event.target);
                          }}
                          value={element.length}
                          autoComplete="off"
                          isValid={
                            checkValue === false && element.length !== ""
                              ? true
                              : false
                          }
                          isInvalid={
                            checkValue === false && element.length === ""
                              ? true
                              : false
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={{ span: 5 }}>
                      <Form.Group className="mb-3 " controlId="addOn">
                        <Form.Control
                          type="number"
                          name="addOn"
                          placeholder="ราคาบวกเพิ่ม"
                          onChange={(event) => {
                            handleChange(index, event.target);
                          }}
                          value={element.addOn}
                          autoComplete="off"
                          isValid={
                            checkValue === false && element.addOn !== ""
                              ? true
                              : false
                          }
                          isInvalid={
                            checkValue === false && element.addOn === ""
                              ? true
                              : false
                          }
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={{ span: 2 }}>
                      <Button
                        type="button"
                        className="me-2"
                        onClick={() => addFormFields(qtyRate.id)}
                      >
                        เพิ่ม
                      </Button>
                      {index ? (
                        <Button
                          type="button"
                          bg="danger"
                          className="  btn-danger"
                          onClick={() => removeFormFields(index)}
                        >
                          ลบ
                        </Button>
                      ) : null}
                    </Col>
                  </Row>
                ))}
                {formValues.map((element, index) => (
                  <Row key={index}>
                    <Col xs={{ span: 5 }}>
                      <Form.Group className="mb-3" controlId="distance">
                        <Form.Control
                          type="number"
                          name="distance"
                          placeholder="เพิ่ม ระยะทาง"
                          onChange={(event) => {
                            handleChange(index, event.target);
                          }}
                          value={element.length}
                          autoComplete="off"
                          isValid={
                            checkValue === false && element.length !== ""
                              ? true
                              : false
                          }
                          isInvalid={
                            checkValue === false && element.length === ""
                              ? true
                              : false
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={{ span: 5 }}>
                      <Form.Group className="mb-3 " controlId="addOn">
                        <Form.Control
                          type="number"
                          name="addOn"
                          placeholder="ราคาบวกเพิ่ม"
                          onChange={(event) => {
                            handleChange(index, event.target);
                          }}
                          value={element.addOn}
                          autoComplete="off"
                          isValid={
                            checkValue === false && element.addOn !== ""
                              ? true
                              : false
                          }
                          isInvalid={
                            checkValue === false && element.addOn === ""
                              ? true
                              : false
                          }
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={{ span: 2 }}>
                      <Button
                        type="button"
                        className="me-2"
                        onClick={() => addFormFields(qtyRate.id)}
                      >
                        เพิ่ม
                      </Button>
                      {index ? (
                        <Button
                          type="button"
                          bg="danger"
                          className="  btn-danger"
                          onClick={() => removeFormFields(index)}
                        >
                          ลบ
                        </Button>
                      ) : null}
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>
          ))}

          <Row>
            <span className="text-danger">
              หมายเหตุ 1 ช่องเพิ่มจำนวนก้อน ถ้าใส่ 100 คือ ( 1-100 ) ก้อน
            </span>
          </Row>
          <Row>
            <span className="text-danger">
              หมายเหตุ 2 ช่องเพิ่มระยะทาง ถ้าใส่ 50 คือ ( 0-50 ) กิโลเมตร
            </span>
          </Row>
          <Row>
            <span className="text-danger">
              หมายเหตุ 3 ช่องบวกราคาเพิ่ม ถ้าใส่ 2 คือ บวกราคาจากต้นทุนเพิ่ม 2
              บาท ต่อ ก้อน
            </span>
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
