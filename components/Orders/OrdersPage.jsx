import React, { useEffect, useState } from "react";
import IndexPage from "components/layouts/IndexPage";
import {
  Card,
} from "react-bootstrap";
import MyPagination from "@/components/Pagination";
import useAxios from "axios-hooks";
import PageLoading from "@/components/PageChange/pageLoading";
import PageError from "@/components/PageChange/pageError";
// import OrdersAddModal from '@/container/Orders/OrderAddModal'
// import OrdersEditModal from '@/container/Orders/OrderEditModal'
import { format } from "date-fns";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import th from "date-fns/locale/th";
import MyTable from "@/components/Orders/MyTableOrders";
registerLocale("th", th);

export default function OrdersPage(ordersData, getOrders, loading, error,orderCode,status,startDate,endDate) {
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
        url: `/api/orders?&orderCode=${orderCode}&status=${status}&startDate=${startDate}&endDate=${endDate}&page=${pageValue}&pageSize=${params.pageSize}`,
      });
    };
    const handleSelectPageSize = (sizeValue) => {
      getOrders({ url: `/api/orders?&orderCode=${orderCode}&status=${status}&startDate=${startDate}&endDate=${endDate}&page=1&pageSize=${sizeValue}` });
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