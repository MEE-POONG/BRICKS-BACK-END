import Head from 'next/head';
import IndexPage from "components/layouts/IndexPage";
import { useRouter } from 'next/router';
import { Container, Image, Row, Button } from 'react-bootstrap';
import { FaSearch,} from 'react-icons/fa';

export default function DeliveryListPage() {
  const router = useRouter();
  return (
    < >
      <Head>
        <title>HOME | รายการสั่งซื้อ</title>
        <meta
          name="description"
          content="I2AROBOT 2"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container fluid className=" pt-4 px-4">
      <div className="bg-secondary text-center rounded shadow p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h5 className="mb-0">สถานะการจัดส่งสินค้า</h5>
                        <a href="">Show All</a>
                    </div>
                     {/* Search Order List */}
                     <Row className=" g-4">
                    <div className="col-sm-12 col-md-6 col-xl-4">
                      <div className="h-100 bg-secondary rounded p-4">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <h6 className="mb-0">ค้นหา</h6>
                          <form className="d-none d-md-flex ms-4">
                            <input className="form-control bg-dark border-0" type="search" placeholder="Search" />
                          </form>
                          <a className='btn btn-sm btn-light mx-1'> <FaSearch/> </a>
                        </div>
                          
                      </div>
                    </div>
                    </Row>
                     {/* Start table */}
                    <div className="table-responsive">
                        <table className="table text-start align-middle table-bordered table-hover mb-0">
                            <thead>
                                <tr className="text-white">
                                    <th scope="col"><input className="form-check-input" type="checkbox" /></th>
                                    <th scope="col">หมายเลขคำสั่งซื้อ</th>
                                    <th scope="col">ชื่อผู้สั่งซื้อ</th>
                                    <th scope="col">รหัสพัสดุ</th>
                                    <th scope="col">สถานะจัดส่ง</th>
                                    <th scope="col">หมายเหตุ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td>KC0001</td>
                                    <td>long long</td>
                                    <td>TH9785JK544</td>
                                    <td> <a className='btn btn-sm btn-danger'>ยกเลิก</a></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td>KC0002</td>
                                    <td>long long</td>
                                    <td>TH9785JK544</td>
                                    <td> <a className='btn btn-sm btn-primary'>จัดส่งสำเร็จ</a></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><input className="form-check-input" type="checkbox" /></td>
                                    <td>KC0003</td>
                                    <td>long long</td>
                                    <td>TH9785JK544</td>
                                    <td> <a className='btn btn-sm btn-warning'>กำลังจัดส่ง</a></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
      </Container>
    </ >
  );
}
DeliveryListPage.layout = IndexPage;