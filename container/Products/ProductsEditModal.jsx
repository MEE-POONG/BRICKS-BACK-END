import React, { useEffect, useState } from 'react'
import { Modal, Button, Form, Row, Col,Image } from 'react-bootstrap'
import { FaEdit } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import AutoComplete from '@/components/AutoComplete'
import CardError from '@/components/CardChange/CardError'
import ModelLoading from '@/components/ModelChange/ModelLoading'
import ModelError from '@/components/ModelChange/ModelError'
import FormData from 'form-data';
import { CKEditor } from 'ckeditor4-react'

export default function ProductsEditModal(props) {
    
    const [{ loading: updateProductsLoading, error: updateProductsError }, executeProductsPut] = useAxios({}, { manual: true })

    const [checkValue, setCheckValue] = useState(true);


    const[{loading: imgLoading, error: imgError}, uploadImage]= useAxios({url: '/api/upload', method: 'POST'},{manual: true});

    const [img, setImg] = useState([])
    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [detail, setDetail] = useState('');
    const [subTypeId, setSubTypeId] = useState('');


    const [showCheck, setShowCheck] = useState(false);
    const handleClose = () => { setShowCheck(false), setCheckValue(true) };
    const handleShow = () => setShowCheck(true);



       
    useEffect(() => {
        
        
            if (props){
            setName(props?.value?.name);
            setDetail(props?.value?.detail);
            setPrice(props?.value?.price);
            setSubTypeId(props?.value?.subTypeId)
            setImg(props?.value?.image);
            }

        },[props] )
        

        useEffect(() => {

            if (image.length < 1) return
            const newImageUrl = []
            image.forEach(image => newImageUrl.push(URL.createObjectURL(image)))
            setImageURL(newImageUrl)
            }, [image])
        
        const onImageProductChange = (e) => {
                setImage([...e.target.files])
            }
        
    
  

    const handlePutData = async () => {
        setCheckValue(false);
        if (image[0] === undefined)  {

            let data =new FormData()
            data.append('file', image[0])
            const imageData = await uploadImage({data: data})
            const id =imageData.data.result.id

            await executeProductsPut({
                url: '/api/products/' + props?.value?.id,
                method: 'PUT',
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
                    if (updateProductsLoading?.success) {
                        handleClose()
                    }
                })
            })
        }else {
            let data =new FormData()
            data.append('file', image[0])
            const imageData = await uploadImage({data: data})
            const id =imageData.data.result.id

            await executeProductsPut({
                url: '/api/products/' + props?.value?.id,
                method: 'PUT',
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
                    if (updateProductsLoading?.success) {
                        handleClose()
                    }
                })
            })
        }
    }

    // if (loading || updateProductsLoading) return <ModelLoading showCheck={showCheck}/>
    // if (error || updateProductsError) return <ModalError show={showCheck} fnShow={handleClose} centered size='lg'/>

    return (
        <>
            <Button bsPrefix='edit' className={showCheck ? 'icon active' : 'icon'} onClick={handleShow}>
                <FaEdit />
            </Button>

            <Modal show={showCheck} onHide={handleClose} centered size='lg' className='form-Products'>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>เพิ่มสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Row>
                        <Col md='6'>
                        <Form.Group className="mb-3" controlId="formFile">
                                <Form.Label className='text-center'>เลือกรูปสินค้า</Form.Label>

                                    <Form.Label className='d-block'>รูปภาพ</Form.Label>
                                    {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={img} alt="product_img" fluid rounded />}
                                    {imageURL?.map((imageSrcProduct, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcProduct} alt="product_img" fluid rounded />)}
                                    <Form.Control type="file" accept="image/*" onChange={onImageProductChange} />
                    
                            </Form.Group>
                        </Col>
                        <Col md='6'>
                            <Row>
                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="name">
                                        <Form.Label>ชื่อสินค้า</Form.Label>
                                        <Form.Control type="text" placeholder="เพิ่มชื่อสินค้า"
                                         onChange={(e) => { setName(e.target.value) }}
                                         value={name} autoComplete="off"
                                         isValid={checkValue === false && name !== '' ? true : false}
                                         isInvalid={checkValue === false && name === '' ? true : false}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md='12'>
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

                                <Col md='12'>
                                    <Form.Group className="mb-3" controlId="price">
                                        <Form.Label>ประเภทสินค้า</Form.Label>
                                        <Form.Select  
                                         onChange={(e) => { setSubTypeId(e.target.value) }}
                                         value={subTypeId} autoComplete="off"
                                         isValid={checkValue === false && subTypeId !== '' ? true : false}
                                         isInvalid={checkValue === false && subTypeId === '' ? true : false}>
                                            <option value="">ประเภทสินค้า</option>
                                            {props?.getSubTypeData?.map((subTypeData, index) => (
                                                <option key={index} value={subTypeData.id}>{subTypeData.name}</option>
                                            ))}

                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                            </Row>

                        </Col>
                    </Row>
                    <h4>เพิ่มข้อมูลสินค้า</h4>
                            <Form.Group className="mb-3" controlId="detail">
                                <Form.Label>รายละเอียดสินค้า</Form.Label>
                                <CKEditor
                                    initData={detail}
                                    onChange={event=> setDetail( event.editor.getData())}
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
                    <Button bg="succeed" className='my-0' onClick={handlePutData}>
                        ยืนยันการเพิ่ม
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </>
    )
    
}

  