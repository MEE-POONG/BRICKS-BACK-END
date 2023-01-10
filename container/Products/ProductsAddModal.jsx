import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap'
import { FaPlus, FaUserCircle } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import AutoComplete from '@/components/AutoComplete'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
import FormData from 'form-data';

import axios from 'axios'

export default function CustomerAddModal(props) {
    const [{ data: customer, loading, error }, getCustomer] = useAxios({ url: '/api/customer' })
    const [{ data: customerPost, error: errorMessage, loading: customerLoading }, executeCustomerTeam] = useAxios({ url: '/api/customer', method: 'POST' }, { manual: true });
    const [positionSelect, setPositionSelect] = useState('');
    const [customerSelect, setCustomerSelect] = useState('');
    const [checkValue, setCheckValue] = useState(true);

    const [showCheck, setShowCheck] = useState(false);


    const handleClose = () => { setShowCheck(false), setCheckValue(true) };
    const handleShow = () => setShowCheck(true);
    // const teams = customer?.reduce((acc, item) => {
    //     if (!acc.some(i => i.team === item.teamj)) {
    //         acc.push(item);
    //     }
    //     return acc;
    // }, []);

    const[{loading: imgLoading, error: imgError}, uploadImage]= useAxios({url: '/api/upload', method: 'POST'},{manual: true});

    const [img, setImg] = useState('');

    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [facebook, setFacebook] = useState('');
    const [line, setLine] = useState('');
    const [intragarm, setIntragarm] = useState('');
    const [addressOne, setAddressOne] = useState('');
    const [addressTwo, setAddressTwo] = useState('');
    const [addressThree, setAddressThree] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [status, setStatus] = useState('');
    // const [province, setProvince] = useState('');
    // const [district, setDistrict] = useState('');
    // const [subDistrict, setSubDistrict] = useState('');

    useEffect(() => {

        if (img.length < 1) return
        const newImageUrl = []
        img.forEach(img => newImageUrl.push(URL.createObjectURL(img)))
        setImageURL(newImageUrl)
        }, [img])
    
        const onImageCustomerChange = (e) => {
            setImg([...e.target.files])
        }


    const clickTeam = value => {
        setPositionSelect(value);
    };
    const handleSubmit = ()  => {
        setCheckValue(false)
        if ( username !== '' && password !== '')  (async () => { 

            let data =new FormData()
            data.append('file', img[0])
            const imageData = await uploadImage({data: data})
            const id =imageData.data.result.id

            await executeCustomerTeam({
                data: {
                    // positionId: position,
                    username: username,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                    img: `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,
                    facebook: facebook,
                    line: line,
                    intragarm: intragarm,
                    addressOne: addressOne,
                    addressTwo: addressTwo,
                    addressThree: addressThree,
                    city: city,
                    postalCode: postalCode,
                    status: status,
                    // province: province,
                    // district: district,
                    // subDistrict: subDistrict,
                }
            }).then(() => {
                Promise.all([    
                    setUsername(''),
                    setPassword(''),
                    setFirstname(''),
                    setLastname(''),
                    setImg(''),
                    setFacebook(''),
                    setLine(''),
                    setIntragarm(''),
                    setAddressOne(''),
                    setAddressTwo(''),
                    setAddressThree(''),
                    setCity(''),
                    setPostalCode(''),
                    setStatus(''),
                    // setProvince(''),
                    // setDistrict(''),
                    // setSubDistrict(''),

                    props.getData(),
                ]).then(() => {
                    handleClose()
                })
            });
        } 
        )
        
    }

    // if (loading || customerLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    // if (error || errorMessage) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

    return (
        <>
            <Button bsPrefix="create" className={showCheck ? 'icon active d-flex' : 'icon d-flex'} onClick={handleShow}>
                <FaPlus />{" "}เพิ่มสมาชิก
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='lg' className='form-customer'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>เพิ่มสมาชิกพนักงานองค์กร</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Row>
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="formFile">
                                <Form.Label className='text-center'>เลือกรูปโปรไฟล์</Form.Label>

                                    <Form.Label className='d-block'>รูปภาพ</Form.Label>
                                    {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={img} alt="About_img" fluid rounded />}
                                    {imageURL?.map((imageSrcAbout, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcAbout} alt="About_img" fluid rounded />)}
                                    <Form.Control type="file" accept="img/*" onChange={onImageCustomerChange} />
                    
                            </Form.Group>
                        </Col>
                        <Col md='6'>
                            <Row>
                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="Username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่ม หน้าที่ / ตำแหน่งงาน"
                                         onChange={(e) => { setUsername(e.target.value) }}
                                         value={username} autoComplete="off"
                                         isValid={checkValue === false && username !== '' ? true : false}
                                         isInvalid={checkValue === false && username === '' ? true : false}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="Password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่ม หน้าที่ / ตำแหน่งงาน"
                                         onChange={(e) => { setPassword(e.target.value) }}
                                         value={password} autoComplete="off"
                                         isValid={checkValue === false && password !== '' ? true : false}
                                         isInvalid={checkValue === false && password === '' ? true : false}
                                        />
                                    </Form.Group>
                                </Col>

                            </Row>

                        </Col>
                    </Row>
                    <h4>ข้อมูลส่วนตัว</h4>
                    <Row className="mb-3">
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="firstname">
                                <Form.Label>ชื่อ</Form.Label>
                                <Form.Control type="text" placeholder="เพิ่ม หน้าที่ / ตำแหน่งงาน"
                                  onChange={(e) => { setFirstname(e.target.value) }}
                                  value={firstname} autoComplete="off"
                                  isValid={checkValue === false && firstname !== '' ? true : false}
                                  isInvalid={checkValue === false && firstname === '' ? true : false}
                                />
                            </Form.Group>
                        </Col>
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="lastname">
                                <Form.Label>นามสกุล</Form.Label>
                                <Form.Control type="text" placeholder="เพิ่ม หน้าที่ / ตำแหน่งงาน"
                                  onChange={(e) => { setLastname(e.target.value) }}
                                  value={lastname} autoComplete="off"
                                  isValid={checkValue === false && lastname !== '' ? true : false}
                                  isInvalid={checkValue === false && lastname === '' ? true : false}
                                />
                            </Form.Group>
                        </Col>
                        <Col md='6'>
                            <AutoComplete
                                id="customer-team"
                                label="แผนกงาน"
                                placeholder="ระบุทีม / แผนกงาน"
                                // options={teams}
                                // value={''}
                                valueReturn={clickTeam}
                            // checkValue={checkValue} 
                            />
                        </Col>
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>หน้าที่งาน / ตำแหน่งงาน</Form.Label>
                                <Form.Control type="text" placeholder="เพิ่ม หน้าที่ / ตำแหน่งงาน"
                                // onChange={(e) => { setCustomerSelect(e.target.value) }}
                                // value={customerSelect} autoComplete="off"
                                // isValid={checkValue === false && customerSelect !== '' ? true : false}
                                // isInvalid={checkValue === false && customerSelect === '' ? true : false}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <h4>ที่อยู่</h4>
                    <Row>
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="postalCode">
                                <Form.Label>รหัสไปษณีย์</Form.Label>
                                <Form.Control type="text" placeholder="เพิ่ม หน้าที่ / ตำแหน่งงาน"
                                onChange={(e) => { setPostalCode(e.target.value) }}
                                value={postalCode} autoComplete="off"
                                isValid={checkValue === false && postalCode !== '' ? true : false}
                                isInvalid={checkValue === false && postalCode === '' ? true : false}
                                />
                            </Form.Group>
                        </Col>
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="province">
                                <Form.Label>จังหวัด</Form.Label>
                                <Form.Control type="text" placeholder="เพิ่ม หน้าที่ / ตำแหน่งงาน"
                                // onChange={(e) => { setCustomerSelect(e.target.value) }}
                                // value={province} autoComplete="off"
                                // isValid={checkValue === false && province !== '' ? true : false}
                                // isInvalid={checkValue === false && province === '' ? true : false}
                                />
                            </Form.Group>
                        </Col>
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="district">
                                <Form.Label>อำเภอ</Form.Label>
                                <Form.Control type="text" placeholder="เพิ่ม หน้าที่ / ตำแหน่งงาน"
                                // onChange={(e) => { setCustomerSelect(e.target.value) }}
                                // value={district} autoComplete="off"
                                // isValid={checkValue === false && district !== '' ? true : false}
                                // isInvalid={checkValue === false && district === '' ? true : false}
                                />
                            </Form.Group>
                        </Col>
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="subDistrict">
                                <Form.Label>ตำบล</Form.Label>
                                <Form.Control type="text" placeholder="เพิ่ม หน้าที่ / ตำแหน่งงาน"
                                // onChange={(e) => { setCustomerSelect(e.target.value) }}
                                // value={subDistrict} autoComplete="off"
                                // isValid={checkValue === false && subDistrict !== '' ? true : false}
                                // isInvalid={checkValue === false && subDistrict === '' ? true : false}
                                />
                            </Form.Group>
                        </Col>
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="addressOne">
                                <Form.Label>ที่อยู่</Form.Label>
                                <Form.Control type="text" placeholder="เพิ่ม หน้าที่ / ตำแหน่งงาน"
                                onChange={(e) => { setAddressOne(e.target.value) }}
                                value={addressOne} autoComplete="off"
                                isValid={checkValue === false && addressOne !== '' ? true : false}
                                isInvalid={checkValue === false && addressOne === '' ? true : false}
                                />
                            </Form.Group>
                        </Col>
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="addressTwo">
                                <Form.Label>ที่อยู่ เพิ่มเติม</Form.Label>
                                <Form.Control type="text" placeholder="เพิ่ม หน้าที่ / ตำแหน่งงาน"
                                onChange={(e) => { setAddressTwo(e.target.value) }}
                                value={addressTwo} autoComplete="off"
                                isValid={checkValue === false && addressTwo !== '' ? true : false}
                                isInvalid={checkValue === false && addressTwo === '' ? true : false}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <h4>โซเชียล</h4>
                    <Row>
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="facebook">
                                <Form.Label>Facebook</Form.Label>
                                <Form.Control type="text" placeholder="เพิ่ม หน้าที่ / ตำแหน่งงาน"
                                onChange={(e) => { setFacebook(e.target.value) }}
                                value={facebook} autoComplete="off"
                                isValid={checkValue === false && facebook !== '' ? true : false}
                                isInvalid={checkValue === false && facebook === '' ? true : false}
                                />
                            </Form.Group>
                        </Col>
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="line">
                                <Form.Label>Line</Form.Label>
                                <Form.Control type="text" placeholder="เพิ่ม หน้าที่ / ตำแหน่งงาน"
                                onChange={(e) => { setLine(e.target.value) }}
                                value={line} autoComplete="off"
                                isValid={checkValue === false && line !== '' ? true : false}
                                isInvalid={checkValue === false && line === '' ? true : false}
                                />
                            </Form.Group>
                        </Col>
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="intragarm">
                                <Form.Label>Intragarm</Form.Label>
                                <Form.Control type="text" placeholder="เพิ่ม หน้าที่ / ตำแหน่งงาน"
                                onChange={(e) => { setIntragarm(e.target.value) }}
                                value={intragarm} autoComplete="off"
                                isValid={checkValue === false && intragarm !== '' ? true : false}
                                isInvalid={checkValue === false && intragarm === '' ? true : false}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsPrefix="cancel" className='my-0' onClick={handleClose}>
                        ยกเลิก
                    </Button>
                    <Button bsPrefix="succeed" className='my-0' onClick={handleSubmit}>
                        ยืนยันการเพิ่ม
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}