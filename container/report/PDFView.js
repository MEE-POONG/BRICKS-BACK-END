import MyQuotation from "@/components/report/pdfQoutitone";
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
