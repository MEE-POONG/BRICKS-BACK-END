// import useAxios from 'axios-hooks';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import { Container, Image, Card, Row, Col } from 'react-bootstrap';
// import { FaChartArea, FaChartBar, FaChartLine, FaChartPie } from 'react-icons/fa';

// export default function Warn(props) {
//     const [contactList, setContactList] = useState();
//     const [warnCheckEditLogList, setWarnCheckEditLogList] = useState();
//     const [warnAudienceRecordList, setWarnAudienceRecordList] = useState();

//   const [{ data: orderData, loading, error }, getOrder] = useAxios({
//     url: `/api/order`,
//     method: "GET",
//   });
//     useEffect(() => {
//         setContactList(props.contactData)
//         setWarnCheckEditLogList(props.checkEditLogData);
//         setWarnAudienceRecordList(props.audienceRecordData)
//     }, [props])

//     return (
//         <Row className='warn mx-4 mt-4'>
//             <Col>
//                 <Card>
//                     <Card.Header>
//                         <Card.Title className='text-center'>
//                             ออเดอร์วันนี้
//                         </Card.Title>
//                     </Card.Header>
//                     <Card.Body>
//                         {orderData?.data.map((order, key) =>(
//                             (<Link key={key} href="" className="alert alert_warning" legacyBehavior>

//                                 <Card.Title>{order.orderCode}</Card.Title>
//                                 <Card.Text>{order.firstname} {order.lastname}</Card.Text>

//                             </Link>)
//                         ))}
//                     </Card.Body>
//                 </Card>
//             </Col>
//             <Col>
//                 <Card>
//                     <Card.Header>
//                         <Card.Title className='text-center'>
//                             ออเดอร์ที่รอส่ง
//                         </Card.Title>
//                     </Card.Header>
//                     <Card.Body>
//                         {orderData?.data.map((order, key) => order.status == "กำลังดำเนินการ" ?(
//                             (<Link key={key} href="" className="alert alert_warning" legacyBehavior>

//                                 <Card.Title>{order.orderCode}</Card.Title>
//                                 <Card.Text>{order.firstname} {order.lastname}</Card.Text>

//                             </Link>)
//                         ):(""))}
//                     </Card.Body>
//                 </Card>
//             </Col>
//             <Col>
//                 <Card>
//                     <Card.Header>
//                         <Card.Title className='text-center'>
//                         ออเดอร์ที่ส่งแล้ว
//                         </Card.Title>
//                     </Card.Header>
//                     <Card.Body>
//                         {warnAudienceRecordList?.map((list, key) => (
//                             (<Link
//                             key={key}
//                             href={"/" + list.tagLink + "/" + list.id}
//                             className="alert"
//                             legacyBehavior>

//                                 <Card.Title>{list.title}</Card.Title>
//                                 <Card.Text>{list.detail}  คน</Card.Text>

//                             </Link>)
//                         ))}
//                     </Card.Body>
//                 </Card>
//             </Col>
//         </Row>
//     );
// }
