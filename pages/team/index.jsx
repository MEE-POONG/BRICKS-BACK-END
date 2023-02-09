import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import TeamAddModal from '@/components/Team/TeamAddModal'
import TeamEditModal from '@/components/Team/TeamEditModal'
import TeamDeleteModal from '@/components/Team/TeamDeleteModal'

export default function TeamPage( ){
    const [params, setParams] = useState({
        page: '1',
        pageSize: '10'
    });

    const [{ data: teamData, loading, error }, getTeam] = useAxios({ url: `/api/team?page=1&pageSize=10`, method: 'GET' });
    const [{ data: teamTypeData }, getTeamType] = useAxios({
        url: "../api/teamType?",
      });
    useEffect(() => {
        if (teamData) {
            setParams({
                ...params,
                page: teamData.page,
                pageSize: teamData.pageSize
            });
        }
    }, [teamData]);

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
                        รายการบัญชีผู้ดูแลระบบ
                    </Card.Title>
                    <TeamAddModal getData={getTeam} getTeamType={teamTypeData?.data}/>
                </div>
                <MyTable data={teamData?.data} getTeam={getTeam} getTeamType={teamTypeData?.data} />
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
                    <th>ชื่อจริง</th>
                    <th>นามสกุล</th>
                    <th>เบอร์โทร</th>
                    <th>อีเมล์</th>
                    <th>ชื่อผู้ใช้</th>
                    <th>รหัสผ่าน</th>
                    <th>ระดับสิทธิ์ผู้ใช้</th>
                    <th>จัดการ</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.length ? (
                    currentItems?.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1 }</td>
                            <td>
                                {item.fname}
                            </td>
                            <td>
                                {item.lname}
                            </td>
                            <td>
                                {item.tel}
                            </td>
                            <td>
                                {item.email}
                            </td>
                            <td>
                                {item.username}
                            </td>
                            <td>
                                {item.password}
                            </td>
                            <td>
                                {item.teamType?.name}
                            </td>
                            <td>
                                <TeamEditModal value={item} getTeam={props?.getTeam} getTeamType={props?.getTeamType}  />
                                <TeamDeleteModal value={item} getTeam={props?.getTeam} />
                            </td>
                        </tr>
                    )))
                    : ""}
            </tbody>
        </Table>
    );
}

TeamPage.layout = IndexPage