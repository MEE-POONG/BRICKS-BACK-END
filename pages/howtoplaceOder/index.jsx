import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import HowtoplaceOderEditModal from '@/components/HowtoplaceOder/HowtoplaceOderEditModal'
import HowtoplaceOderAddModal from '@/components/HowtoplaceOder/HowtoplaceOderAddModal'
import HowtoplaceOderDeleteModal from '@/components/HowtoplaceOder/HowtoplaceOderDeleteModal'


export default function HowtoplaceOderPage() {
    const [params, setParams] = useState({
        page: '1',
        pageSize: '10'
    });

    const [{ data: howtoplaceOderData,loading,error }, getHowtoplaceOder] = useAxios({
        url: "/api/howtoplaceOder",
      });


    useEffect(() => {
        if (howtoplaceOderData) {
            setParams({
                ...params,
                page: howtoplaceOderData.page,
                pageSize: howtoplaceOderData.pageSize
            });
        }
    }, [howtoplaceOderData]);

   
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
                        รายการวิธีการสั่งซื้อ
                    </Card.Title>
                    <HowtoplaceOderAddModal getHowtoplaceOder={getHowtoplaceOder} />
                </div>
                <MyTable data={howtoplaceOderData}  getHowtoplaceOder={getHowtoplaceOder} />
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
                    <th>หัวข้อขั้นตอน</th>
                    <th>รายละเอียดขั้นตอน</th>
                    <th>จัดการ</th>
                </tr>
            </thead>
            <tbody>
         {   currentItems?.map((item, index) => (
                        <tr key={item.id}>
                            <td className="text-center">{index + 1 }</td>
                            <td>
                                <Image src={item.image}  width="150px" height="150px" className='object-fit-cover' />
                            </td>
                            <td>
                            {item.steps}
                            </td>
                            <td>
                                <div dangerouslySetInnerHTML={{ __html: item?.substeps}} />
                            </td>
                            <td>
                                <HowtoplaceOderEditModal value={item} getHowtoplaceOder={props?.getHowtoplaceOder} />
                                <HowtoplaceOderDeleteModal value={item} getHowtoplaceOder={props?.getHowtoplaceOder} />
                            </td>
                        </tr>
                    ))}
            </tbody>
            
        </Table>   
        
    );
    
}

HowtoplaceOderPage.layout = IndexPage