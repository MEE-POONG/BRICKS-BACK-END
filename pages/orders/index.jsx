import React, { useEffect, useState } from "react";
import IndexPage from "components/layouts/IndexPage";
import {
  Container,
  Modal,
  Card,
  Button,
  Form,
  Image,
  InputGroup,
  Row,
  Col,
  Table,
  Pagination,
  Badge,
} from "react-bootstrap";
import MyPagination from "@/components/Pagination";
import useAxios from "axios-hooks";
import PageLoading from "@/components/PageChange/pageLoading";
import PageError from "@/components/PageChange/pageError";
// import OrdersAddModal from '@/container/Orders/OrderAddModal'
// import OrdersEditModal from '@/container/Orders/OrderEditModal'
import OrdersDeleteModal from "@/container/Orders/OrderDeleteModal";
import OrdersShowDetailModal from "@/container/Orders/OrderShowDetailModal";
import OrdersConfirmModal from "@/container/Orders/OrderConfirmModal";
import OrderQuotationModal from "@/container/Orders/OrderQuotationModal";
import { format } from "date-fns";

export default function Search() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [searchName, setSearchName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container fluid className="pt-4 px-4">
      <Card className=" text-center rounded shadow p-4">
        <Row>
          <Col>
            <div className=" d-inline  justify-content-center ">
              <Form.Group className="mb-3" onSubmit={handleSubmit}>
                <Form.Label>ค้นหาเลขออเดอร์</Form.Label>
                <form onSubmit={handleSubmit}>
                  <input
                    className="form-control bg-dark border-0"
                    type="search"
                    placeholder="Search"
                    value={searchName}
                    onChange={(e) => {
                      setSearchName(e.target.value);
                    }}
                  />
                  <Button
                    type="submit"
                    variant="success"
                    className="m-2"
                    onClick={() => {
                      setName(searchName);
                    }}
                  >
                    ค้นหาเลขออเดอร์
                  </Button>
                  <Button
                    type="submit"
                    variant="danger"
                    className="m-2"
                    onClick={() => {
                      setName("");
                    }}
                  >
                    ยกเลิก
                  </Button>
                </form>
              </Form.Group>
            </div>
          </Col>

          <Col>
            <Button
              variant="danger"
              className=" mx-2 "
              onClick={() => {
                setStatus("รอการตรวจสอบ");
              }}
            >
              รอการตรวจสอบ
            </Button>
            <Button
              variant="warning"
              className="mx-2"
              onClick={() => {
                setStatus("กำลังดำเนินการ");
              }}
            >
              กำลังดำเนินการ
            </Button>
            <Button
              variant="success"
              className="mx-2"
              onClick={() => {
                setStatus("จัดส่งเสร็จสิ้น");
              }}
            >
              จัดส่งเสร็จสิ้น
            </Button>
          </Col>
        </Row>
      </Card>
      {OrdersPage(name,status)}
    </Container>
  );
}

function OrdersPage(name,status) {
  const [params, setParams] = useState({
    page: "1",
    pageSize: "10",
  });

  const [{ data: ordersData, loading, error }, getOrders] = useAxios({
    url: `/api/orders?page=1&pageSize=10&status=${status}`,
    method: "GET",
  });


  useEffect(() => {
    getOrders().catch((error) => {console.log(error)});
  }, [status]);

  useEffect(() => {
    if (ordersData) {
      setParams({
        ...params,
        page: ordersData.page,
        pageSize: ordersData.pageSize,
      });
    }
  }, [ordersData]); 

  const handleSelectPage = (pageValue) => {
    getOrders({
      url: `/api/orders?page=${pageValue}&pageSize=${params.pageSize}`,
    });
  };
  const handleSelectPageSize = (sizeValue) => {
    getOrders({ url: `/api/orders?page=1&pageSize=${sizeValue}` });
  };

  if (loading) {
    return <PageLoading />;
  }
  if (error) {
    return <PageError />;
  }
  return (
    <div fluid className="pt-4 ">
      <Card className="text-center rounded shadow p-4">
        <div className="d-flex align-items-center mb-4">
          <Card.Title className="mb-0">รายการสินค้า</Card.Title>
        </div>

        {/* <OrdersAddModal getData={getOrders}/> */}

        <MyTable
          data={ordersData?.data}
          setNum={
            ordersData?.page * ordersData?.pageSize - ordersData?.pageSize
          }
          getData={getOrders}
        />
        <MyPagination
          page={ordersData.page}
          totalPages={ordersData.totalPage}
          onChangePage={handleSelectPage}
          pageSize={params.pageSize}
          onChangePageSize={handleSelectPageSize}
        />
      </Card>
    </div>
  );
}
function MyTable(props) {
  const [currentItems, setCurrentItems] = useState(props?.data);
  const [numberSet, setNumberSet] = useState(props?.setNum);
  useEffect(() => {
    setCurrentItems(currentItems);
    console.log(props);
  }, [props]);

  return (
    <Table striped bordersed hover>
      <thead>
        <tr>
          <th className="text-center">No.</th>
          <th>ชื่อผู้สั่งสินค้า</th>
          <th>รายละเอียดที่ต้องจัดส่ง</th>
          <th>วัน/เวลาที่สั่งซื้อ</th>
          <th>สถานะ</th>
          <th>ราคารวม</th>
          <th>จัดการ</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.length
          ? currentItems?.map((item, index) => (
              <tr key={item.id}>
                <td>{item.ordersCode}</td>
                <td>
                  {item?.users?.fname} {item?.users?.lname}
                </td>
                <td>
                  <OrdersShowDetailModal
                    value={item}
                    getData={props?.getData}
                  />
                </td>
                <td>
                  {format(new Date(item?.createdAt), "dd/MM/yyyy HH:mm:ss")}
                </td>
                {item.status === "รอการตรวจสอบ" ? (
                  <td>
                    <Badge bg="danger">{item?.status}</Badge>
                  </td>
                ) : item.status === "กำลังดำเนินการ" ? (
                  <td>
                    <Badge bg="warning">{item?.status}</Badge>
                  </td>
                ) : (
                  <td>
                    <Badge bg="success">{item?.status}</Badge>
                  </td>
                )}

                <td>{item?.total} บาท</td>
                <td>
                  <OrderQuotationModal value={item} getData={props?.getData} />
                  <br/>
                  <OrdersConfirmModal value={item} getData={props?.getData} />
                  <OrdersDeleteModal value={item} getData={props?.getData} />
                 </td>
              </tr>
            ))
          : ""}
      </tbody>
    </Table>
  );
}
Search.layout = IndexPage;
