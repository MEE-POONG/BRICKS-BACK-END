import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import useAxios from "axios-hooks";

export default function AddOrderListModal(props) {
  const [
    { error: AddOnRateError, loading: AddOnRateLoading },
    executeAddOnRate,
  ] = useAxios({ url: "/api/addOnRate", method: "POST" }, { manual: true });

  const [checkValue, setCheckValue] = useState(true);

  const [showCheck, setShowCheck] = useState(false);

  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);

  const [productId, setProductId] = useState(props?.value?.id);
  const [qtyRate, setQtyRate] = useState(null);
  const [formValues, setFormValues] = useState([{ distance: "", addOn: "" }]);

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

  const addFormFields = () => {
    setFormValues([...formValues, { distance: "", addOn: "" }]);
  };

  const removeFormFields = (i) => {
    const newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  return (
    <>
      <Button
        bsPrefix="create"
        className={showCheck ? "icon active " : "icon "}
        onClick={handleShow}
      >
        เพิ่มรายการสินค้า
      </Button>
      <Modal
        show={showCheck}
        onHide={handleClose}
        centered
        size="md"
        className="form-AddOnRate"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">เพิ่มรายการสินค้า</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
            <Form.Group className="mb-3" controlId="distance">
                  ประเภทสินค้า
                  <Form.Select>
                    <option value="">เลือกสินค้า</option>
                    <option value="">สินค้า1</option>
                    <option value="">สินค้า2</option>
                  </Form.Select>
                  </Form.Group>
            </Row>
            <Row>
              {formValues.map((element, index) => (
                <Row key={index}>
                  <Col>
                    <Form.Group className="mb-3" controlId="distance">
                      ระยะทาง
                      <Form.Control
                        type="number"
                        name="distance"
                        placeholder="เพิ่ม ระยะทาง"
                        onChange={(event) => {
                          handleChange(index, event.target);
                        }}
                        value={element.distance}
                        autoComplete="off"
                        isValid={
                          checkValue === false && element.distance !== ""
                            ? true
                            : false
                        }
                        isInvalid={
                          checkValue === false && element.distance === ""
                            ? true
                            : false
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    ราคาต่อหน่วย
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
                </Row>
              ))}
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
