import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap'
import { FaPlus, FaUserCircle } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import AutoComplete from '@/components/AutoComplete'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
import FormData from 'form-data';
import axios from 'axios'


export default function TeamAddModal(props) {

    const [{  error: errorMessage, loading: TeamLoading }, executeTeam] = useAxios({ url: '/api/team', method: 'POST' }, { manual: true });
    
    const [checkValue, setCheckValue] = useState(true);
    const [showCheck, setShowCheck] = useState(false);
    const handleClose = () => { setShowCheck(false), setCheckValue(true) };
    const handleShow = () => setShowCheck(true);

    
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userlevel, setUserlevel] = useState('');
    const [teamTypeId, setTeamTypeId] = useState('');

    

    const handleSubmit = async event  => { 
        setCheckValue(false)
        { 
            handleClose()
            await executeTeam({
                data: {
                    fname: fname,
                    lname: lname,
                    tel: tel,
                    email: email,
                    username: username,
                    password: password,
                    userlevel: userlevel,
                    teamTypeId: teamTypeId,
                }
            }).then(() => {
                Promise.all([    
                    setFname(''),
                    setLname(''),
                    setTel(''),
                    setEmail(''),
                    setUsername(''),
                    setPassword(''),
                    setUserlevel(''),
                    setTeamTypeId(''),

                    props.getData(),
                ])
            });
        } 
    
        
    }

    if (TeamLoading)
    return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    if (errorMessage)
    return (
      <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>
    );

    return (
        <>
            <Button bsPrefix="create" className={showCheck ? 'icon active d-flex' : 'icon d-flex'} onClick={handleShow}>
                <FaPlus />{" "}เพิ่มบัญชีสมาชิก
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='lg' className='form-Products'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>เพิ่มบัญชีสมาชิก</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                <Row>
                <Col md='6'>
                <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>ชื่อจริง</Form.Label>
                                        <Form.Control type="text" placeholder="กรุณาเพิ่มชื่อจริง"
                                         onChange={(e) => { setFname(e.target.value) }}
                                         value={fname} autoComplete="off"
                                         isValid={checkValue === false && name !== '' ? true : false}
                                         isInvalid={checkValue === false && name === '' ? true : false}
                                        />
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>นามสกุล</Form.Label>
                                        <Form.Control type="text" placeholder="กรุณาเพิ่มนามสกุล"
                                         onChange={(e) => { setLname(e.target.value) }}
                                         value={lname} autoComplete="off"
                                         isValid={checkValue === false && name !== '' ? true : false}
                                         isInvalid={checkValue === false && name === '' ? true : false}
                                        />
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>เบอร์โทร</Form.Label>
                                        <Form.Control type="text" placeholder="กรุณาเพิ่มเบอร์โทร"
                                         onChange={(e) => { setTel(e.target.value) }}
                                         value={tel} autoComplete="off"
                                         isValid={checkValue === false && name !== '' ? true : false}
                                         isInvalid={checkValue === false && name === '' ? true : false}
                                        />
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>อีเมล์</Form.Label>
                                        <Form.Control type="text" placeholder="กรุณาเพิ่มอีเมล์"
                                         onChange={(e) => { setEmail(e.target.value) }}
                                         value={email} autoComplete="off"
                                         isValid={checkValue === false && name !== '' ? true : false}
                                         isInvalid={checkValue === false && name === '' ? true : false}
                                        />
                </Form.Group>
                </Col>
                <Col md='6'>
                <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>ชื่อผู้ใช้</Form.Label>
                                        <Form.Control type="text" placeholder="กรุณาเพิ่มชื่อผู้ใช้"
                                         onChange={(e) => { setUsername(e.target.value) }}
                                         value={username} autoComplete="off"
                                         isValid={checkValue === false && name !== '' ? true : false}
                                         isInvalid={checkValue === false && name === '' ? true : false}
                                        />
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>รหัสผ่าน</Form.Label>
                                        <Form.Control type="text" placeholder="กรุณาเพิ่มรหัสผ่าน"
                                         onChange={(e) => { setPassword(e.target.value) }}
                                         value={password} autoComplete="off"
                                         isValid={checkValue === false && name !== '' ? true : false}
                                         isInvalid={checkValue === false && name === '' ? true : false}
                                        />
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                                        <Form.Label>ประเภทสิทธิ์ผู้ใช้</Form.Label>
                                        <Form.Select  
                                         onChange={(e) => { setTeamTypeId(e.target.value) }}
                                         value={teamTypeId} autoComplete="off"
                                         isValid={checkValue === false && teamTypeId !== '' ? true : false}
                                         isInvalid={checkValue === false && teamTypeId === '' ? true : false}>
                                            <option value="">ระดับสิทธิ์ผู้ใช้</option>
                                            {props?.getTeamType?.map((teamTypeData, index) => (
                                                <option key={index} value={teamTypeData.id}>{teamTypeData.name}</option>
                                            ))}

                                        </Form.Select>
                                    </Form.Group>
                </Col>
                </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button bg="danger"className="my-0 btn-danger" onClick={handleClose}>
                    ยกเลิก
                </Button>
                <Button bg="succeed" className="my-0" onClick={handleSubmit}>
                    ยืนยันการเพิ่ม
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}