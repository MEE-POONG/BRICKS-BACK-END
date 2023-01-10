import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import ProductAddModal from '@/container/Product/ProductAddModal'
import ProductEditModal from '@/container/Product/ProductEditModal'
import ProductDeleteModal from '@/container/Product/ProductDeleteModal'
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
                    <th>ภาพ</th>
                    <th>ชื่อสินค่า</th>
                    <th>ประเภทสินค้า</th>
                    <th>ราคา</th>
                    <th>รายละเอียด</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.length ? (
                    currentItems?.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1 + numberSet}</td>
                            <td>
                                <Image src={item.img} alt={"Profile : " + item.firstname +" "+item.lastname} width="150px" height="150px" className='object-fit-cover' />
                            </td>
                            <td>
                                {item.firstname}{" "}{item.lastname}
                            </td>
                            <td>
                                <Badge bg="primary">
                                    {item.Position?.team}
                                </Badge>
                                <br />
                                <Badge bg="success">
                                    {item.Position?.position}
                                </Badge>
                            </td>
                            <td>
                                <ProductEditModal value={item} getData={props?.getData} />
                                <ProductDeleteModal value={item} getData={props?.getData} />
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

    const [{ data: ProductData, loading, error }, getProduct] = useAxios({ url: `/api/Product?page=1&pageSize=10`, method: 'GET' });
    useEffect(() => {
        if (ProductData) {
            setParams({
                ...params,
                page: ProductData.page,
                pageSize: ProductData.pageSize
            });
        }
    }, [ProductData]);

    const handleSelectPage = (pageValue) => {
        getProduct({ url: `/api/Product?page=${pageValue}&pageSize=${params.pageSize}` })
    };
    const handleSelectPageSize = (sizeValue) => {
        getProduct({ url: `/api/Product?page=1&pageSize=${sizeValue}` })
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
                    <ProductAddModal getData={getProduct}/>
                </div>
                <MyTable data={ProductData?.data} setNum={(ProductData?.page * ProductData?.pageSize) - ProductData?.pageSize} getData={getProduct} />
                <MyPagination page={ProductData.page} totalPages={ProductData.totalPage} onChangePage={handleSelectPage} pageSize={params.pageSize} onChangePageSize={handleSelectPageSize} />
            </Card >
        </Container >
    );
}
ProductPage.layout = IndexPage