import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import HomeTopEditModal from '@/components/HomeTop/HomeTopEditModal'
import PichomeTopEditModal from '@/components/HomeTop/PichomeTopEditModal'
import PichomeTopDeleteModal from '@/components/HomeTop/PichomeTopDeleteModal'
import PichomeTopAddModal from '@/components/HomeTop/PichomeTopAddModal'

export default function HomeTopPage() {

    const [{ data: homeTopData,loading,error }, getHomeTop] = useAxios({
        url: "/api/homeTop",
      });

      const [{ data: pichomeTopData }, getPichomeTop] = useAxios({
        url: "../api/pichomeTop?",
      });


    if (loading) {
        return <PageLoading />;
    }
    if (error) {
        return <PageError />;
    }
    return (
        <Container fluid className="pt-4 px-4">

            <Card className=" text-center rounded shadow p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                  <Card.Title className="mb-0 ">ข้อมูลหน้าหลัก</Card.Title>
                  </div>
                <MyTable homeTopData={homeTopData} getHomeTopData={getHomeTop} />
               </Card >

                  <Card className=" mt-4 text-center rounded shadow p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                     <Card.Title className="mb-0">รายการรูปภาพลูกค้าของเรา</Card.Title>
                     <PichomeTopAddModal   getPichomeTopData={getPichomeTop} />
                    </div>
            <MyTablePic pichomeTopData={pichomeTopData} getPichomeTopData={getPichomeTop} />
            </Card >

        </Container >
    );
}

function MyTable(props) {
    const [currentItems, setCurrentItems] = useState(props?.homeTopData);
    console.log(currentItems);
    useEffect(() => {
        setCurrentItems(currentItems);
        console.log(props);
    }, [props]);

    return (
   <>   
            {    currentItems?.map((item, index) => (
                    <div key={index}>

                        <Row>
                            <Col>
                            <Image src={item.image}  width="350px" height="150px" className='object-fit-cover' /> 
                            </Col>
                            <Col >
                            {newFunction("ชื่อร้าน", item?.title )} 
                            </Col>
                           
                            <Col >
                            {newFunction("คำอธิบาย", item?.subTitle )} 
                            <HomeTopEditModal value={item} getHomeTopData={props?.getHomeTopData} />
                            </Col>
                           
                        </Row>
                    <br/>
                    <br/>
                  </div>
                ))
            }    
  
   </>     
    );
    
 function newFunction(label, value) {
        return <div className="mb-3 fonT ">
         <strong> {label} </strong>
          <input className="form-control" value={value} readonly />
        </div>;
      }
}

function MyTablePic(props) {
    const [currentItems, setCurrentItems] = useState(props?.pichomeTopData);
    console.log(currentItems);
    useEffect(() => {
        setCurrentItems(currentItems);
        console.log(props);
    }, [props]);

         return (
       <>
            
                       <Table striped bordered hover>
                            <thead>
                                <tr className="text-center">
                                    <th className="text-center">No.</th>
                                    <th>ภาพโลโก้ลูกค้า</th>
                                    <th>ชื่อโลโก้</th>
                                    <th>ลิงค์โลโก้ (ถ้ามี)</th>
                                    <th>จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                     { currentItems?.map((item, index) => (
                            <tr  key={index}>
                            <td className="text-center">{index + 1 }</td>
                            <td>
                                <Image src={item.image}  width="150px" height="150px" className='object-fit-cover' />
                            </td>
                            <td>
                            {item.name}
                            </td>
                            <td>
                            {item.links}
                            </td>
                            <td>
                                <PichomeTopEditModal value={item} getPichomeTopData={props?.getPichomeTopData} />
                                <PichomeTopDeleteModal value={item} getPichomeTopData={props?.getPichomeTopData} />
                             </td>
                           </tr>
                           ))
                          }    
                        </tbody>
                    </Table>
                <br/>
                <br/>
                
          </>     
       );
    

    function newFunction(label, value) {
        return <div className="mb-3 fonT ">
         <strong> {label} </strong>
          <input className="form-control" value={value} readonly />
        </div>;
      }
}





HomeTopPage.layout = IndexPage