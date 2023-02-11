import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap'
import { FaPlus, FaUserCircle } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import AutoComplete from '@/components/AutoComplete'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
import FormData from 'form-data';
import { CKEditor } from 'ckeditor4-react'

export default function AddOnRateModal(props) {
    
    console.log(props.subTypeData);
    
    
    const [{ error: errorMessage, loading: AddOnRateLoading }, executeAddOnRate] = useAxios({ url: '/api/addOnRate', method: 'POST' }, { manual: true });
    
    const [checkValue, setCheckValue] = useState(true);

    const [showCheck, setShowCheck] = useState(false);


    const handleClose = () => { setShowCheck(false), setCheckValue(true) };
    const handleShow = () => setShowCheck(true);
    
    const [productId, setProductId] = useState(props?.value?.id);
    const [length, setLength] = useState('');
    const [addOn, setAddOn] = useState('');

    const [formValues, setFormValues] = useState([{ length: "", addOn : ""}])


    const handleSubmit = async ()  => { 
        setCheckValue(false)
        {
            handleClose()
             executeAddOnRate({
                data: {
                    productId: productId,
                    length: length,
                    addOn:addOn,
 
                }
            }).then(() => {
                Promise.all([
                    setProductId(''),
                    setLength(''),
                    setAddOn(''),

                    props.getData(),
                ]).then(() => {
                    if (AddOnRateLoading?.success) {
                        handleClose()
                    }
                })
            });
        } 
    
        
    }

    const handleChange = (i, e) => {
        const newFormValues = [...formValues];
            newFormValues[i][e.target.length] = e.target.value;
            setFormValues(newFormValues);
        }
            
        const addFormFields = () => {
            setFormValues([...formValues, { length: "", addOn : "" }])
        }

        const removeFormFields = (i) => {
            const newFormValues = [...formValues];
            newFormValues.splice(i, 1);
            setFormValues(newFormValues)
        }
    // if (imgLoading || AddOnRateLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    // if (imgError || errorMessage) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

    return (
        <>      
            <Button bsPrefix="create" className={showCheck ? 'icon active ' : 'icon '} onClick={handleShow}>
                เพิ่มเรทราคา
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='lg' className='form-AddOnRate'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>เพิ่มเรทราคา</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Row  xs="5">
                        <Col xs={{ span: 5 }}>
                           <Form.Label>ระยะทาง</Form.Label> 
                        </Col>
                        <Col xs={{ span: 5 }}>
                            <Form.Label>ราคาสินค้า บวกเพิ่ม</Form.Label> 
                        </Col>
                    </Row>
                    {formValues.map((element, index) => (
                    
                    <Row key={index} xs="5">
                        <Col xs={{ span: 5 }} >
                                    
                                    <Form.Group className="mb-3 " controlId="length">
                                        <Form.Control type="number" placeholder="เพิ่ม ระยะทาง กม."
                                         onChange={(e) => { handleChange(e.target.value) }}
                                         value={length} autoComplete="off"
                                         isValid={checkValue === false && length !== '' ? true : false}
                                         isInvalid={checkValue === false && length === '' ? true : false}
                                        />
                                    </Form.Group>
                
                        </Col>
                        <Col xs={{ span: 5}} > 
                        
                                       
                                    <Form.Group className="mb-3" controlId="addOn">   
                                        <Form.Control type="number" placeholder="เพิ่ม เรทราคาของสินค้า"
                                         onChange={(e) => { handleChange(e.target.value) }}
                                         value={addOn} autoComplete="off"
                                         isValid={checkValue === false && addOn !== '' ? true : false}
                                         isInvalid={checkValue === false && addOn === '' ? true : false}
                                        />
                                    </Form.Group>
                        </Col>

                        <Col  xs={{ span: 2 }} >
                        {
                            index ? 
                            <Button type="button" bg="danger" className="  btn-danger"  onClick={() => removeFormFields(index)}>ลบ</Button> 
                            : null
                        }
                        </Col>
                        
                        
                    
                        </Row>
                    ))}
                    
                            <Button className="button add" type="button" onClick={() => addFormFields()}>เพิ่ม</Button>
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

