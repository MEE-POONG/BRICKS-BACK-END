import React, { useEffect, useState } from "react";
import {
  Table,
  Badge,
} from "react-bootstrap";
// import OrdersAddModal from '@/container/Orders/OrderAddModal'
// import OrdersEditModal from '@/container/Orders/OrderEditModal'
import OrdersDeleteModal from "@/components/Orders/OrderDeleteModal";
import OrdersShowDetailModal from "@/components/Orders/OrderShowDetailModal";
import OrdersConfirmModal from "@/components/Orders/OrderConfirmModal";
import QuotationReport from "@/components/Orders/QuotationReport";
import { format } from "date-fns";
import OrderDeliveryDetailModal from "./OrderDeliveryDetailModal";

export default function MyTable(props) {
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
          <th>วัน/เวลาที่จัดส่ง</th>
          <th>สถานะ</th>
          <th>ราคารวม</th>
          <th>จัดการ</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.length
          ? currentItems?.map((item, index) => (
            <tr key={item.id}>
              <td>{item.orderCode}</td>
              <td>
                {item?.user?.firstName} {item?.user?.lastName}
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
              <td>
                <OrderDeliveryDetailModal value={item}
                  getData={props?.getData} />
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

              <td>{item?.totalPrice} บาท</td>
              <td>
                <OrdersConfirmModal value={item} getData={props?.getData} />
                <OrdersDeleteModal value={item} getData={props?.getData} />
                <QuotationReport value={item} getData={props?.getData} />
              </td>
            </tr>
          ))
          : ""}
      </tbody>
    </Table>
  );

}