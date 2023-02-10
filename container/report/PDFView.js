import MyQuotation from "@/components/pdf/pdfQoutitone";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import React from "react";
import { Button } from "react-bootstrap";

const PDFView = () => {
  return (
    <div className="">
      <PDFViewer document={<MyQuotation />} fileName="ใบเสนอราคา">
      </PDFViewer>
    </div>
  );
};

export default PDFView;
