import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap'
import { FaPlus, FaUserCircle } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import AutoComplete from '@/components/AutoComplete'
import CardLoading from '@/components/CardChange/CardLoading'
import CardError from '@/components/CardChange/CardError'
import FormData from 'form-data';
import { CKEditor } from 'ckeditor4-react'

export default function HowtoplaceOderAddModal(props) {
    
   
    
    const [{ error: errorMessage, loading: HowtoplaceOderLoading }, executeHowtoplaceOder] = useAxios({ url: '/api/howtoplaceOder', method: 'POST' }, { manual: true });
    
    const [checkValue, setCheckValue] = useState(true);

    const [showCheck, setShowCheck] = useState(false);


    const handleClose = () => { setShowCheck(false), setCheckValue(true) };
    const handleShow = () => setShowCheck(true);

    const[{loading: imgLoading, error: imgError}, uploadImage]= useAxios({url: '/api/upload', method: 'POST'},{manual: true});


    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])
    
        
    const [headtitle, setHeadtitle] = useState('');
    const [title, setTitle] = useState('');
    const [steps, setSteps] = useState('');
    const [substeps, setSubsteps] = useState('');

    useEffect(() => {

        if (image.length < 1) return
        const newImageUrl = []
        image.forEach(image => newImageUrl.push(URL.createObjectURL(image)))
        setImageURL(newImageUrl)
        }, [image])
    
    const onImageHowtoplaceOderChange = (e) => {
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

            await executeHowtoplaceOder({
                data: {
                    headtitle: headtitle,
                    title: title,
                    steps: steps,
                    substeps: substeps,
                    image: `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${id}/public`,
 
                }
            }).then(() => {
                Promise.all([
                    setHeadtitle(''),
                    setTitle(''),
                    setSteps(''),
                    setSubsteps(''),
                    setImage(''),

                    props.getHowtoplaceOder(),
                ]).then(() => {
                    if (HowtoplaceOderLoading?.success) {
                        handleClose()
                    }
                })
            });
        } 
    
        
    }

    if (imgLoading || HowtoplaceOderLoading)  return <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardLoading /></Modal >
    if (imgError || errorMessage)  return (
        <Modal show={showCheck} onHide={handleClose} centered size='lg'><CardError /></Modal>
      );

    return (
        <>
            <Button bsPrefix="create" className={showCheck ? 'icon active d-flex' : 'icon d-flex'} onClick={handleShow}>
                <FaPlus />{" "}เพิ่มข้อมูลวิธีการสั่งซื้อสินค้า
            </Button>
            <Modal show={showCheck} onHide={handleClose} centered size='lg' className='form-HowtoplaceOder'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>เพิ่มข้อมูลวิธีการสั่งซื้อสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                          <Row>

                        <Col md='12'>
                            <Form.Group className="mb-3" controlId="formFile">
                                <Form.Label className='text-center'>เลือกรูปสินค้า</Form.Label>

                                    <Form.Label className='d-block'>รูปภาพ</Form.Label>
                                    {imageURL.map((imageSrcHowtoplaceOder, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcHowtoplaceOder} alt="HowtoplaceOder" fluid rounded />)}
                                    <Form.Control type="file" accept="image/*" onChange={onImageHowtoplaceOderChange} />
                    
                            </Form.Group>
                        </Col>
                        <Col md='12'>
                        <Form.Group className="mb-3" controlId="steps">
                                        <Form.Label>ชื่อหัวข้อขั้นตอน</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่มชื่อนโยบาย"
                                         onChange={(e) => { setSteps(e.target.value) }}
                                         value={steps} autoComplete="off"
                                         isValid={checkValue === false && name !== '' ? true : false}
                                         isInvalid={checkValue === false && name === '' ? true : false}
                                        />
                                    </Form.Group>
                        <Form.Group className="mb-3" controlId="title">
                             <Form.Label>รายละเอียดขั้นตอน</Form.Label>
                                <CKEditor
                                    initData={substeps}
                                    onChange={event=> setSubsteps( event.editor.getData())}
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

