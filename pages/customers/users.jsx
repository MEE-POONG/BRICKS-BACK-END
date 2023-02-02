/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import UsersAddModal from '@/container/Users/UsersAddModal'
import UsersEditModal from '@/container/Users/UsersEditModal'
import UsersDeleteModal from '@/container/Users/UsersDeleteModal'

export default function usersPage() {
    const [params, setParams] = useState({
        page: '1',
        pageSize: '10'
    });

    const [{ data: usersData, loading, error }, getUsers] = useAxios({ url: `/api/users?page=1&pageSize=10`, method: 'GET' });
    useEffect(() => {
        if (usersData) {
            setParams({
                ...params,
                page: usersData.page,
                pageSize: usersData.pageSize
            });
        }
    }, [usersData]);

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
                        รายการบัญชีสมาชิก
                    </Card.Title>
                    <UsersAddModal getData={getUsers} />
                </div>
                <MyTable data={usersData?.data} getUsers={getUsers} />
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
                                <UsersEditModal value={item} getUsers={props?.getUsers}  />
                                <UsersDeleteModal value={item} getUsers={props?.getUsers} />
                            </td>
                        </tr>
                    )))
                    : ""}
            </tbody>
        </Table>
    );
}



usersPage.layout = IndexPage