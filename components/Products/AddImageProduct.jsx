import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap'
import { FaPlus, FaUserCircle } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import AutoComplete from '@/components/AutoComplete'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
import FormData from 'form-data';
import { CKEditor } from 'ckeditor4-react'

export default function AddImageProductModal(props) {
    
    console.log(props.subTypeData);
    
    
    const [{ error: errorMessage, loading: AddImageProductLoading }, executeAddImageProduct] = useAxios({ url: '/api/addImageProduct', method: 'POST' }, { manual: true });
    
    const [checkValue, setCheckValue] = useState(true);

    const [showCheck, setShowCheck] = useState(false);


    const handleClose = () => { setShowCheck(false), setCheckValue(true) };
    const handleShow = () => setShowCheck(true);
    
    const [productId, setProductId] = useState(props?.value?.id);
    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])

    // const [formValues, setFormValues] = useState([{ name: "", email : ""}])

    useEffect(() => {

        if (image.length < 1) return
        const newImageUrl = []
        image.forEach(image => newImageUrl.push(URL.createObjectURL(image)))
        setImageURL(newImageUrl)
        }, [image])
    
    const onImageProductChange = (e) => {
            setImage([...e.target.files])
        }
    

    const handleSubmit = async ()  => { 
        setCheckValue(false)
        {
            handleClose()
             executeAddImageProduct({
                data: {
                    productId: productId,
                    image: image,
                }
            }).then(() => {
                Promise.all([
                    setProductId(''),
                    setImage(''),

                    props.getData(),
                ]).then(() => {
                    if (AddImageProductLoading?.success) {
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
            setFormValues([...formValues, { length: "", email: "" }])
        }

        const removeFormFields = (i) => {
            const newFormValues = [...formValues];
            newFormValues.splice(i, 1);
            setFormValues(newFormValues)
        }
    // if (imgLoading || AddImageProductLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    // if (imgError || errorMessage) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

    return (
        <>      
            <Button bsPrefix="create" className={showCheck ? 'icon active ' : 'icon '} onClick={handleShow}>
                เพิ่มรูปสินค้า
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='lg' className='form-AddImageProduct'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>เพิ่มรูปสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                   
                    <Row xs="5">
                        <Col xs={{ span: 5 }} >
                                    
                        <Form.Group className="mb-3" controlId="formFile">
                                <Form.Label className='text-center'>เลือกรูปสินค้า</Form.Label>
                                    <Form.Label className='d-block'>รูปภาพ</Form.Label>
                                    {imageURL.map((imageSrcProduct, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcProduct} alt="product_img" fluid rounded />)}
                                    <Form.Control type="file" accept="image/*" onChange={onImageProductChange} />
                    
                            </Form.Group>
                        </Col>
                   </Row>
                    
                    
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

