import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import PolicyDeleteModal from '@/container/Policy/PolicyDeleteModal'
import PolicyEditModal from '@/container/Policy/PolicyEditModal'
import PolicyAddModal from '@/container/Policy/PolicyAddModal'

export default function PolicyPage() {
    const [params, setParams] = useState({
        page: '1',
        pageSize: '10'
    });

    const [{ data: policyData,loading,error }, getPolicy] = useAxios({
        url: "/api/policy",
      });
      console.log(policyData);


    useEffect(() => {
        if (policyData) {
            setParams({
                ...params,
                page: policyData.page,
                pageSize: policyData.pageSize
            });
        }
    }, [policyData]);

   
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
                        รายการนโยบาย
                    </Card.Title>
                    <PolicyAddModal getData={getPolicy} />
                </div>
                <MyTable data={policyData}  getPolicy={getPolicy} />
                
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
                    <th>ชื่อนโยบาย</th>
                    <th>รายละเอียดนโยบาย</th>
                    <th>จัดการ</th>
                </tr>
            </thead>
            <tbody>
         {   currentItems?.map((item, index) => (
                        <tr key={item.id}>
                            <td className="text-center">{index + 1 }</td>
                            <td>
                                <div> {item?.headpolicy} </div>
                            </td>
                            <td>
                                <div dangerouslySetInnerHTML={{ __html: item?.subpolicy}} />
                            </td>
                            <td>
                                <PolicyEditModal value={item} getPolicy={props?.getPolicy} />
                                <PolicyDeleteModal value={item} getPolicy={props?.getPolicy} />
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    );
}

PolicyPage.layout = IndexPage