import MyQuotation from "@/components/report/pdfQoutitone";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";

const PDFDownload = () => {
  return (
    <div>
        <PDFDownloadLink document={ <MyQuotation />} fileName="ใบเสนอราคา">
           
        </PDFDownloadLink>
      
    </div>
  );
};
export default PDFDownload;