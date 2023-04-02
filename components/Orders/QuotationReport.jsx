import React, { useState } from "react";
import {
  Modal,
  Button,
  ModalBody,
  Row,
  Col,
  Image,
  Table,
} from "react-bootstrap";
import { TiDocumentText } from "react-icons/ti";
import { format } from "date-fns";
// import ReceiptData from "@/pages/ReceiptData";
import { ReceiptPDF } from "../pdf/RECEIPT";
export default function ReceiptPrint(props) {
  const [showCheck, setShowCheck] = useState(false);
  const handleShow = () => setShowCheck(true);
  const handleClose = () => setShowCheck(false);
  return (
    <>
      {props?.value?.status !== "รอการตรวจสอบ" ? (
        <Button
          bsPrefix="create"
          className={showCheck ? "icon active" : "icon "}
          onClick={handleShow}
        >
          <TiDocumentText />
        </Button>
      ) : (
        ""
      )}
      <Modal show={showCheck} onHide={handleClose} centered size="xl">
      <Modal.Header closeButton>
          <Modal.Title>
            ดูรายการสั่งซื้อของ คุณ : {props?.value?.address?.firstname}
          </Modal.Title>
        </Modal.Header>
          <iframe id="iframe" width="100%" height="1150px">
          <ReceiptPDF
            elementId="iframe"
            data={{
              po_no: `${props?.value?.orderCode}`,
              customer_name: `${props?.value?.address?.firstname + " " + props?.value?.address?.lastname}` ,
              no: "612/5313",
              // id_number: "0-1055-48111-86-7",
              Tel: `${props?.value?.address?.tel} ` ,
              address:
              `เลขที่ ${props?.value?.address?.address} ตำบล${props?.value?.address?.subDistrict} อำเภอ${props?.value?.address?.district} จังหวัด${props?.value?.address?.province} ${props?.value?.address?.postalCode}`,
              date:  `${(format(new Date(props?.value?.createdAt), "dd/MM/yyyy"))}` ,
              // inv_data: [
              //   {
              //     customer_code: "--",
              //     buyer_name: `${props?.value?.user?.name}`,
                  // terms_of_payment: "--Terms of Payment-- ",
              //     due_date: "--DueDate--",
              //   },
              // ],
              inv_items: props?.value?.orderDetail || [],
              inv_total: `${props?.value?.totalPrice}`,
              // inv_vat: 3104.22,
              inv_total_amount: `${props?.value?.totalPrice}`,
              inv_total_amount_text:
                // "สี่หมื่นเจ็ดพันสี่ร้อยห้าสิบบาทยี่สิบสองสตางค์",
                "",
            }}
          />
          </iframe>
          <Modal.Footer>

          </Modal.Footer>
      </Modal>

    </>
  );
  

  function newFunction(label, value) {
    return (
      <div class="col-md-4 mb-3">
        <label for="exampleInputEmail1">{label}</label>
        <input class="form-control" value={value} readonly />
      </div>
    );
  }
  function newFunction2(label, value) {
    return (
      <div class="mb-3">
        <label for="exampleInputEmail1">{label}</label>
        <input class="form-control" value={value} readonly />
      </div>
    );
  }
}
