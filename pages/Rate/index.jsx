import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import RateEditModal from '@/container/Rate/RateEditModal'
import RateDeleteModal from '@/container/Rate/RateDeleteModal'
import RateAddModal from '@/container/Rate/RateAddModal'

export default function RatePage() {
    const [params, setParams] = useState({
        page: '1',
        pageSize: '10'
    });

    const [{ data: rateData, loading, error }, getRate] = useAxios({ url: `/api/Rate?page=1&pageSize=10`, method: 'GET' });
    useEffect(() => {
        if (rateData) {
            setParams({
                ...params,
                page: rateData.page,
                pageSize: rateData.pageSize
            });
        }
    }, [rateData]);

    const handleSelectPage = (pageValue) => {
        getRate({ url: `/api/Rate?page=${pageValue}&pageSize=${params.pageSize}` })
    };
    const handleSelectPageSize = (sizeValue) => {
        getRate({ url: `/api/Rate?page=1&pageSize=${sizeValue}` })
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
                    <RateAddModal getData={getRate}/>
                </div>
                <MyTable data={rateData?.data} setNum={(rateData?.page * rateData?.pageSize) - rateData?.pageSize} getData={getRate} />
                <MyPagination page={rateData.page} totalPages={rateData.totalPage} onChangePage={handleSelectPage} pageSize={params.pageSize} onChangePageSize={handleSelectPageSize} />
            </Card >
        </Container >
    );
}

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
                    <th>ระยะทาง</th>
                    <th>ประเภทย่อยสินค้า</th>
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
                                <Row xs='3'>
                                {item.subRate?.map((subRate, index) =>(
                                        <Col>
                                            <Badge bg="primary" key={index}>

                                                {subRate.name}
                                                
                                            </Badge>
                                        </Col>
                                ))}
                                </Row>
                            </td>
                            <td>
                                <RateEditModal value={item} getData={props?.getData} />
                                <RateDeleteModal value={item} getData={props?.getData} />
                            </td>
                        </tr>
                    )))
                    : ""}
            </tbody>
        </Table>
    );
}


RatePage.layout = IndexPage