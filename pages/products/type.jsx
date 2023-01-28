import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import TypeEditModal from '@/container/Type/TypeEditModal'
import TypeDeleteModal from '@/container/Type/TypeDeleteModal'
import TypeAddModal from '@/container/Type/TypeAddModal'

export default function TypePage() {
    const [params, setParams] = useState({
        page: '1',
        pageSize: '10'
    });

    const [{ data: typeData, loading, error }, getType] = useAxios({ url: `/api/type?page=1&pageSize=10`, method: 'GET' });
    useEffect(() => {
        if (typeData) {
            setParams({
                ...params,
                page: typeData.page,
                pageSize: typeData.pageSize
            });
        }
    }, [typeData]);

    const handleSelectPage = (pageValue) => {
        getType({ url: `/api/type?page=${pageValue}&pageSize=${params.pageSize}` })
    };
    const handleSelectPageSize = (sizeValue) => {
        getType({ url: `/api/type?page=1&pageSize=${sizeValue}` })
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
                    <TypeAddModal getData={getType}/>
                </div>
                <MyTable data={typeData?.data} setNum={(typeData?.page * typeData?.pageSize) - typeData?.pageSize} getData={getType} />
                <MyPagination page={typeData.page} totalPages={typeData.totalPage} onChangePage={handleSelectPage} pageSize={params.pageSize} onChangePageSize={handleSelectPageSize} />
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
                    <th>ประเภทสินค้า</th>
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
                                {item.subType?.map((subType, index) =>(
                    
                                    <Badge bg="primary" key={index}>
                                        {subType.name}
                                    </Badge>
                    
                                ))}
                            </td>
                            <td>
                                <TypeEditModal value={item} getData={props?.getData} />
                                <TypeDeleteModal value={item} getData={props?.getData} />
                            </td>
                        </tr>
                    )))
                    : ""}
            </tbody>
        </Table>
    );
}


TypePage.layout = IndexPage