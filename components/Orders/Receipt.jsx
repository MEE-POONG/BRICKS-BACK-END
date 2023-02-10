import Head from "next/head";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import DefaultLayout from "../components/default/layout";
import Script from "next/script";
import React from "react";

import { ArrowRight, StepComponent } from "../components/stepComponent";

import { AiFillFilePdf, AiFillSave, AiOutlineFileDone } from 'react-icons/ai';
import { BiBookContent, BiCart, BiNews } from 'react-icons/bi';
import { GiStabbedNote } from 'react-icons/gi';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { ReceiptPDF } from "@/components/pdf/gen/RECEIPT";



export default function Home() {
  const { data: session } = useSession();
  const [showModal, setShowModal] = React.useState(false);
  const [showModal2, setShowModal2] = React.useState(false);

  const routes = useRouter();
  useEffect(() => {
    if (!session) {
      // routes.push("/login");
    }
  }, [session]);

  return (
    <div>
      <Head>
        <title>Recipe | BlueC ERP</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefaultLayout>

        <div className="w-full grid grid-cols-1 gap-4 mb-4">
          <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">

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
            <div className="w-full md:w-3/3 px-8 mt-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Attach Files
              </label>

              <div className="flex justify-center items-center w-full">
                <label for="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>

            </div>
          </div>
        </div>
       
      </DefaultLayout >

      {/* <Script async defer src="https://buttons.github.io/buttons.js"></Script>
      <Script src="https://demo.themesberg.com/windster/app.bundle.js"></Script> */}
    </div >
  );


}
