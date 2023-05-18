import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Image,
  Table,
  FormControl,
} from "react-bootstrap";
import { FaTrash, FaPlus } from "react-icons/fa";
import useAxios from "axios-hooks";
import CardLoading from "@/components/CardChange/CardLoading";
import CardError from "@/components/CardChange/CardError";
import { format } from "date-fns";
export default function OrderShowDetailModal(props) {
  const [showCheck, setShowCheck] = useState(false);
  const handleShow = () => setShowCheck(true);
  const handleClose = () => setShowCheck(false);
  return (
    <>
      <Button
        bsPrefix="create"
        className={showCheck ? "icon active" : "icon "}
        onClick={handleShow}
      >
        ดูรายละเอียด
      </Button>
      <Modal show={showCheck} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            ดูรายการสั่งซื้อของ คุณ : {props?.value?.address?.firstname + " " + props?.value?.address?.lastname}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className="p-2 text-start">รายละเอียดข้อมูล </h2>
          <div className="col-12">
            <div className="row">
              {newFunction("ชื่อผู้สั่งสินค้า", props?.value?.address?.firstname + " " + props?.value?.address?.lastname)}
              {newFunction("E-mail", props?.value?.user?.email)}
              {newFunction("เบอร์มือถือ", props?.value?.address?.tel)}
            </div>
          </div>
          <Row className="mb-3 ">
            <Col md="6">
              {newFunction2("วันที่สั่งซื้อ", format(new Date(props?.value?.createdAt), "dd/MM/yyyy"))}
              {newFunction2("เวลาที่สั่งซื้อ", format(new Date(props?.value?.createdAt), "HH:mm:ss"))}
              <div className="mb-3">
                <label for="exampleInputEmail1">เพิ่มเติม</label>
                <textarea className="form-control" rows="5" readOnly defaultValue={props?.value?.notes ?? '-'} />
              </div>

              <h4 className="p-2 text-start">ที่อยู่ที่ต้องจัดส่ง</h4>
              <div className="mb-3">
                <textarea className="form-control" rows="9" readOnly defaultValue={`เลขที่ ${props?.value?.address?.address} ตำบล${props?.value?.address?.subDistrict} อำเภอ${props?.value?.address?.district} จังหวัด${props?.value?.address?.province} ${props?.value?.address?.postalCode}`} />
              </div>
            </Col>
            <Col md="4">
            <h4 className="mb-3 text-start">รูปสลิป</h4>
              <div className="zoom ">
              <Image src={props?.value?.image} width="400px" height="450px" />
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
                  {props?.value?.orderDetail?.map((product, index) => (
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
                <span className="text-danger "> {props?.value?.totalPrice} บาท</span>
              </Modal.Title>
            </Col>
          </Row >
        </Modal.Body >
        <Modal.Footer></Modal.Footer>
      </Modal >
    </>
  );

  function newFunction(label, value) {
    return <div className="col-md-4 mb-3">
      <label for="exampleInputEmail1">{label}</label>
      <input className="form-control" value={value} readonly />
    </div>;
  }
  function newFunction2(label, value) {
    return <div className="mb-3">
      <label for="exampleInputEmail1">{label}</label>
      <input className="form-control" value={value} readonly />
    </div>;
  }
}
