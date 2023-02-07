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
export default function ProductsDeleteModal(props) {
  const [showCheck, setShowCheck] = useState(false);
  const handleShow = () => setShowCheck(true);
  const handleClose = () => setShowCheck(false);
  console.log(props.value);
  return (
    <>
      {props?.value?.status === "กำลังดำเนินการ" ? (     
      <Button
        bsPrefix="create"
        className={showCheck ? "icon active" : "icon "}
        onClick={handleShow}
      >
        ออกใบเสนอราคา
      </Button> ) 
       : ("") }

      <Modal show={showCheck} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            ดูรายการสินค้า คุณ : {props?.value?.firstname}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className="p-2 text-start">รายละเอียดข้อมูล </h2>
          <div class="col-12">
            <div className="row">
              {newFunction("ชื่อผู้สั่งสินค้า", props?.value?.users?.fname + " " + props?.value?.users?.lname)}
              {newFunction("E-mail", props?.value?.users?.email)}
              {newFunction("เบอร์มือถือ", props?.value?.users?.tel)}
            </div>
          </div>
          <Row className="mb-3 ">
            <Col md="6">
              {newFunction2("วันที่สั่งซื้อ", format(new Date(props?.value?.createdAt), "dd/MM/yyyy"))}
              {newFunction2("เวลาที่สั่งซื้อ", format(new Date(props?.value?.createdAt), "HH:mm:ss"))}
              <div class="mb-3">
                <label for="exampleInputEmail1">เพิ่มเติม</label>
                <textarea className="form-control" rows="5" readOnly defaultValue={props?.value?.notes ?? '-'} />
              </div>

              <h4 className="p-2 text-start">ที่อยู่ที่ต้องจัดส่ง</h4>
              <div class="mb-3">
                <textarea className="form-control" rows="9" readOnly defaultValue={`เลขที่ ${props?.value?.address} ตำบล${props?.value?.subDistrict} อำเภอ${props?.value?.district} จังหวัด${props?.value?.province} ${props?.value?.postalCode}`} />
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
                  {props?.value?.OrderDetail?.map((detail, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{detail.products?.name}</td>
                      <td>{detail.sumQty}</td>
                      <td>{detail.sumPrice} บาท</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Modal.Title className="mb-3 ">
                ราคารวมทั้งหมด :{" "}
                <span className="text-danger "> {props?.value?.total} บาท</span>
              </Modal.Title>
            </Col>
          </Row >
        </Modal.Body >
        <Modal.Footer></Modal.Footer>
      </Modal >
    </>
  );

  function newFunction(label, value) {
    return <div class="col-md-4 mb-3">
      <label for="exampleInputEmail1">{label}</label>
      <input class="form-control" value={value} readonly />
    </div>;
  }
  function newFunction2(label, value) {
    return <div class="mb-3">
      <label for="exampleInputEmail1">{label}</label>
      <input class="form-control" value={value} readonly />
    </div>;
  }
}
