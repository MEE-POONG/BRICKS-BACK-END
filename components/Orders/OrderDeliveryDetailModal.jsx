import axios from "axios";
import React, { useState } from "react";
import {
  Modal,
  Button
} from "react-bootstrap";
import Swal from "sweetalert2";
import moment from "moment";
import { format } from "date-fns";
import { FaPencilAlt } from "react-icons/fa";

export default function OrderDeliveryDetailModal(props) {
  const [showCheck, setShowCheck] = useState(false);
  const handleShow = () => setShowCheck(true);
  const handleClose = () => setShowCheck(false);



  return (
    <>
      {
        props?.value?.deliveryAt ?
          <div className="flex">
            {format(new Date(props?.value?.deliveryAt), "dd/MM/yyyy")}
            <Button
              bsPrefix="edit"
              className={"icon"}
              onClick={handleShow}
            >
              <FaPencilAlt />
            </Button>
          </div> :
          <Button
            bsPrefix="create"
            className={showCheck ? "icon active" : "icon "}
            onClick={handleShow}
          >
            กำหนดการจัดส่งสินค้า
          </Button>
      }

      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            กำหนดการจัดส่งสินค้า คุณ : {props?.value?.address?.firstname + " " + props?.value?.address?.lastname}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className="p-2 text-start">รายละเอียดข้อมูลการจัดส่ง </h2>
          <div class="d-flex">

            <label className="text-nowrap align-self-center" for="exampleInputEmail1">วันที่จัดส่งสินค้า: &nbsp;</label>
            <input
              defaultValue={props?.value?.deliveryAt ? format(new Date(props?.value?.deliveryAt), "yyyy-MM-dd") : ""}
              className="form-control"
              type="date"
              id="date"
              name="date"
            />
            <button class="btn btn-success text-nowrap" onClick={async () => {
              Swal.fire({
                title: "กำลังบันทึกข้อมูล",
                allowOutsideClick: false,
                didOpen: () => {
                  Swal.showLoading();
                },
              });
              const date = document.getElementById("date").value;
              if (!date) {
                return Swal.fire({
                  icon: "error",
                  title: "กรุณากรอกข้อมูลให้ครบ",
                  showConfirmButton: false,
                  timer: 3000,
                });
              }
              await axios({
                url: "/api/orders/" + props?.value?.id,
                method: "PATCH",
                data: {
                  date: moment(date),
                }
              })
              Swal.fire({
                icon: "success",
                title: "บันทึกข้อมูลสำเร็จ",
                showConfirmButton: false,
                timer: 3000,
              });
              props.getData();
              handleClose();
            }}>บันทึกข้อมูล</button>
          </div>
        </Modal.Body >
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );

}
