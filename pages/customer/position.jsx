import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import PositionAddModal from '@/container/Position/PositionAddModal'
import PositionEditModal from '@/container/Position/PositionEditModal'
import PositionDeleteModal from '@/container/Position/PositionDeleteModal'
function MyTable(props) {
    const [currentItems, setCurrentItems] = useState(props?.data);
    const [numberSet, setNumberSet] = useState(props?.setNum);
    useEffect(() => {
        setCurrentItems(currentItems);
    }, [props]);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Team</th>
                    <th>Position</th>
                    <th>Manager</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.length ? (
                    currentItems?.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1 + numberSet}</td>
                            <td>{item.team}</td>
                            <td>{item.position}</td>
                            <td>
                                <PositionEditModal value={item} getData={props?.getData} />
                                <PositionDeleteModal value={item} getData={props?.getData} />
                            </td>
                        </tr>
                    )))
                    : ""}
            </tbody>
        </Table>
    );
}

export default function PositionPage() {
    const [params, setParams] = useState({
        page: '1',
        pageSize: '10'
    });

    const [{ data: positionData, loading, error }, getPosition] = useAxios({ url: `/api/position?page=1&pageSize=10`, method: 'GET' });

    useEffect(() => {
        if (positionData) {
            setParams({
                ...params,
                page: positionData.page,
                pageSize: positionData.pageSize
            });
        }
    }, [positionData]);

    const handleSelectPage = (pageValue) => {
        getPosition({ url: `/api/position?page=${pageValue}&pageSize=${params.pageSize}` })
    };
    const handleSelectPageSize = (sizeValue) => {
        getPosition({ url: `/api/position?page=1&pageSize=${sizeValue}` })
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
                    <PositionAddModal getData={getPosition}/>
                </div>
                <MyTable data={positionData?.data} setNum={(positionData?.page * positionData?.pageSize) - positionData?.pageSize} getData={getPosition} />
                <MyPagination page={positionData.page} totalPages={positionData.totalPage} onChangePage={handleSelectPage} pageSize={params.pageSize} onChangePageSize={handleSelectPageSize} />
            </Card >
        </Container >
    );
}
PositionPage.layout = IndexPage
