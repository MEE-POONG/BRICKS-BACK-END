import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Image ,Table } from "react-bootstrap";
import { FaCheck}  from "react-icons/fa";
import useAxios from "axios-hooks";
import AutoComplete from "@/components/AutoComplete";
import CardError from "@/components/CardChange/CardError";
import ModelLoading from "@/components/ModelChange/ModelLoading";
import ModelError from "@/components/ModelChange/ModelError";
import FormData from "form-data";
import { format } from "date-fns";

export default function OrderEditModal(props) {
  const [
    { loading: updateOrderLoading, error: updateOrderError },
    executeOrderPut,
  ] = useAxios({}, { manual: true });

  const [checkValue, setCheckValue] = useState(true);

  const [status, setStatus] = useState("");

  const [showCheck, setShowCheck] = useState(false);
  const handleClose = () => { setShowCheck(false), setCheckValue(true); };
  const handleShow = () => setShowCheck(true);
  const handlePutData = () => { setCheckValue(false);

    if (props?.value?.status == "รอการตรวจสอบ") {
      executeOrderPut({
        url: "/api/order/" + props?.value?.id,
        method: "PUT",
        data: {
          status: "กำลังดำเนินการ",
        },
      }).then(() => {
        Promise.all([setStatus(""), props.getData()]).then(() => {
          if (updateOrderLoading?.success) {
            handleClose();
          }
        });
      });
    } else if (props?.value?.status == "กำลังดำเนินการ") {
      executeOrderPut({
        url: "/api/order/" + props?.value?.id,
        method: "PUT",
        data: {
          status: "จัดส่งเสร็จสิ้น",
        },
      }).then(() => {
        Promise.all([setStatus(""), props.getData()]).then(() => {
          if (updateOrderLoading?.success) {
            handleClose();
          }
        });
      });
    }
  };

  // if (loading || updateOrderLoading) return <ModelLoading showCheck={showCheck}/>
  // if (error || updateOrderError) return <ModalError show={showCheck} fnShow={handleClose} centered size='lg'/>

  return (
    <>
       {props?.value?.status === "จัดส่งเสร็จสิ้น" ? ( "" ) 
       : (
        <Button
        bsPrefix="edit"
        className={showCheck ? "icon active" : "icon"}
        onClick={handleShow}
      >
        <FaCheck />
      </Button>
          ) }

      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-center ">ยืนยันรายการสินค้า :
          <span className="text-danger "> {props?.value?.orderCode}</span> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row >
            <Col md="12">
            <div className="row">
             <h4 className="p-2 text-start">รายละเอียดข้อมูล </h4>
            {newFunction("ชื่อผู้สั่งสินค้า", props?.value?.users.fname + " " + props?.value?.users.lname)}
            {newFunction("สถานะ", props?.value?.status )}
         </div>
          </Col>
          <Col md="12 mt-2">
              <h4>สินค้าที่ต้องจัดส่ง</h4>
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
                  {props?.value?.OrderDetail?.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{product.products?.name}</td>
                      <td>{product.sumQty}</td>
                      <td>{product.sumPrice} บาท</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Modal.Title className="mb-3 ">
                ราคารวมทั้งหมด :{" "}
                <span className="text-danger "> {props?.value?.total} บาท</span>
              </Modal.Title>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button bg="danger" className="my-0 btn-danger" onClick={handleClose}>
            ยกเลิก
          </Button>
          {props?.value?.status === "รอการตรวจสอบ" ? (
            <Button bg="succeed" className="my-0" onClick={handlePutData}>
              ยืนยันรายการทำรายการ
            </Button>
          ) : props?.value?.status === "กำลังดำเนินการ" ?  (
            <Button bg="succeed" className="my-0" onClick={handlePutData}>
              ยืนยันการจัดส่ง
            </Button>
          ) : (
            ""
          )}

        </Modal.Footer>
      </Modal>
    </>
  );
  function newFunction(label, value) {
    return <div class="col-4 mb-3">
      <label for="exampleInputEmail1">{label}</label>
      <input class="form-control" value={value} readonly />
    </div>;
  }
}
