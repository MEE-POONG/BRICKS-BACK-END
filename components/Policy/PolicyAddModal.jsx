import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap'
import { FaPlus, FaUserCircle } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import AutoComplete from '@/components/AutoComplete'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
import FormData from 'form-data';
import { CKEditor } from 'ckeditor4-react'

export default function PolicyAddModal(props) {
    
    
    
    const [{ error: errorMessage, loading: PolicyLoading }, executePolicy] = useAxios({ url: '/api/policy', method: 'POST' }, { manual: true });
    
    const [checkValue, setCheckValue] = useState(true);

    const [showCheck, setShowCheck] = useState(false);


    const handleClose = () => { setShowCheck(false), setCheckValue(true) };
    const handleShow = () => setShowCheck(true);
    
    const [headpolicy, setHeadpolicy] = useState('');
    const [subpolicy, setSubpolicy] = useState('');


    const handleSubmit = async event  => { 
        setCheckValue(false)
        { 
            
            handleClose()
            await executePolicy({
                data: {
                    headpolicy:headpolicy,
                    subpolicy:subpolicy,
                }
            }).then(() => {
                Promise.all([    
                    setHeadpolicy(''),
                    setSubpolicy(''),

                    props.getData(),
                ])
            });
        } 
    
        
    }

    if ( PolicyLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    if (errorMessage) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

    return (
        <>
            <Button bsPrefix="create" className={showCheck ? 'icon active d-flex' : 'icon d-flex'} onClick={handleShow}>
                <FaPlus />{" "}เพิ่มนโยบาย
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='lg' className='form-Policy'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>เพิ่มนโยบาย</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Row>
                        <Col md='6'>
                            <Row>
                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="headpolicy">
                                        <Form.Label>ชื่อนโยบาย</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่มชื่อนโยบาย"
                                         onChange={(e) => { setHeadpolicy(e.target.value) }}
                                         value={headpolicy} autoComplete="off"
                                         isValid={checkValue === false && name !== '' ? true : false}
                                         isInvalid={checkValue === false && name === '' ? true : false}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>

                    <h4>เพิ่มข้อมูลรายละเอียดนโยบาย</h4>
                            <Form.Group className="mb-3" controlId="detail">
                                <Form.Label>รายละเอียดนโยบาย</Form.Label>
                                <CKEditor
                                    initData={subpolicy}
                                    onChange={event=> setSubpolicy( event.editor.getData())}
                                    config={{
                                    uiColor: "#ddc173 ",
                                    language: "th",
                                    // extraPlugins: "uploadimage",
                                    // filebrowserUploadMethod: "form",
                                    // filebrowserUploadUrl: ("/uploader/upload"),
                                    // filebrowserBrowseUrl: '/addgallery',
                                    // toolbar: [
                                    // ],
                                    extraPlugins: "easyimage,autogrow,emoji",
                                    // removePlugins: 'image',
                                    }}
                                    />           
                            </Form.Group>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button bg="danger" className="my-0 btn-danger" onClick={handleClose}>
                        ยกเลิก
                    </Button>
                    <Button bg="succeed" className='my-0' onClick={handleSubmit}>
                        ยืนยันการเพิ่ม
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

