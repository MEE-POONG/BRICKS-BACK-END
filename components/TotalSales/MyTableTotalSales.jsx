import React, { useEffect, useState } from "react";
import { Table, Badge, Container, Card, Button } from "react-bootstrap";
import { format } from "date-fns";

export default function TableTotalSales(props) {
  const [currentItems, setCurrentItems] = useState(props?.data);
  const [numberSet, setNumberSet] = useState(props?.setNum);
  useEffect(() => {
    setCurrentItems(currentItems);
    // console.log(props);
  }, [props]);

  return (
    <div>
      <Table striped bordersed hover>
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>กลุ่มสินค้า</th>
            <th>เป้าหมาย</th>
            <th>ที่ขายได้</th>
            <th>ผลต่าง</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>ของตกแต่ง</td>
            <td>2000</td>
            <td>2000</td>
            <td>40,000</td>
            <th></th>
            <th></th>

          </tr>
        </tbody>
      </Table>
    </div>
  );
}
