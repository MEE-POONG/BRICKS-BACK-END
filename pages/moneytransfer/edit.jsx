import Head from 'next/head';
import { useState } from 'react';
import IndexPage from "components/layouts/IndexPage";
import { useRouter } from 'next/router';
import { Container, Table, Button, Form, OverlayTrigger, Badge } from 'react-bootstrap';
import { FaTimes, FaEye, FaEdit, FaHandHoldingUsd, FaReply } from 'react-icons/fa';
export default function EditPage() {
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
            <h6 className="mb-0 w-m-max me-2">แก้ไขรายการโอน</h6>
            <Button variant="primary" className='ms-2 w-m-max' onClick={createShow}>
              โอน AUTO
            </Button>
          </div>

          <div className="d-flex align-items-center border-bottom py-2">
            <div className="w-100 ms-3">
              <Table className="table table-bordered text-center color-d3d3d3">
                <thead>
                  <tr>
                    <th >#</th>
                    <th >Name</th>
                    <th >เลขบัญชี</th>
                    <th >ธนาคาร</th>
                    <th >ยอด</th>
                    <th >สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className='text-end'>1</th>
                    <td>
                      <Form.Control type="text" value={"ณัฐวีษ์ ตันตระกูล"} />
                    </td>
                    <td>
                      <Form.Control type="text" value={"0123456789"} />
                    </td>
                    <td>
                      <Form.Select aria-label="Default select example">
                        <option disabled >--- โปรดเลือก ชื่อธนาคาร ---</option>
                        <option value="กสิกรไทย จำกัด">ธนาคาร กสิกรไทย จำกัด</option>
                        <option value="กรุงไทย จำกัด">ธนาคาร กรุงไทย จำกัด</option>
                        <option value="ไทยพาณิชย์ จำกัด">ธนาคาร ไทยพาณิชย์ จำกัด</option>
                        <option value="กรุงเทพ จำกัด">ธนาคาร กรุงเทพ จำกัด</option>
                        <option value="กรุงศรีอยุธยา จำกัด">ธนาคาร กรุงศรีอยุธยา จำกัด</option>
                        <option value="ทหารไทยธนชาต จำกัด">ธนาคาร ทหารไทยธนชาต จำกัด</option>
                        <option value="ทหารไทย จำกัด">ธนาคาร ทหารไทย จำกัด</option>
                        <option value="ธนชาต จำกัด">ธนาคาร ธนชาต จำกัด</option>
                        <option value="ออมสิน">ธนาคาร ออมสิน</option>
                        <option value="เพื่อการเกษตรและสหกรณ์การเกษตร">ธนาคาร เพื่อการเกษตรและสหกรณ์การเกษตร</option>
                        <option value="เกียรตินาคิน จำกัด">ธนาคาร เกียรตินาคิน จำกัด</option>
                        <option value="ซิตี้แบ้งค์">ธนาคาร ซิตี้แบ้งค์</option>
                        <option value="ซีไอเอ็มบี ไทย จำกัด">ธนาคาร ซีไอเอ็มบี ไทย จำกัด</option>
                        <option value="ดอยซ์แบงก็">ธนาคาร ดอยซ์แบงก็</option>
                        <option value="ทิสโก้ จำกัด">ธนาคาร ทิสโก้ จำกัด</option>
                        <option value="ยูโอบี จำกัด">ธนาคาร ยูโอบี จำกัด</option>
                        <option value="แลนด์ แอนด์ เฮ้าส์">ธนาคาร แลนด์ แอนด์ เฮ้าส์</option>
                        <option value="อาคารสงเคราะห์">ธนาคาร อาคารสงเคราะห์</option>
                        <option value="อิสลามแห่งประเทศไทย">ธนาคารอิสลามแห่งประเทศไทย</option>
                        <option value="ไอซีบีซี">ธนาคารไอซีบีซี</option>
                        <option value="สแตนดาร์ดชาร์เตอร์ด">ธนาคารสแตนดาร์ดชาร์เตอร์ด</option>
                        <option value="ทรูมันนี่ วอลเล็ท">ทรูมันนี่ วอลเล็ท</option>
                      </Form.Select>
                    </td>
                    <td>999</td>
                    <td>
                      <Badge bg="info" text="dark">
                        รอโอน
                      </Badge>
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
EditPage.layout = IndexPage;