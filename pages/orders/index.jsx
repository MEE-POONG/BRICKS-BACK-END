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
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import th from "date-fns/locale/th";
registerLocale("th", th);

export default function Search() {


  
  const [name, setName] = useState("");
  const [searchName, setSearchName] = useState("");

  const [status, setStatus] = useState("");
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  
  const [{ data: ordersData, loading, error }, getOrders] = useAxios({
    url: `/api/orders?page=1&pageSize=10&status=${status}&startDate=${startDate}&endDate=${endDate}`,
    method: "GET",
  });

const handleClearfilter = () => {
    setStartDate("");
    setEndDate("");
 
  };

    useEffect(() => {
    getOrders().catch((error) => {
      console.log(error);
    });
  }, [status,startDate,endDate]);

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
            <DatePicker
              placeholderText="เลือกวันที่เริ่มต้น"
              locale="th"
              dateFormat="dd-MM-yyyy"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            ถึง
            <DatePicker
              locale="th"
              placeholderText="เลือกวันที่สิ้นสุด"
              dateFormat="dd-MM-yyyy"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
            <Button onClick={handleClearfilter}>Clear All</Button>
          </Col>

          <Col>
            <Button
              variant="danger"
              className=" mx-1 mt-1 w-50 "
              onClick={() => {
                setStatus("รอการตรวจสอบ");
              }}
            >
              รอการตรวจสอบ
            </Button>
            <br />
            <Button
              variant="warning"
              className="mx-1 mt-1 w-50"
              onClick={() => {
                setStatus("กำลังดำเนินการ");
              }}
            >
              กำลังดำเนินการ
            </Button>
            <br />
            <Button
              variant="success"
              className="mx-1 mt-1 w-50"
              onClick={() => {
                setStatus("จัดส่งเสร็จสิ้น");
              }}
            >
              จัดส่งเสร็จสิ้น
            </Button>
          </Col>
        </Row>
      </Card>
      {OrdersPage(ordersData,getOrders,loading,error)}
    </Container>
  );
}

function OrdersPage(ordersData,getOrders,loading,error) {
  const [params, setParams] = useState({
    page: "1",
    pageSize: "10",
  });

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
                  <br />
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
