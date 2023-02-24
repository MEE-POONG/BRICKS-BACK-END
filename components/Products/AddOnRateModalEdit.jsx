import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import useAxios from "axios-hooks";

export default function AddOnRateModalEdit(props) {
  const [{ error: AddOnRateError, loading: AddOnRateLoading }, excAddOnRate] =
    useAxios({ url: "/api/addOnRate/addOn", method: "POST" }, { manual: true });

  const [
    { error: AddOnRatePutError, loading: AddOnRatePutLoading },
    putAddOnRate,
  ] = useAxios(
    { url: "/api/addOnRate/addOn", method: "PUT" },
    { manual: true }
  );

  const [
    { error: delAddOnRateError, loading: delAddOnRateLoading },
    delAddOnRate,
  ] = useAxios({ manual: true });

  const [
    { data: addOnData, error: addOnError, loading: addOnLoading },
    getAddOnRate,
  ] = useAxios({
    url: `/api/addOnRate/${props?.value?.id}`,
    method: "GET",
  });

  useEffect(() => {
    setAddonDataNew(addOnData);
  }, [addOnData]);

  console.log("addOnData", addOnData);
  const [addOnDataNew, setAddonDataNew] = useState(addOnData);
  console.log("addOnDataNew", addOnDataNew);
  const [checkValue, setCheckValue] = useState(true);

  const [showCheck, setShowCheck] = useState(false);

  const handleClose = () => {
    setShowCheck(false), setCheckValue(true);
  };
  const handleShow = () => setShowCheck(true);

  const [formValues, setFormValues] = useState([]);
  console.log("formValues", formValues);
  const handleSubmit = async () => {
    setCheckValue(false);
    try {
      handleClose();

      const formFilterEmpty = formValues.filter(
        (value) => value.distance !== "" || value.addOn !== ""
      );
      if (formFilterEmpty.length !== 0) {
        excAddOnRate({
          data: {
            value: formFilterEmpty,
          },
        }).then(() => {
          Promise.all([setFormValues([]), props.getData()]).then(() => {
            if (AddOnRateLoading?.success) {
              handleClose();
            }
          });
        });
      } else {
        setFormValues([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //แก้ อาเรย์ ที่ เพิ่มมาใหม่
  const handleChange = (i, e) => {
    const newFormValues = [...formValues];
    newFormValues[i][e.name] = e.value;
    setFormValues(newFormValues);
  };

  //แก้ อาเรย์ อันเก่า qtyRate
  const handleChangeOld = (i, e) => {
    const newFormValues = [...addOnDataNew];
    newFormValues[i][e.name] = parseFloat(e.value);
    setAddonDataNew(newFormValues);
  };

  //แก้ อาเรย์ อันเก่า addOn
  const handleChangeOldAddOn = (i, ic, e) => {
    const newFormValues = [...addOnDataNew];
    newFormValues[i].addOnRate[ic][e.name] = parseFloat(e.value);
    setAddonDataNew(newFormValues);
  };

  const addFormFields = (qtyRateId) => {
    setFormValues([
      ...formValues,
      { qtyRateId: qtyRateId, distance: "", addOn: "" },
    ]);
  };

  const handleDelAddOnRate = (id) => {
    try {
      delAddOnRate({
        url: "/api/addOnRate/" + id,
        method: "DELETE",
      }).then(() => getAddOnRate());
    } catch (error) {
      console.log(error);
    }
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
          {addOnData?.map((qtyRate, index) => (
            <Row key={index} xs="12">
              <Col xs={{ span: 3 }}>
                <Form.Group className="mb-3 " controlId="qty">
                  <Form.Control
                    type="number"
                    name="qtyCheck"
                    placeholder="เพิ่ม จำนวนก้อน"
                    onChange={(event) => {
                      handleChangeOld(index, event.target);
                    }}
                    value={qtyRate?.qtyCheck}
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
                {qtyRate?.addOnRate?.map((element, indexChild) => (
                  <Row key={indexChild}>
                    <Col xs={{ span: 5 }}>
                      <Form.Group className="mb-3" controlId="distance">
                        <Form.Control
                          type="number"
                          name="length"
                          placeholder="เพิ่ม ระยะทาง"
                          onChange={(event) => {
                            handleChangeOldAddOn(
                              index,
                              indexChild,
                              event.target
                            );
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
                            handleChangeOldAddOn(
                              index,
                              indexChild,
                              event.target
                            );
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
                      <Button
                        type="button"
                        bg="danger"
                        className="btn-danger"
                        onClick={() => handleDelAddOnRate(element.id)}
                      >
                        ลบ
                      </Button>
                    </Col>
                  </Row>
                ))}
                {formValues?.map((element, index) =>
                  element.qtyRateId === qtyRate.id ? (
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
                        <Button
                          type="button"
                          bg="danger"
                          className="  btn-danger"
                          onClick={() => removeFormFields(index)}
                        >
                          ลบ
                        </Button>
                      </Col>
                    </Row>
                  ) : null
                )}
              </Col>
              <div className="border-bottom border-1 mb-3"></div>
            </Row>
          ))}

          <Row>
            <span className="text-danger">
              หมายเหตุ 1 ช่องเพิ่มจำนวนก้อน ถ้าใส่ 100 คือ 100 ก้อนขึ้นไป
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
