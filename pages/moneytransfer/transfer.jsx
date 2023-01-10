import Head from 'next/head';
import { useState } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { useRouter } from 'next/router';
import { Container, Table, Button, Form, OverlayTrigger, Badge } from 'react-bootstrap';
import { FaTimes, FaEye, FaEdit, FaHandHoldingUsd, FaReply } from 'react-icons/fa';
export default function TransferPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  // const createClose = () => setShow(false);
  const createShow = () => setShow(true);
  return (
    < >
      <Head>
        <title>HOME | dxx=</title>
        <meta
          name="description"
          content="I2AROBOT 2"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid className=" pt-4 px-4">
        <div className="bg-secondary rounded p-4">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <Button variant="primary" className='btn-square'>
              <FaReply />
            </Button>
            <h6 className="mb-0 w-m-max me-2">โปรเจคการโอน  </h6>
            <Button variant="primary" className='ms-2 w-m-max' onClick={createShow}>
              โอน AUTO
            </Button>
          </div>

          <div className="d-flex align-items-center border-bottom py-2">
            <div className="w-100">
              <Table className="table table-bordered text-center color-d3d3d3">
                <thead>
                  <tr>
                    <th >#</th>
                    <th >Name</th>
                    <th >เลขบัญชี</th>
                    <th >ธนาคาร</th>
                    <th >ยอด</th>
                    <th >สถานะ</th>
                    <th >จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className='text-end'>1</th>
                    <td>ณัฐวีษ์ ตันตระกูล</td>
                    <td>0123456789</td>
                    <td>กสิกรไทย</td>
                    <td>999</td>
                    <td>
                      <Badge bg="warning" text="dark">
                        กำลังโอน
                      </Badge>
                    </td>
                    <td>
                      <Button className="btn btn-sm mx-1">AUTO</Button>
                      <Button className="btn btn-sm mx-1">OTP</Button>
                      {/* <Button className="btn btn-sm mx-1">โอนเสร็จสิ้น</Button> */}
                      <Button className="btn btn-sm mx-1">ยกเลิกโอน</Button>
                    </td>
                  </tr>
                  <tr>
                    <th className='text-end'>1</th>
                    <td>ณัฐวีษ์ ตันตระกูล</td>
                    <td>0123456789</td>
                    <td>กสิกรไทย</td>
                    <td>999</td>
                    <td>
                      <Badge bg="success" text="dark">
                        โอนเสร็จสิ้น
                      </Badge>
                    </td>
                    <td>
                      <Button disabled className="btn btn-sm mx-1">AUTO</Button>
                      <Button disabled className="btn btn-sm mx-1">OTP</Button>
                      {/* <Button disabled className="btn btn-sm mx-1">โอนเสร็จสิ้น</Button> */}
                      <Button disabled className="btn btn-sm mx-1">ยกเลิกโอน</Button>
                    </td>
                  </tr>
                  <tr>
                    <th className='text-end'>1</th>
                    <td>ณัฐวีษ์ ตันตระกูล</td>
                    <td>0123456789</td>
                    <td>กสิกรไทย</td>
                    <td>999</td>
                    <td>
                      <Badge bg="danger" text="dark">
                        ยกเลิก
                      </Badge>
                    </td>
                    <td>
                      <Button disabled className="btn btn-sm mx-1">AUTO</Button>
                      <Button disabled className="btn btn-sm mx-1">OTP</Button>
                      {/* <Button disabled className="btn btn-sm mx-1">โอนเสร็จสิ้น</Button> */}
                      <Button disabled className="btn btn-sm mx-1">ยกเลิกโอน</Button>
                    </td>
                  </tr>
                  <tr>
                    <th className='text-end'>1</th>
                    <td>ณัฐวีษ์ ตันตระกูล</td>
                    <td>0123456789</td>
                    <td>กสิกรไทย</td>
                    <td>999</td>
                    <td>
                      <Badge bg="dark">
                        ผิดพลาด
                      </Badge>
                    </td>
                    <td>
                      <Button disabled className="btn btn-sm mx-1">AUTO</Button>
                      <Button disabled className="btn btn-sm mx-1">OTP</Button>
                      {/* <Button disabled className="btn btn-sm mx-1">โอนเสร็จสิ้น</Button> */}
                      <Button disabled className="btn btn-sm mx-1">ยกเลิกโอน</Button>
                    </td>
                  </tr>
                  <tr>
                    <th className='text-end'>1</th>
                    <td>ณัฐวีษ์ ตันตระกูล</td>
                    <td>0123456789</td>
                    <td>กสิกรไทย</td>
                    <td>999</td>
                    <td>
                      <Badge bg="info" text="dark">
                        รอโอน
                      </Badge>
                    </td>
                    <td>
                      <Button disabled className="btn btn-sm mx-1">AUTO</Button>
                      <Button disabled className="btn btn-sm mx-1">OTP</Button>
                      {/* <Button disabled className="btn btn-sm mx-1">โอนเสร็จสิ้น</Button> */}
                      <Button disabled className="btn btn-sm mx-1">ยกเลิกโอน</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </Container>
    </ >
  );
}
TransferPage.layout = IndexPage;