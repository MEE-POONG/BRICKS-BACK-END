import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import HomeTopEditModal from '@/components/HomeTop/HomeTopEditModal'
import { ReceiptPDF } from '@/components/pdf/RECEIPT'

export default function PDFTest() {
 return (
    <>
    <div className="w-full gap-4 flex items-center justify-center">

<iframe id="iframe" width="100%" height="1150px">
  <ReceiptPDF elementId='iframe' data={{
    customer_name: "บริษทัเอก็ซ์ซสั กรุ๊ป จำา กดัสำา นกังำานใหญ่",
    no: '612/5313',
    id_number: '0-1055-48111-86-7',
    address: 'เลขที่ 1 หมู่ 1 ตำบล บ้านใหม่ อำเภอ บ้านใหม่ จังหวัด นครปฐม 73110',
    date: '23/01/2022',
    inv_data: [
      {
        customer_code: '--',
        po_no: 'POL6509029',
        buyer_name: '--NAME--',
        terms_of_payment: '--Terms of Payment-- ',
        due_date: '--DueDate--'
      },
      {
        customer_code: '--',
        po_no: 'POL6509029',
        buyer_name: '--NAME--',
        terms_of_payment: '--Terms of Payment-- ',
        due_date: '--DueDate--'
      },
    ],
    inv_items: [
      {
        description: 'ค่ามดัจำา โคมไฟ30%ยหี่ อ้SYLVANIA ',
        quantity: '1',
        unit_price: 44346.00,
        amount: 44346.00
      },
      {
        description: 'ค่ามดัจำา โคมไฟ30%ยหี่ อ้SYLVANIA ',
        quantity: '1',
        unit_price: 44346.00,
        amount: 44346.00
      },
      {
        description: 'ค่ามดัจำา โคมไฟ30%ยหี่ อ้SYLVANIA ',
        quantity: '1',
        unit_price: 44346.00,
        amount: 44346.00
      },
    ],
    inv_total: 44346.00,
    inv_vat: 3104.22,
    inv_total_amount: 47450.22,
    inv_total_amount_text: 'สี่หมื่นเจ็ดพันสี่ร้อยห้าสิบบาทยี่สิบสองสตางค์',
  }} />
</iframe>


</div>
    </>
 )
}

PDFTest.layout = IndexPage