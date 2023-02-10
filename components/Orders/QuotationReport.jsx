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
import { TiDocumentText } from "react-icons/ti";
import ReceiptData from "@/pages/ReceiptData";
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
      {/* <Modal show={showCheck} onHide={handleClose} centered size="xl">
          <ReceiptData/>
      </Modal> */}
    </>
  );
}

