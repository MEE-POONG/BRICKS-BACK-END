import React, { useEffect, useState } from "react";
import IndexPage from "components/layouts/IndexPage";
import {
  Container,
  Card,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import useAxios from "axios-hooks";
// import OrdersAddModal from '@/container/Orders/OrderAddModal'
// import OrdersEditModal from '@/container/Orders/OrderEditModal'
import { format } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import th from "date-fns/locale/th";
import TotalSalesPage from "@/components/TotalSales/TotalSalesPage";
registerLocale("th", th);

export default function SearchOrders() {
  const [orderCode, setOrderCode] = useState("");
  const [searchOrderCode, setSearchOrderCode] = useState("");

  const [status, setStatus] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const [startDate, setStartDate] = useState("");
  const [searchStartDate, setSearchStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");

  const [{ data: ordersData, loading, error }, getOrders] = useAxios({
    url: `/api/orders?page=1&pageSize=10&orderCode=${orderCode}&status=${status}&startDate=${startDate}&endDate=${endDate}`,
    method: "GET",
  });

  const SearchAllData = () => {
    setStartDate(searchStartDate);
    setEndDate(searchEndDate);
    setStatus(searchStatus);
    setOrderCode(searchOrderCode);
  };

  const handleClearfilter = () => {
    setOrderCode("");
    setSearchOrderCode("");

    setStartDate("");
    setSearchStartDate("");

    setEndDate("");
    setSearchEndDate("");

    setStatus("");
    setSearchStatus("");
  };

  useEffect(() => {
    getOrders().catch((error) => {
      console.log(error);
    });
  }, [orderCode, status, startDate, endDate]);

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
                <Form.Label>ค้นหาตามประเภทสินค้า</Form.Label>
                <form onSubmit={handleSubmit}>
                  <input
                    className="form-control bg-dark border-0"
                    type="search"
                    placeholder="ค้นหาตามประเภทสินค้า"
                    value={searchOrderCode}
                    onChange={(e) => {
                      setSearchOrderCode(e.target.value);
                    }}
                  />
                </form>
              </Form.Group>
            </div>
          </Col>
          <Col>
            <DatePicker
              placeholderText="เลือกวันที่เริ่มต้น"
              locale="th"
              dateFormat="dd-MM-yyyy"
              selected={searchStartDate}
              onChange={(date) => setSearchStartDate(date)}
              selectsStart
              startDate={searchStartDate}
              endDate={searchEndDate}
            />
            ถึง
            <DatePicker
              locale="th"
              placeholderText="เลือกวันที่สิ้นสุด"
              dateFormat="dd-MM-yyyy"
              selected={searchEndDate}
              onChange={(date) => setSearchEndDate(date)}
              selectsEnd
              startDate={searchStartDate}
              endDate={searchEndDate}
              minDate={searchStartDate}
            />
          </Col>

          <Col>
           
          </Col>
        </Row>
        <div className="  ">
          <Button
            type="submit"
            variant="success"
            className="m-2"
            onClick={SearchAllData}
          >
            ค้นหาเลขออเดอร์
          </Button>
          <Button
            type="submit"
            variant="danger"
            className="m-2"
            onClick={handleClearfilter}
          >
            ยกเลิกการค้นหา
          </Button>
        </div>
      </Card>

      {TotalSalesPage()}
      
    </Container>
  );
}



SearchOrders.layout = IndexPage;
