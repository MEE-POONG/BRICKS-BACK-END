import React, { useEffect, useState } from "react";
import { Table, Badge, Container, Card, Button } from "react-bootstrap";
import { format } from "date-fns";
import TableTotalSales from "./MyTableTotalSales";
import MyPagination from "../Pagination";

export default function TotalSalesPage(props) {
  const [currentItems, setCurrentItems] = useState(props?.data);
  const [numberSet, setNumberSet] = useState(props?.setNum);
  useEffect(() => {
    setCurrentItems(currentItems);
    // console.log(props);
  }, [props]);

  return (
    <div fluid className="pt-4">
      <Card className=" text-center rounded shadow p-4">
        <div className="d-flex align-items-center mb-4">
          <Card.Title className="mb-0">จัดการรายงาน</Card.Title>
        </div>
        <TableTotalSales />
        <MyPagination/>
      </Card>
    </div>
  );
}
