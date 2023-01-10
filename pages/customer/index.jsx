import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import CustomerAddModal from '@/container/Customer/CustomerAddModal'
import CustomerEditModal from '@/container/Customer/CustomerEditModal'
import CustomerDeleteModal from '@/container/Customer/CustomerDeleteModal'
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
                    <th>IMG</th>
                    <th>FullName</th>
                    <th>Position</th>
                    <th>Manager</th>
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
                                <CustomerEditModal value={item} getData={props?.getData} />
                                <CustomerDeleteModal value={item} getData={props?.getData} />
                            </td>
                        </tr>
                    )))
                    : ""}
            </tbody>
        </Table>
    );
}

export default function CustomerPage() {
    const [params, setParams] = useState({
        page: '1',
        pageSize: '10'
    });

    const [{ data: customerData, loading, error }, getCustomer] = useAxios({ url: `/api/customer?page=1&pageSize=10`, method: 'GET' });
    useEffect(() => {
        if (customerData) {
            setParams({
                ...params,
                page: customerData.page,
                pageSize: customerData.pageSize
            });
        }
    }, [customerData]);

    const handleSelectPage = (pageValue) => {
        getCustomer({ url: `/api/customer?page=${pageValue}&pageSize=${params.pageSize}` })
    };
    const handleSelectPageSize = (sizeValue) => {
        getCustomer({ url: `/api/customer?page=1&pageSize=${sizeValue}` })
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
                    <CustomerAddModal getData={getCustomer}/>
                </div>
                <MyTable data={customerData?.data} setNum={(customerData?.page * customerData?.pageSize) - customerData?.pageSize} getData={getCustomer} />
                <MyPagination page={customerData.page} totalPages={customerData.totalPage} onChangePage={handleSelectPage} pageSize={params.pageSize} onChangePageSize={handleSelectPageSize} />
            </Card >
        </Container >
    );
}
CustomerPage.layout = IndexPage
