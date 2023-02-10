import MyQuotation from "@/components/pdf/pdfQoutitone";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import { Button } from "react-bootstrap";

const PDFDownload = () => {
  return (
    <div>
      <PDFDownloadLink document={<MyQuotation />} fileName="ใบเสนอราคา">
        {({ loading }) =>
          loading ? <Button>Loading.....</Button> : <Button>Download</Button>
        }
      </PDFDownloadLink>
    </div>
  );
};
export default PDFDownload;
