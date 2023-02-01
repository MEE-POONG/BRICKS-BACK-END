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
// import OrdersAddModal from '@/container/Orders/OrdersAddModal'
// import OrdersDeleteModal from "@/container/Orders/OrdersDeleteModal";
// import OrdersShowDetailModal from "@/container/Orders/OrderShowDetailModal";
// import OrdersConfirmModal from "@/container/Orders/OrdersConfirmModal";
// import OrdersEditModal from '@/container/Orders/OrdersEditModal'
import { format } from "date-fns";

export default function OrdersPage() {
  const [params, setParams] = useState({
    page: "1",
    pageSize: "10",
  });

  const [status, setStatus] = useState("");

  const [{ data: ordersData, loading, error }, getOrders] = useAxios({
    url: `/api/orders?page=1&pageSize=10&status=${status}`,
    method: "GET",
  });

  useEffect(() => {

    if (loading === false) {
        const getOrdersList = async () => {
          await getOrders();
        };
        getOrdersList();
    }
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
    <Container fluid className="pt-4 px-4">
      <Card className="bg-secondary text-center rounded shadow p-4">
        <Row>
          <Col>
            <div className="d-flex align-items-center mb-4">
              <Card.Title className="mb-0">รายการสินค้า</Card.Title>
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

        {/* <OrdersAddModal getData={getOrders}/> */}

        <MyTable
          data={ordersData?.data}
          setNum={ordersData?.page * ordersData?.pageSize - ordersData?.pageSize}
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
    </Container>
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
        <tr >
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
                  {item.firstname} {item.lastname}
                </td>
                <td>
                  {/* <OrdershowDetailModal value={item} getData={props?.getData} /> */}
                </td>
                <td>
                  {format(new Date(item.createdAt), "dd/MM/yyyy HH:mm:ss")}
                </td>
                {item.status === "รอการตรวจสอบ" ? (
                  <td>
                    <Badge bg="danger">{item.status}</Badge>
                  </td>
                ) : item.status === "กำลังดำเนินการ" ? (
                  <td>
                    <Badge bg="warning">{item.status}</Badge>
                  </td>
                ) : (
                  <td>
                    <Badge bg="success">{item.status}</Badge>
                  </td>
                )}

                <td>{item.total} บาท</td>
                <td>
                  {/* <OrdersConfirmModal value={item} getData={props?.getData} />
                  <OrdersDeleteModal value={item} getData={props?.getData} /> */}
                </td>
              </tr>
            ))
          : ""}
      </tbody>
    </Table>
  );
}
OrdersPage.layout = IndexPage;
