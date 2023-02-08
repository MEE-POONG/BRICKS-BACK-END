import React, { useState } from "react";
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
import PageLoading from "@/components/PageChange/pageLoading";
import PageError from "@/components/PageChange/pageError";

export default function Search() {
  const [name, setName] = useState("");
  const [searchName, setSearchName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container fluid className="pt-4 px-4">
      <Card className=" text-center rounded shadow p-4">
        <div className="d-flex align-items-center mb-4">
          <Card.Title className="mb-0">จัดการรายงานรายได้</Card.Title>
        </div>
        <Row>
          <Col>
          </Col>
          <Col>
            <div className=" d-inline  justify-content-center ">
              <Form.Group className="mb-3" onSubmit={handleSubmit}>
                <Form.Label>ค้นหา</Form.Label>
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
                    className="m-2"
                    onClick={() => {
                      setName(searchName);
                    }}
                  >
                    ค้นหา
                  </Button>
                  <Button
                    type="submit"
                    bsPrefix="delete"
                    className="icon"
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
        </Row>
        
      </Card>
      {SumIncomePage(name)}
    </Container>
  );
}

function SumIncomePage(name) {
  // const [params, setParams] = useState({
  //   page: "1",
  //   pageSize: "10",
  // });

  // const [status, setStatus] = useState("");

  // const [{ data: ordersData, loading, error }, getOrders] = useAxios({
  //   url: `/api/orders?page=1&pageSize=10`,
  //   method: "GET",
  // });

  // useEffect(() => {

  //   if (loading === false) {
  //       const getOrdersList = async () => {
  //         await getOrders();
  //       };
  //       getOrdersList();
  //   }
  // }, [status]);

  // useEffect(() => {
  //   if (ordersData) {
  //     setParams({
  //       ...params,
  //       page: ordersData.page,
  //       pageSize: ordersData.pageSize,
  //     });
  //   }
  // }, [ordersData]);

  // const handleSelectPage = (pageValue) => {
  //   getOrders({
  //     url: `/api/orders?page=${pageValue}&pageSize=${params.pageSize}`,
  //   });
  // };
  // const handleSelectPageSize = (sizeValue) => {
  //   getOrders({ url: `/api/orders?page=1&pageSize=${sizeValue}` });
  // };

  // if (loading) {
  //   return <PageLoading />;
  // }
  // if (error) {
  //   return <PageError />;
  // }
  return (
    <div fluid className="pt-4 ">
      <Card className="text-center rounded shadow p-4">
        <MyTable/>
        <MyPagination/>
      </Card>
    </div>
  );
}

function MyTable(props) {
  // const [currentItems, setCurrentItems] = useState(props?.data);
  // const [numberSet, setNumberSet] = useState(props?.setNum);
  // useEffect(() => {
  //   setCurrentItems(currentItems);
  //   console.log(props);
  // }, [props]);

  return (
    <Table>
    <thead>
      <tr>
        <th>ลำดับ</th>
        <th>วันที่</th>
        <th>ผู้ซื้อ</th>
        <th>ผู้จำหน่าย</th>
        <th>จำนวนสินค้า</th>
        <th>ราคารวม</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>20/01/2565</td>
        <td>สมหมาย</td>
        <td>ช่างพอง</td>
        <td>2000</td>
        <td>40,000</td>
      </tr>
    </tbody>
  </Table>
  );
}

Search.layout = IndexPage;

