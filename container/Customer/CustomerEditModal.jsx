import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col,Image } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import AutoComplete from '@/components/AutoComplete'
import CardError from '@/components/CardChange/CardError'
import ModelLoading from '@/components/ModelChange/ModelLoading'
import ModelError from '@/components/ModelChange/ModelError'
export default function PositionEditModal(props) {
    const [{ data: position, loading, error }, getPosition] = useAxios({ url: '/api/position/team' })
    const [{ loading: updatePositionLoading, error: updatePositionError }, executePositionPut] = useAxios({}, { manual: true })

    const [teamSelect, setTeamSelect] = useState('');
    const [positionSelect, setPositionSelect] = useState('');
    const [checkValue, setCheckValue] = useState(true);


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

    const [showCheck, setShowCheck] = useState(false);
    const handleClose = () => { setShowCheck(false), setCheckValue(true) };
    const handleShow = () => setShowCheck(true);
    useEffect(() => {
        if (props) {
            setUsername(props?.value?.username);
            setPassword(props?.value?.password);
            setFirstname(props?.value?.firstname);
            setLastname(props?.value?.lastname);
            
            setFacebook(props?.value?.facebook);
            setLine(props?.value?.line);
            setIntragarm(props?.value?.intragarm);
            setAddressOne(props?.value?.addressTwo);
            setAddressTwo(props?.value?.addressThree);
            setCity(props?.value?.city);
            setPostalCode(props?.value?.postalCode);
            setStatus(props?.value?.status);
            
        }
    }, [props]);

    const teams = position?.reduce((acc, item) => {
        if (!acc.some(i => i.team === item.team)) {
            acc.push(item);
        }
        return acc;
    }, []);

    const clickTeam = value => {
        setTeamSelect(value);
    };
    const handlePutData = () => {
        setCheckValue(false);
        if (username !== '' && password !== '') {
            executePositionPut({
                url: '/api/customer/' + props?.value?.id,
                method: 'PUT',
                data: {
                    // positionId: position,
                    username: username,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
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
                    if (updatePositionLoading?.success) {
                        handleClose()
                    }
                })
            })
        }
    }

    if (loading || updatePositionLoading) return <ModelLoading showCheck={showCheck}/>
    if (error || updatePositionError) return <ModalError show={showCheck} fnShow={handleClose} centered size='lg'/>

    return (
        <>
            <Button bsPrefix='edit' className={showCheck ? 'icon active' : 'icon'} onClick={handleShow}>
                <FaEdit />
            </Button>

            <Modal show={showCheck} onHide={handleClose} centered size='lg'>
                 <Modal.Header closeButton>
                    <Modal.Title className='text-center'>เพิ่มสมาชิกพนักงานองค์กร</Modal.Title>
                </Modal.Header>
                <Modal.Body className='form-customer'>
                    <Row>
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="formFile">
                                <Form.Label className='text-center'>เลือกรูปโปรไฟล์</Form.Label>
                                <Image
                                    width={"100%"}
                                    height="200px"
                                    src={"./images/default.png"}
                                    className="p-4 object-fit-contain"
                                    alt="" />
                                <Form.Control type="file" />
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
                    <Button bsPrefix="succeed" className='my-0' onClick={handlePutData}>
                        ยืนยันการเพิ่ม
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </>
    )
}