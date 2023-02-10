import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import PichowtoplaceOderEditModal from '@/components/PichowtoplaceOder/PichowtoplaceOderEditModal'
import PichowtoplaceOderAddModal from '@/components/PichowtoplaceOder/PichowtoplaceOderAddModal'
import PichowtoplaceOderDeleteModal from '@/components/PichowtoplaceOder/PichowtoplaceOderDeleteModal'


export default function PichowtoplaceOderPage() {
    const [params, setParams] = useState({
        page: '1',
        pageSize: '10'
    });

    const [{ data: pichowtoplaceOderData,loading,error }, getPichowtoplaceOder] = useAxios({
        url: "/api/pichowtoplaceOder",
      });
      console.log(pichowtoplaceOderData);


    useEffect(() => {
        if (pichowtoplaceOderData) {
            setParams({
                ...params,
                page: pichowtoplaceOderData.page,
                pageSize: pichowtoplaceOderData.pageSize
            });
        }
    }, [pichowtoplaceOderData]);

   
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
                        รายการรูปวิธีการสั่งซื้อ
                    </Card.Title>
                    <PichowtoplaceOderAddModal getPichowtoplaceOder={getPichowtoplaceOder} />
                </div>
                <MyTable data={pichowtoplaceOderData}  getPichowtoplaceOder={getPichowtoplaceOder} />
                
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
                    <th>รูปภาพ</th>
                    <th>จัดการ</th>
                </tr>
            </thead>
            <tbody>
         {   currentItems?.map((item, index) => (
                        <tr key={item.id}>
                            <td className="text-center">{index + 1 }</td>
                            <td>
                                <Image src={item.image}  width="200px" height="200px" className='object-fit-cover' />
                            </td>
                            <td>
                                <PichowtoplaceOderEditModal value={item} getPichowtoplaceOder={props?.getPichowtoplaceOder} />
                                <PichowtoplaceOderDeleteModal value={item} getPichowtoplaceOder={props?.getPichowtoplaceOder} />
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    );
}

PichowtoplaceOderPage.layout = IndexPage