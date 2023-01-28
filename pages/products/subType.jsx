import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import SubTypeEditModal from '@/container/SubType/SubTypeEditModal'
import SubTypeDeleteModal from '@/container/SubType/SubTypeDeleteModal'
import SubTypeAddModal from '@/container/SubType/SubTypeAddModal'

export default function subTypePage() {
    const [params, setParams] = useState({
        page: '1',
        pageSize: '10'
    });

    const [{ data: subTypeData, loading, error }, getSubType] = useAxios({ url: `/api/subType?page=1&pageSize=10`, method: 'GET' });
    useEffect(() => {
        if (subTypeData) {
            setParams({
                ...params,
                page: subTypeData.page,
                pageSize: subTypeData.pageSize
            });
        }
    }, [subTypeData]);

    const [{ data: typeData }, getType] = useAxios({
        url: "../api/type?",
      });

    const handleSelectPage = (pageValue) => {
        getSubType({ url: `/api/subType?page=${pageValue}&pageSize=${params.pageSize}` })
    };
    const handleSelectPageSize = (sizeValue) => {
        getSubType({ url: `/api/subType?page=1&pageSize=${sizeValue}` })
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
                    <SubTypeAddModal getData={getSubType} getTypeData={typeData?.data}/>
                </div>
                <MyTable data={subTypeData?.data} setNum={(subTypeData?.page * subTypeData?.pageSize) - subTypeData?.pageSize} getData={getSubType} getTypeData={typeData?.data} />
                <MyPagination page={subTypeData.page} totalPages={subTypeData.totalPage} onChangePage={handleSelectPage} pageSize={params.pageSize} onChangePageSize={handleSelectPageSize} />
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
                                <SubTypeEditModal value={item} getData={props?.getData} getTypeData={props?.getTypeData} />
                                <SubTypeDeleteModal value={item} getData={props?.getData} />
                            </td>
                        </tr>
                    )))
                    : ""}
            </tbody>
        </Table>
    );
}


subTypePage.layout = IndexPage