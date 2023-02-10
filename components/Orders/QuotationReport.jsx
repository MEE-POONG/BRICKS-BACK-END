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
import { TiDocumentText } from "react-icons/ti";
import { format } from "date-fns";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
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
          <TiDocumentText />
        </Button>
      ) : (
        ""
      )}

      <Modal show={showCheck} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            ดูรายการสินค้า คุณ : {props?.value?.firstname}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );

}
