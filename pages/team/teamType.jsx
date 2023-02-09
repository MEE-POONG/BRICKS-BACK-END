/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import TeamTypeAddModal from '@/components/TeamType/TeamTypeAddModal'
import TeamTypeEditModal from '@/components/TeamType/TeamTypeEditModal'
import TeamTypeDeleteModal from '@/components/TeamType/TeamTypeDeleteModal'

export default function teamTypePage() {
    const [params, setParams] = useState({
        page: '1',
        pageSize: '10'
    });

    const [{ data: teamTypeData, loading, error }, getTeamType] = useAxios({ url: `/api/teamType?page=1&pageSize=10`, method: 'GET' });
    useEffect(() => {
        if (teamTypeData) {
            setParams({
                ...params,
                page: teamTypeData.page,
                pageSize: teamTypeData.pageSize
            });
        }
    }, [teamTypeData]);

    const [{ data: typeData }, getType] = useAxios({
        url: "../api/teamType?",
      });

    const handleSelectPage = (pageValue) => {
        getteamType({ url: `/api/teamType?page=${pageValue}&pageSize=${params.pageSize}` })
    };
    const handleSelectPageSize = (sizeValue) => {
        getteamType({ url: `/api/teamType?page=1&pageSize=${sizeValue}` })
    };

    if (loading) {
        return <PageLoading />;
    }
    if (error) {
        return <PageError />;
    }
    return (
        <Container fluid className="pt-4 px-4">
            <Card className="text-center rounded shadow p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <Card.Title className="mb-0">
                       รายการระดับสิทธิ์ผู้ดูแลระบบ
                    </Card.Title>
                    <TeamTypeAddModal getData={getTeamType} getTypeData={typeData?.data}/>
                </div>
                <MyTable data={teamTypeData?.data} setNum={(teamTypeData?.page * teamTypeData?.pageSize) - teamTypeData?.pageSize} getData={getTeamType} getTypeData={typeData?.data} />
                <MyPagination page={teamTypeData.page} totalPages={teamTypeData.totalPage} onChangePage={handleSelectPage} pageSize={params.pageSize} onChangePageSize={handleSelectPageSize} />
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
                    <th>ประเภทสิทธิ์ผู้ใช้</th>
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
                                <TeamTypeEditModal value={item} getData={props?.getData} getTypeData={props?.getTypeData} />
                                <TeamTypeDeleteModal value={item} getData={props?.getData} />
                            </td>
                        </tr>
                    )))
                    : ""}
            </tbody>
        </Table>
    );
}


teamTypePage.layout = IndexPage