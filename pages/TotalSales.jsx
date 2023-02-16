import React from "react";
import IndexPage from "components/layouts/IndexPage";
import { TotalSalesPDF } from "@/components/pdf/TotalSales";
import { Container } from "react-bootstrap";

export default function TotalSaleData() {
    return (
        <Container fluid className="pt-4 px-4">
             <iframe id="iframe" width="830px" height="1150px">
                  <TotalSalesPDF elementId='iframe' data={{
                    name: "บริษทัเอก็ซ์ซสั กรุ๊ป จำา กดัสำา นกังำานใหญ่",
                    no: '612/5313',
                    id_number: '0-1055-48111-86-7',
                    address: 'เลขที่ 1 หมู่ 1 ตำบล บ้านใหม่ อำเภอ บ้านใหม่ จังหวัด นครปฐม 73110',
                    date: '23/01/2022',
                    tel: '02-656-9039',
                    fax: '02-656-9039',
                    inv_data: [
                      {
                        ref_no: '',
                        refer_to: '',
                        supplier_code: '',
                        credit: '30 วัน',
                        delivery_within_date: ''
                      },
                    ],
                    inv_items: [
                      {
                        code: 'SYLPROOF SUPERIA II 2X126 Cm',
                        description: '2xRefLED T8 STD-S 24W 2800LM DL T ',
                        quantity: '1000',
                        unit: '1000',
                        unit_price: 44346.00,
                        amount: 44346.00
                      },
                      {
                        code: 'SYLPROOF SUPERIA II 2X126 Cm (NO BATTERY BACK UP)',
                        description: '2xRefLED T8 STD-S 24W 2800LM DL T ',
                        quantity: '1000',
                        unit: '1000',
                        unit_price: 44346.00,
                        amount: 44346.00
                      },
                      {
                        code: 'RefLED T8 STD-S 24W 2800LM DL T',
                        description: ' ',
                        quantity: '1000',
                        unit: '1000',
                        unit_price: 44346.00,
                        amount: 44346.00
                      },
                    ],
                    inv_total: 44346.00,
                    inv_vat_amount: 44346.00,
                    // inv_discount: 0,
                    // inv_after_discount: 47450.22,
                    inv_total_amount: 47450.22,
                    inv_total_amount_text: 'สี่หมื่นเจ็ดพันสี่ร้อยห้าสิบบาทยี่สิบสองสตางค์',
                  }} />
                </iframe>
        </Container>
    )
}

TotalSaleData.layout = IndexPage;