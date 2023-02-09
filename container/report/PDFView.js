import Quotation from "@/components/report/Quotation";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import React from "react";
import { Button } from "react-bootstrap";

const PDFView = () => {
  return (
    <div className="">
      <PDFViewer document={<Quotation />} fileName="ใบเสนอราคา">
        {({ loading }) =>
          loading ? (
            <Button>Loading...</Button> 
          ) : ( 
            <Button>Download</Button>
          )
        }
      </PDFViewer>
    </div>
  );
};

export default PDFView;
