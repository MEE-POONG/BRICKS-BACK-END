import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap'
import { FaPlus, FaUserCircle } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import AutoComplete from '@/components/AutoComplete'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
import FormData from 'form-data';
import { CKEditor } from 'ckeditor4-react'

export default function ProductsAddModal(props) {
    
    console.log(props.subTypeData);
    
    
    const [{ error: errorMessage, loading: ProductsLoading }, executeProducts] = useAxios({ url: '/api/products', method: 'POST' }, { manual: true });
    
    const [checkValue, setCheckValue] = useState(true);

    const [showCheck, setShowCheck] = useState(false);


    const handleClose = () => { setShowCheck(false), setCheckValue(true) };
    const handleShow = () => setShowCheck(true);

    const[{loading: imgLoading, error: imgError}, uploadImage]= useAxios({url: '/api/upload', method: 'POST'},{manual: true});


    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [detail, setDetail] = useState('');
    const [subTypeId, setSubTypeId] = useState('');


    useEffect(() => {

        if (image.length < 1) return
        const newImageUrl = []
        image.forEach(image => newImageUrl.push(URL.createObjectURL(image)))
        setImageURL(newImageUrl)
        }, [image])
    
    const onImageProductChange = (e) => {
            setImage([...e.target.files])
        }
    


    const handleSubmit = async event  => { 
        setCheckValue(false)
        if ( name !== '' && price !== ''){ 
            
            handleClose()
            
            let data =new FormData()
            data.append('file', image[0])
            const imageData = await uploadImage({data: data})
            const id =imageData.data.result.id

            await executeProducts({
                data: {
                    name: name,
                    price: price,
                    subTypeId:subTypeId,
                    detail:detail,
                    image: `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,
 
                }
            }).then(() => {
                Promise.all([
                    setName(''),
                    setPrice(''),
                    setImage(''),
                    setSubTypeId(''),
                    setDetail(''),


                    props.getData(),
                ]).then(() => {
                    if (ProductsLoading?.success) {
                        handleClose()
                    }
                })
            });
        } 
    
        
    }

    if (imgLoading || ProductsLoading) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    if (imgError || errorMessage) return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>

    return (
        <>
            <Button bsPrefix="create" className={showCheck ? 'icon active d-flex' : 'icon d-flex'} onClick={handleShow}>
                <FaPlus />{" "}เพิ่มสินค้า
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='lg' className='form-Products'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>เพิ่มสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Row>
                        <Col>
                                    <Form.Group className="mb-3" controlId="price">
                                        <Form.Label>ราคาสินค้า</Form.Label>
                                        <Form.Control type="number" placeholder="เพิ่ม ราคาของสินค้า"
                                         onChange={(e) => { setPrice(e.target.value) }}
                                         value={price} autoComplete="off"
                                         isValid={checkValue === false && price !== '' ? true : false}
                                         isInvalid={checkValue === false && price === '' ? true : false}
                                        />
                                    </Form.Group>
                
                        </Col>
                        <Col>
                                    <Form.Group className="mb-3" controlId="price">
                                        <Form.Label>ราคาสินค้า</Form.Label>
                                        <Form.Control type="number" placeholder="เพิ่ม ราคาของสินค้า"
                                         onChange={(e) => { setPrice(e.target.value) }}
                                         value={price} autoComplete="off"
                                         isValid={checkValue === false && price !== '' ? true : false}
                                         isInvalid={checkValue === false && price === '' ? true : false}
                                        />
                                    </Form.Group>
                        </Col>
                    </Row>

     
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

