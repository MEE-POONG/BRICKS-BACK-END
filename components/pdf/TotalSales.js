// import formatCurrency from "format-currency";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.fonts = {
  Sarabun: {
    normal:
      "https://cdn.jsdelivr.net/npm/@openfonts/sarabun_thai@1.44.3/files/sarabun-thai-400.woff",
    bold: "https://cdn.jsdelivr.net/npm/@openfonts/sarabun_thai@1.44.3/files/sarabun-thai-700.woff",
    italics:
      "https://cdn.jsdelivr.net/npm/@openfonts/sarabun_thai@1.44.3/files/sarabun-thai-400-italic.woff",
    bolditalics:
      "https://cdn.jsdelivr.net/npm/@openfonts/sarabun_thai@1.44.3/files/sarabun-thai-700-italic.woff",
  },
  Roboto: {
    normal:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf",
    italics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics:
      "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
};
pdfMake.tableLayouts = {
  exampleLayout: {
    hLineWidth: function (i, node) {
      return 1;
    },
    vLineWidth: function (i, node) {
      return 1;
    },
    hLineColor: function (i, node) {
      return "#aaa";
    },
    vLineColor: function (i, node) {
      return "#aaa";
    },
    // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
    paddingLeft: function (i, node) {
      return 10;
    },
    paddingRight: function (i, node) {
      return 10;
    },
    paddingTop: function (i, node) {
      return 2;
    },
    paddingBottom: function (i, node) {
      return 2;
    },
    fillColor: function (rowIndex, node, columnIndex) {
      return "#fff";
    },
  },
};
export function TotalSalesPDF({ elementId, data }) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;


  const table_customer_product = [
    [
      {
        text: "ลําดับ\nNo.",
        style: "tableHeader",
      },
      {
        text: "รหัสสินค้า/รายละเอียด\nCode/Description",
        style: "tableHeader",
        colSpan: 2,
      },
      {},
      {
        text: "จุดหมาย\nTarget",
        style: "tableHeader",
      },
      {
        text: "ที่ขายได้\nSalable",
        style: "tableHeader",
      },
      {
        text: "ผลต่าง\nUnit Price",
        style: "tableHeader",
      },
      {
        text: "จำนวนเงิน\nAmount",
        style: "tableHeader",
      },
    ],
    ...data?.inv_items.map((product, index) => {
      let key = index + 1;
      return [
        {
          text: key,
          style: "tableDetail",
        },
        {
          text: product?.code + "\n" + product?.description,
          style: "tableDetail",
          alignment: "left",
          colSpan: 2,
        },
        {},
        {
          text: product?.quantity,
          style: "tableDetail",
        },
        {
          text: product?.unit,
          style: "tableDetail",
        },
        {
          text: product?.unit_price,
          style: "tableDetail",
        },
        {
          text: product?.amount,
          style: "tableDetail",
        },
      ];
    }),
    [
      {
        text: " ",
        border: [true, false, false, false],
      },
      {
        text: " หมายเหตุ / Remark : ",
        fontSize: 6,
        border: [true, false, false, false],
        colSpan: 2,
      },
      {},
      {
        text: " ",
        border: [false, false, false, false],
      },
      {
        text: "รวมเงิน\nTotal",
        style: "tableDetail",
        alignment: "left",
        colSpan: 2,
      },
      {},
      {
        text: data?.inv_total,
        style: "tableDetail",
        alignment: "center",
        fontSize: 8,
      },
    ],
 
    // [
    //   {
    //     text: " ",
    //     border: [true, false, false, false],
    //   },
    //   {
    //     text: " ",
    //     border: [true, false, false, false],
    //     colSpan: 2,
    //   },
    //   {},
    //   {
    //     text: " ",
    //     border: [false, false, false, false],
    //   },
    //   {
    //     text: "จํานวนเงินหลังหักส่วนลด\nAfter Discount",
    //     style: "tableDetail",
    //     alignment: "left",
    //     colSpan: 2,
    //   },
    //   {},
    //   {
    //     text: data?.inv_after_discount,
    //     style: "tableDetail",
    //     alignment: "center",
    //     fontSize: 8,
    //   },
    // ],
    [
      {
        text: " ",
        border: [true, false, false, false],
      },
      {
        text: " ",
        border: [true, false, false, false],
        colSpan: 2,
      },
      {},
      {
        text: " ",
        border: [false, false, false, false],
      },
      {
        text: "จํานวนเงินภาษีมูลค่าเพิ่ม\nVAT Amount",
        style: "tableDetail",
        alignment: "left",
        colSpan: 2,
      },
      {},
      {
        text: data?.inv_vat_amount,
        style: "tableDetail",
        alignment: "center",
        fontSize: 8,
      },
    ],
    [
      {
        text: ``,
        style: "tableDetail",
        colSpan: 4,
        alignment: "center",
        fontSize: 9,
      },
      {},
      {},
      {},
      {
        text: "รวมยอดเงินทั้งสิ้น\nGrand Total",
        style: "tableDetail",
        alignment: "left",
        colSpan: 2,
      },
      {},
      {
        text: data?.inv_total_amount,
        style: "tableDetail",
        alignment: "center",
        fontSize: 8,
      },
    ],
  ]

  var docDefinition = {
    info: {
      title: "PDF FILE NAME",
    },
    content: [
      /// HEADER
      {
        layout: "noBorders",
        table: {
          widths: ["*", "auto"],
          body: [
            [
              {
                stack: [
                  {
                    text: "ร้านช่างพอง อิฐประสาน",
                    style: "headerCompanyName",
                    margin: [0, 10, 0, 0],
                  },
                  {
                    text: "Dream Block",
                    style: "headerCompanyName",
                    margin: [0, 0, 0, 0],
                  },
                  {
                    text: "บ้านท่าอ่าง ตำบลท่าอ่าง อำเภอโชคชัย จังหวัดนครราชสีมา\n Ban Tha Ang T.Tha Ang , A.Chok Chai, Nakhon Ratchasima 30190\nTEL : 094-3970414\nEmail : apichart.pli@gmail.com",
                    style: "headerCompanyAddress",
                    margin: [0, 0, 0, 0],
                  },
                ],
              },
              {
                stack: [
                  {
                    table: {
                      fontSize: 14,
                      alignment: "center",
                      margin: [0, 0, 0, 0],
                      body: [
                        [
                          {
                            text: "",
                            border: [true, true, false, true],
                          },
                          {
                            alignment: "center",
                            width: 100,
                            text: "\nรายงานยอดขาย\n\n SALES REPORT\n\n",
                            border: [false, true, false, true],
                          },
                          {
                            text: "",
                            border: [false, true, true, true],
                          },
                        ]
                      ]
                    },
                  },
                ],
              },
            ],
          ],
        },
      }, /// END HEADER

      {
        text: " ",
      },

      //INVOICE DETAILS
    //   {
    //     layout: "noBorders",
    //     table: {
    //       widths: ["70%", "30%"],
    //       body: [
    //         [
    //           {
    //             stack: [
    //               {
    //                 //COLUMNS CUSTOMER
    //                 columns: [
    //                   {
    //                     stack: [
    //                       {
    //                         text: "เจ้าหนี้",
    //                         style: "columnsHeader",
    //                       },
    //                       {
    //                         text: "Supplier",
    //                         style: "columnsDetail",
    //                       },
    //                     ],
    //                   },
    //                   {
    //                     text: data?.name + "\n" + data?.address + "\n Tel : " + data?.tel + ', Fax : ' + data?.fax,
    //                     style: "columnsDetail",
    //                   },
    //                 ],
    //                 columnGap: -250,
    //               }, //END OF COLUMS CUSTOMER

    //             ],
    //           },
    //           {
    //             stack: [
    //               {
    //                 //COLUMNS NUMBER
    //                 columns: [
    //                   {
    //                     stack: [
    //                       {
    //                         text: "เลขที่ (No.)",
    //                         style: "columnsHeader",
    //                       },
    //                       {
    //                         text: "",
    //                         style: "columnsDetail",
    //                       },
    //                     ],
    //                   },
    //                   {
    //                     text: data?.no,
    //                     style: "columnsHeader",
    //                   },
    //                 ],
    //               }, //END OF COLUMS NUMBER
    //               {
    //                 //COLUMNS DATE
    //                 columns: [
    //                   {
    //                     stack: [
    //                       {
    //                         text: "วันที่ (Date)",
    //                         style: "columnsHeader",
    //                       },
    //                       {
    //                         text: "",
    //                         style: "columnsDetail",
    //                       },
    //                     ],
    //                   },
    //                   {
    //                     text: data?.date,
    //                     style: "columnsHeader",
    //                   },
    //                 ],
    //               }, //END OF COLUMNS DATE
    //             ],
    //           },
    //         ],
    //       ],
    //     },
    //   },
      //END OF INVOICE DETAILS
      
      {
        text: " ",
      },
      //TABLE OF CUSTOMER PRODUCTS
      {
        layout: "exampleLayout",
        table: {
          widths: [25, "auto", "auto", 30, 'auto', 50, 80],
          body: table_customer_product,
        },
      }, //END TABLE OF PRODUCTS
    ],
    defaultStyle: {
      font: "Sarabun",
    },
    styles: {
      headerCompanyName: {
        fontSize: 12,
        bold: true,
        margin: [10, 0, 10, 0],
      },
      headerCompanyAddress: {
        fontSize: 7,
        margin: [10, 0, 10, 0],
      },
      columnsHeader: {
        fontSize: 8,
        bold: true,
      },
      columnsDetail: {
        fontSize: 8,
        margin: [0, 0, 0, 10],
      },
      tableHeader: {
        fontSize: 8,
        alignment: "center",
        margin: [0, 2, 0, 2],
      },
      tableDetail: {
        fontSize: 7,
        alignment: "center",
        margin: [0, 2, 0, 2],
      },
    },
  };
  return pdfMake.createPdf(docDefinition).getDataUrl((dataUrl) => {
    const iframe = document.getElementById(elementId);
    iframe.src = dataUrl + '#zoom=100&toolbar=0';
  });
}
