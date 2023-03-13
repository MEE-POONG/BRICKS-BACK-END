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
export function ReceiptPDF({ elementId, data }) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;


  // const table_customer_detail = [[
  //   {
  //     text: "รหัสลูกค้า\nCustomer Code",
  //     style: "tableHeader",
  //   },
  //   {
  //     text: "เลขที่ใบสั่งซื้อ\nP/O No.",
  //     style: "tableHeader",
  //   },
  //   {
  //     text: "ชื่อผู้สั่งซื้อ\nBuyer Name",
  //     style: "tableHeader",
  //   },
  //   {
  //     text: "เงื่อนไขการชำระเงิน\nTerms of Payment",
  //     style: "tableHeader",
  //   },
  //   // {
  //   //   text: "วันครบกำหนดชำระ\nDueDate",
  //   //   style: "tableHeader",
  //   // },
  // ],
  // ...data?.inv_data.map((user) => {
  //   return [
  //     {
  //       text: user?.customer_code,
  //       style: "tableDetail",
  //     },
  //     {
  //       text: user?.po_no,
  //       style: "tableDetail",
  //     },
  //     {
  //       text: user?.buyer_name,
  //       style: "tableDetail",
  //     },
  //     {
  //       text: user?.terms_of_payment,
  //       style: "tableDetail",
  //     },
  //     {
  //       text: user?.due_date,
  //       style: "tableDetail",
  //     },
  //   ];
  // })
  // ]
  const table_customer_product = [
    [
      {
        text: "รายการ\nItems",
        style: "tableHeader",
      },
      {
        text: "รายการสินค้าหรือบริการ\nDescription",
        style: "tableHeader",
      },
      {
        text: "จำนวน\nQuantity",
        style: "tableHeader",
      },
      {
        text: "ราคาหน่วยละ\nUnit Price",
        style: "tableHeader",
      },
      {
        text: "จำนวนเงิน\nAmount",
        style: "tableHeader",
      },
    ],
    ...data?.inv_items?.map((orderDetail, index) => {
      let key = index + 1;
      return [
        {
          text: key,
          style: "tableDetail",
        },
        {
          text: orderDetail?.products?.name,
          style: "tableDetail",
        },
        {
          text: orderDetail?.sumQty,
          style: "tableDetail",
        },
        {
          text: orderDetail?.products?.price,
          style: "tableDetail",
        },   
        {
          text: orderDetail?.sumPrice          ,
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
        text: " ",
        border: [true, false, false, false],
      },
      {
        text: "รวมราคาทั้งสิ้น\nTotal Price",
        style: "tableDetail",
        colSpan: 2,
      },
      {},
      {
        text: (data?.inv_total),
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
    //   },
    //   {
    //     text: "ภาษีมูลค่าเพิ่ม\nValue Added Tax",
    //     style: "tableDetail",
    //     colSpan: 2,
    //   },
    //   {},
    //   {
    //     text: (data?.inv_vat),
    //     style: "tableDetail",
    //     alignment: "center",
    //     fontSize: 8,
    //   },
    // ],
    [
      {
        text: data?.inv_total_amount_text,
        style: "tableDetail",
        colSpan: 2,
        alignment: "center",
        fontSize: 9,
      },
      {},
      {
        text: "จำนวนเงินรวมทั้งสิ้น\nTotal Amount",
        style: "tableDetail",
        colSpan: 2,
      },
      {},
      {
        text: (data?.inv_total_amount),
        style: "tableDetail",
        alignment: "center",
        fontSize: 8,
      },
    ],
  ]

  var docDefinition = {
    info: {
      title: "ใบเสร็จรับเงิน",
    },
    content: [
      /// HEADER
      {
        layout: "noBorders",
        table: {
          widths: ["auto", "50%", "*"],
          body: [
            [
              {
                stack: [
                  {
                    image: 'logo',
                    width: 180,
                    height: 100,
                    alignment: "center",
                    margin: [0, 0, 0, 0],
                  },
                  {
                    text: "เลขประจำตัวผู้เสียภาษีอากร",
                    alignment: "center",
                    width: "auto",
                    style: {
                      fontSize: 10,
                    },
                    margin: [0, 0, 0, 0],
                  },
                  {
                    text: "0125555015738",
                    alignment: "center",
                    style: {
                      fontSize: 10,
                    },
                    margin: [0, 0, 0, 0],
                  },
                ],
              },
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
                      body: [["ต้นฉบับลูกค้า"]],
                    },
                  },
                  {
                    text: "(เอกสารออกเป็นชุด)",
                    style: {
                      fontSize: 8,
                    },
                    alignment: "center",
                    margin: [0, 2, 0, 0],
                  },
                ],
              },
            ],
          ],
        },
      }, /// END HEADER
      {
        text: "_______________________________________________________________________________________________________________________________________________________________",
        fontSize: 10,
        margin: [0, -11, 0, 0],
        alignment: "center",
      },
      {
        text: "_______________________________________________________________________________________________________________________________________________________________",
        fontSize: 10,
        margin: [0, -11, 0, 0],
        alignment: "center",
      },
      {
        //INVOICE TITLE
        text: "ใบเสร็จรับเงิน\nRECEIPT",
        style: {
          fontSize: 12,
          bold: true,
        },
        alignment: "center",
        margin: [0, 15, 0, 0],
      }, //END OF INVOICE TITLE
      //INVOICE DETAILS
      {
        layout: "noBorders",
        table: {
          widths: ["70%", "30%"],
          body: [
            [
              {
                stack: [
                  {
                    //COLUMNS CUSTOMER
                    columns: [
                      {
                        stack: [
                          {
                            text: "เลขที่ใบสั่งซื้อ",
                            style: "columnsHeader",
                          },
                          {
                            text: "",
                            style: "columnsDetail",
                          },
                        ],
                      },
                      {
                        text: data?.po_no,
                        style: "columnsHeader",
                      },
                    ],
                    columnGap: -230,
                  }, //END OF COLUMS CUSTOMER
                  {
                    //COLUMNS CUSTOMER
                    columns: [
                      {
                        stack: [
                          {
                            text: "ชื่อลูกค้า",
                            style: "columnsHeader",
                          },
                          {
                            text: "Customer Name",
                            style: "columnsDetail",
                          },
                        ],
                      },
                      {
                        text: data?.customer_name,
                        style: "columnsDetail",
                      },
                    ],
                    columnGap: -230,
                  }, //END OF COLUMS CUSTOMER
                  {
                    //COLUMNS NUMBER OF TAXER
                    columns: [
                      {
                        text: "เบอร์โทร:",
                        style: "columnsHeader",
                      },
                      {
                        text: data?.Tel,
                        style: "columnsDetail",
                      },
                    ],
                    columnGap: -230,
                  }, //END OF COLUMNS NUMBER OF TAXER
                  {
                    //COLUMNS ADDRESS
                    columns: [
                      {
                        stack: [
                          {
                            text: "ที่อยู่",
                            style: "columnsHeader",
                          },
                          {
                            text: "Address",
                            style: "columnsDetail",
                          },
                        ],
                      },
                      {
                        text: data?.address,
                        style: "columnsDetail",
                      },
                    ],
                    columnGap: -230,
                  }, //END OF COLUMNS COLUMNS ADDRESS
                ],
              },
              {
                stack: [
                  {
                    //COLUMNS NUMBER
                    columns: [
                      {
                        stack: [
                          {
                            text: "เลขที่",
                            style: "columnsHeader",
                          },
                          {
                            text: "No.",
                            style: "columnsDetail",
                          },
                        ],
                      },
                      {
                        text: data?.no,
                        style: "columnsHeader",
                      },
                    ],columnGap: -50,
                  }, //END OF COLUMS NUMBER
                 
                  {
                    //COLUMNS DATE
                    columns: [
                      {
                        stack: [
                          {
                            text: "วันที่",
                            style: "columnsHeader",
                          },
                          {
                            text: "Date",
                            style: "columnsDetail",
                          },
                        ],
                      },
                      {
                        text: data?.date,
                        style: "columnsHeader",
                      },
                    ],
                    columnGap: -50,
                  }, //END OF COLUMNS DATE
                ],
              },
            ],
          ],
        },
      },
      //END OF INVOICE DETAILS
      //TABLE OF CUSTOMER DETAILS
      {
        // layout: "exampleLayout",
        // table: {
        //   widths: ["*", "*", "*", "*", "*"],
        //   body: table_customer_detail
        // },
      }, //END TABLE OF CUSTOMER DETAILS
      {
        text: " ",
      },
      //TABLE OF CUSTOMER PRODUCTS
      {
        layout: "exampleLayout",
        table: {
          widths: [25, "*", 30, 50, 80],
          body: table_customer_product,
        },
      }, //END TABLE OF PRODUCTS
      //TABLE OF TABLE OF SIGNATURE
      {
        layout: "noBorders",
        table: {
          widths: ["*"],
          body: [
            [
              {
                columns: [
                  {
                    layout: "exampleLayout",
                    table: {
                      widths: ["*", "*", "*"],
                      body: [
                        [
                          {
                            text: "ชําระโดย 🆩 โอนเงิน/BANK TRANSFER",
                            style: "tableHeader",
                            border: [false, false, false, false],
                          },
                          {
                            text: "🆩 เงินสด/CASH",
                            style: "tableHeader",
                            border: [false, false, false, false],
                          },
                          {
                            text: "ในนาม ร้านช่างพอง อิฐประสาน\nFor Dream Block",
                            style: "tableHeader",
                            border: [false, false, false, false],
                          },
                        ],
                        [
                          {
                            text: "ธนาคาร.........................................................\nสาขา..............................................................\nเลขที่..............................................................\nลงวันที่...........................................................",
                            style: "tableDetail",
                            border: [false, false, false, false],
                          },
                          {
                            text: "\nผู้รับเงิน.........................................................\n\nวันที่...............................................................",
                            style: "tableDetail",
                            border: [false, false, false, false],
                          },
                          {
                            text: "\n\n.............................................................\nผู้มีอำนาจลงนาม / Authorized Signature",
                            style: "tableDetail",
                            border: [false, false, false, false],
                          },
                        ],
                      ],
                    },
                  },
                ],
              },
            ],
          ],
        },
      }, //END TABLE OF SIGNATURE

      {
        text: "_______________________________________________________________________________________________________________________________________________________________",
        fontSize: 10,
        margin: [0, -11, 0, 0],
        alignment: "center",
      },
      
      //SUB DETAILS
      {
        text: 'ใบเสร็จรับเงินฉบับนี้จะมีผลสมบูรณ์เมื่อเช็คของท่านเรียกเก็บเงินจากธนาคารเรียบร้อยแล้ว"\n\n This Receipt will become valid only when cheque in payment has been cleared by the bank.',
        fontSize: 8,
        margin: [0, 5, 0, 10],
      },
      //END OF SUB DETAILS
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
        marginLeft: 0,
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
    images: {
      logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAAXNSR0IArs4c6QAAAARzQklUCAgICHwIZIgAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAR0aVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pgo8eDp4bXBtZXRhIHhtbG5zOng9J2Fkb2JlOm5zOm1ldGEvJz4KPHJkZjpSREYgeG1sbnM6cmRmPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjJz4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOkF0dHJpYj0naHR0cDovL25zLmF0dHJpYnV0aW9uLmNvbS9hZHMvMS4wLyc+CiAgPEF0dHJpYjpBZHM+CiAgIDxyZGY6U2VxPgogICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+CiAgICAgPEF0dHJpYjpDcmVhdGVkPjIwMjMtMDItMDE8L0F0dHJpYjpDcmVhdGVkPgogICAgIDxBdHRyaWI6RXh0SWQ+ODdmNzRjNTEtYTA5Ny00ZjllLTg2MWEtMjVmOWJiNTdhYTAyPC9BdHRyaWI6RXh0SWQ+CiAgICAgPEF0dHJpYjpGYklkPjUyNTI2NTkxNDE3OTU4MDwvQXR0cmliOkZiSWQ+CiAgICAgPEF0dHJpYjpUb3VjaFR5cGU+MjwvQXR0cmliOlRvdWNoVHlwZT4KICAgIDwvcmRmOmxpPgogICA8L3JkZjpTZXE+CiAgPC9BdHRyaWI6QWRzPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpkYz0naHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8nPgogIDxkYzp0aXRsZT4KICAgPHJkZjpBbHQ+CiAgICA8cmRmOmxpIHhtbDpsYW5nPSd4LWRlZmF1bHQnPmxvZ29zaGFuZ3BvbmcgLSAxPC9yZGY6bGk+CiAgIDwvcmRmOkFsdD4KICA8L2RjOnRpdGxlPgogPC9yZGY6RGVz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PkONqE9NCUNdtm7dOreTSZAfN2dkMhncddddOPPMM3HMMcfg9NNPx1VXXYW33lKYjQvIJkxFIhFkMpmCbT0ej+zx8kMO4XAYO3bswJ49exSvg1CPwWDA4OBgieh+85vfxEknnYRPfepTWLNmDW688caSfXfu3Invfe9783WpBDHvtJyg+3w+8f9M/DK8YK3vigG37QbSvFCq9th+ITmO4egUhP6zK4TxqmkeeHZiNuHs60eXns8jsSi/diewO1H6OuOCAWnX/BLLrMVt1AjXDJRmrLPYPyDE5TctEUa2NkrI85GbqV4s6qy0rRZIifno6CjOPfdcXHPNNXj88ccxPT2NN998Ez/60Y+wcuVKfPvb34ZcREmnMMmpeECL1WqFyVT+F8DKuIj6IVWJsH//flx77bU466yzsGPHDpx00km46qqrxCY+iUQCV199NU444QR861vfwi9+8YtGXDpB1J2WFfToQWBtjyDOqx3ADIQEsmBGSIrbHhVe/9dls/umD8WjvSbBBT9sF1z2UweFZjJ3SxhTaw8Na8m39FmLWDlRv3y50NAln2fCs673qeysuz1/0cC2WWYBNg8DD79biJOraQhTTyHPR26m+uaVwgIEEFrFzlXUeZ6H3+8vEfNsNovPfOYz8Pl8+NjHPoannnoKjz32GPbv348nnngCw8PD+O53v4uvfOUrZY+t5ELlOA6Tk4XjWL1er6zrXSnOTsyNWCxWkrQYiUQwMzODI488EqtWrcLQ0BDS6TTuvPNOXHbZZejt7cU111yDVCqFyy+/XJxLQBDtRkvWoQNCJ7VhuyDOa3uAmw95WM/pPdQFzi5YxPmYtMLraR74kx84uefQ8JNDWrErXvg9MDvFrVzf91+dKJTNFWPVC/H0K18CdheFeJcsEK6Rufjz57af7RWsXLWJbkDlU95qwZZdQr97qZK2TUPCImXLLkHUx8bG8J3vfKfic6RSKQSDQclY91133YW9e4X0e5vNhjvuuAMAMDAwgKGhIdxyyy24+OKL8ZOf/ATnnnsuTjvttJJjqEmmikQisFqt4rasXr3ceFU18XylWDxRnng8jng8DpPJBL1eD71ej56eHqxbtw433HADfvvb34plgZ/85CfF/c444wx85zvfwfHHH4/p6WlotVoaikK0HS0n6Czhas8Bwa0+bBcE12MU3OnMok7zgrt9rcQ4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",
    },
  };
  
  // return  pdfMake.createPdf(docDefinition).open({}, window);
  
  return pdfMake.createPdf(docDefinition).getDataUrl((dataUrl) => {
    const iframe = document.getElementById(elementId);
    iframe.src = dataUrl + '#zoom=100';
  });

 

}
