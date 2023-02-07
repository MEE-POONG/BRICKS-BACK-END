import React from "react";
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

export default function SumOrderPage() {
  return (
    <Container fluid className="pt-4 px-4">
      <Card className="text-center rounded shadow p-4">
        <Row>
          <Col>
            <div className="d-flex align-items-center mb-4">
              <Card.Title className="mb-0">จัดการรายงานการสั่งซื้อ</Card.Title>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
SumOrderPage.layout = IndexPage;

