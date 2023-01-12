import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import ProductsTypeEditModal from '@/container/ProductsType/ProductsTypeEditModal'
import ProductsTypeDeleteModal from '@/container/ProductsType/ProductsTypeDeleteModal'
import ProductsTypeAddModal from '@/container/ProductsType/ProductsTypeAddModal'

function MyTable(props) {
    const [currentItems, setCurrentItems] = useState(props?.data);
    const [numberSet, setNumberSet] = useState(props?.setNum);
    useEffect(() => {
        setCurrentItems(currentItems);
        console.log(props);
    }, [props]);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>ประเภทสินค้า</th>
                    <th>จัดการ</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.length ? (
                    currentItems?.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1 + numberSet}</td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                <ProductsTypeEditModal value={item} getData={props?.getData} />
                                <ProductsTypeDeleteModal value={item} getData={props?.getData} />
                            </td>
                        </tr>
                    )))
                    : ""}
            </tbody>
        </Table>
    );
}

export default function ProductPage() {
    const [params, setParams] = useState({
        page: '1',
        pageSize: '10'
    });

    const [{ data: productTypeData, loading, error }, getProductType] = useAxios({ url: `/api/productType?page=1&pageSize=10`, method: 'GET' });
    useEffect(() => {
        if (productTypeData) {
            setParams({
                ...params,
                page: productTypeData.page,
                pageSize: productTypeData.pageSize
            });
        }
    }, [productTypeData]);

    const handleSelectPage = (pageValue) => {
        getProductType({ url: `/api/productType?page=${pageValue}&pageSize=${params.pageSize}` })
    };
    const handleSelectPageSize = (sizeValue) => {
        getProductType({ url: `/api/productType?page=1&pageSize=${sizeValue}` })
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
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <Card.Title className="mb-0">
                        รายการสินค้า
                    </Card.Title>
                    <ProductsTypeAddModal getData={getProductType}/>
                </div>
                <MyTable data={productTypeData?.data} setNum={(productTypeData?.page * productTypeData?.pageSize) - productTypeData?.pageSize} getData={getProductType} />
                <MyPagination page={productTypeData.page} totalPages={productTypeData.totalPage} onChangePage={handleSelectPage} pageSize={params.pageSize} onChangePageSize={handleSelectPageSize} />
            </Card >
        </Container >
    );
}
ProductPage.layout = IndexPage