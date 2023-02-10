import React, { useState } from "react";
import { Modal, Button, ModalBody } from "react-bootstrap";
import { TiDocumentText } from "react-icons/ti";
// import ReceiptData from "@/pages/ReceiptData";
import { ReceiptPDF } from "../pdf/RECEIPT";
export default function ReceiptPrint(props) {
  const [showCheck, setShowCheck] = useState(false);
  const handleShow = () => setShowCheck(true);
  const handleClose = () => setShowCheck(false);

  // console.log(props.value);
  return (
    <>
      {props?.value?.status === "กำลังดำเนินการ" ? (
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
      <Modal show={showCheck} onHide={handleClose} centered size="sm">
        <Modal.Body>
          <p>Loading...</p>
          <ReceiptPDF
            elementId="iframe"
            data={{
              customer_name: `${props?.value?.user?.firstName} ${props?.value?.user?.lastName}`,
              no: "612/5313",
              // id_number: "0-1055-48111-86-7",
              Tel: `${props?.value?.user?.tel} ` ,
              address:
              `เลขที่ ${props?.value?.address} ตำบล${props?.value?.subDistrict} อำเภอ${props?.value?.district} จังหวัด${props?.value?.province} ${props?.value?.postalCode}`,
              date:  `${props?.value?.createdAt}` ,
              inv_data: [
                {
                  customer_code: "--",
                  po_no: "POL6509029",
                  buyer_name: `${props?.value?.user?.firstName} ${props?.value?.user?.lastName}`,
                  terms_of_payment: "--Terms of Payment-- ",
                  due_date: "--DueDate--",
                },
              ],
              inv_items: [
                {
                  description: `${props?.value?.detail?.products?.name}`,
                  quantity: `${props?.value?.detail?.sumQty}`,
                  unit_price: `${props?.value?.detail?.sumPrice}`,
                  amount: `${props?.value?.total}`,
                },
              ],
              inv_total: `${props?.value?.total}`,
              // inv_vat: 3104.22,
              inv_total_amount: `${props?.value?.total}`,
              inv_total_amount_text:
                // "สี่หมื่นเจ็ดพันสี่ร้อยห้าสิบบาทยี่สิบสองสตางค์",
                "",
            }}
          />
        </Modal.Body>
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
