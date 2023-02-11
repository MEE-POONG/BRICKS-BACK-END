import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap'
import { FaPlus, FaUserCircle } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import AutoComplete from '@/components/AutoComplete'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
import FormData from 'form-data';
import { CKEditor } from 'ckeditor4-react'

export default function PichomeTopAddModal(props) {
    
    console.log(props.subTypeData);
    
    
    const [{ error: errorMessage, loading: PichomeTopLoading }, executePichomeTop] = useAxios({ url: '/api/pichomeTop', method: 'POST' }, { manual: true });
    
    const [checkValue, setCheckValue] = useState(true);

    const [showCheck, setShowCheck] = useState(false);


    const handleClose = () => { setShowCheck(false), setCheckValue(true) };
    const handleShow = () => setShowCheck(true);

    const[{loading: imgLoading, error: imgError}, uploadImage]= useAxios({url: '/api/upload', method: 'POST'},{manual: true});


    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])
    
    const [name, setName] = useState('');
    const [links, setLinks] = useState('');


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
        { 
            handleClose()
            
            let data =new FormData()
            data.append('file', image[0])
            const imageData = await uploadImage({data: data})
            const id =imageData.data.result.id

            await executePichomeTop({
                data: {
                    name: name,
                    links: links,
                    image: `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,
 
                }
            }).then(() => {
                Promise.all([
                    setName(''),
                    setLinks(''),
                    setImage(''),


                    props.getPichomeTopData(),
                ]).then(() => {
                    if (PichomeTopLoading?.success) {
                        handleClose()
                    }
                })
            });
        } 
    
        
    }

    if (imgLoading || PichomeTopLoading)  return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    if (imgError || errorMessage)  return (
        <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>
      );

    return (
        <>
            <Button bsPrefix="create" className={showCheck ? 'icon active d-flex' : 'icon d-flex'} onClick={handleShow}>
                <FaPlus />{" "}เพิ่มข้อมูลลูกค้าของเรา
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='lg' className='form-PichomeTop'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>เพิ่มข้อมูลลูกค้าของเรา</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Row>
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="formFile">
                                <Form.Label className='text-center'>เลือกรูปสินค้า</Form.Label>

                                    <Form.Label className='d-block'>รูปภาพ</Form.Label>
                                    {imageURL.map((imageSrcProduct, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcProduct} alt="product_img" fluid rounded />)}
                                    <Form.Control type="file" accept="image/*" onChange={onImageProductChange} />
                    
                            </Form.Group>
                        </Col>
                            <Row>
                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>ชื่อโลโก้</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่มชื่อโลโก้ร้าน"
                                         onChange={(e) => { setName(e.target.value) }}
                                         value={name} autoComplete="off"
                                         isValid={checkValue === false && name !== '' ? true : false}
                                         isInvalid={checkValue === false && name === '' ? true : false}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="links">
                                        <Form.Label>ลิงค์โลโก้</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่ม links"
                                         onChange={(e) => { setLinks(e.target.value) }}
                                         value={links} autoComplete="off"
                                         isValid={checkValue === false && links !== '' ? true : false}
                                         isInvalid={checkValue === false && links === '' ? true : false}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
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

