import React, { useEffect, useState } from "react";
import { Table, Badge, Container, Card, Button } from "react-bootstrap";
import { format } from "date-fns";

export default function TableTotalSales(props) {
  const [currentItems, setCurrentItems] = useState(props?.data);
  const [numberSet, setNumberSet] = useState(props?.setNum);
  useEffect(() => {
    setCurrentItems(currentItems);
    console.log(props);
  }, [props]);

  return (
    <div>
      <Table striped bordersed hover>
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>ประเภทสินค้า</th>
            <th>ประเภทย่อย</th>
            <th>จำนวน&nbsp; (ชิ้น)</th>
            <th>ราคารวม</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>ของตกแต่ง</td>
            <td>อิฐช่องลม</td>
            <td>2000</td>
            <td>40,000</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
