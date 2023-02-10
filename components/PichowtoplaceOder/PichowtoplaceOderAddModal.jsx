import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap'
import { FaPlus, FaUserCircle } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import AutoComplete from '@/components/AutoComplete'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
import FormData from 'form-data';
import { CKEditor } from 'ckeditor4-react'

export default function PichowtoplaceOderAddModal(props) {
    
    console.log(props.subTypeData);
    
    
    const [{ error: errorMessage, loading: PichowtoplaceOderLoading }, executePichowtoplaceOder] = useAxios({ url: '/api/pichowtoplaceOder', method: 'POST' }, { manual: true });
    
    const [checkValue, setCheckValue] = useState(true);

    const [showCheck, setShowCheck] = useState(false);


    const handleClose = () => { setShowCheck(false), setCheckValue(true) };
    const handleShow = () => setShowCheck(true);

    const[{loading: imgLoading, error: imgError}, uploadImage]= useAxios({url: '/api/upload', method: 'POST'},{manual: true});


    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])
    

    useEffect(() => {

        if (image.length < 1) return
        const newImageUrl = []
        image.forEach(image => newImageUrl.push(URL.createObjectURL(image)))
        setImageURL(newImageUrl)
        }, [image])
    
    const onImagePichowtoplaceOderChange = (e) => {
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

            await executePichowtoplaceOder({
                data: {
                    image: `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,
 
                }
            }).then(() => {
                Promise.all([
                    setImage(''),

                    props.getPichowtoplaceOder(),
                ]).then(() => {
                    if (PichowtoplaceOderLoading?.success) {
                        handleClose()
                    }
                })
            });
        } 
    
        
    }

    if (imgLoading || PichowtoplaceOderLoading)  return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    if (imgError || errorMessage)  return (
        <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>
      );

    return (
        <>
            <Button bsPrefix="create" className={showCheck ? 'icon active d-flex' : 'icon d-flex'} onClick={handleShow}>
                <FaPlus />{" "}เพิ่มรูปภาพ
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='lg' className='form-PichowtoplaceOder'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>เพิ่มรูปภาพ</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Row>
                        <Col md='6'>
                            <Form.Group className="mb-3" controlId="formFile">
                                <Form.Label className='text-center'>เลือกรูปสินค้า</Form.Label>

                                    <Form.Label className='d-block'>รูปภาพ</Form.Label>
                                    {imageURL.map((imageSrcPichowtoplaceOder, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcPichowtoplaceOder} alt="PichowtoplaceOder" fluid rounded />)}
                                    <Form.Control type="file" accept="image/*" onChange={onImagePichowtoplaceOderChange} />
                    
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

