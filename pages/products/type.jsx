import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Button, Form, Image, InputGroup, Row, Col } from 'react-bootstrap'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'

export default function ProductPage() {
    const [{ data: categoryData }, getCatagories] = useAxios({ url: '/api/category' })
    const [{ data: unitData }, getUnits] = useAxios({ url: '/api/unit' })
    const [{ data: productData, loading, error }, getProducts] = useAxios({ url: '/api/products' })
    const [{ data: productById, loading: productByIdLoading, error: productByIdError }, getProductById] = useAxios({}, { manual: true })

    const [{ data: postData, error: errorMessage, loading: productLoading }, executeProduct] = useAxios({ url: '/api/products', method: 'POST' }, { manual: true });
    const [{ loading: updateProductLoading, error: updateProductError }, executeProductPut] = useAxios({}, { manual: true })
    const [{ loading: deleteProductLoading, error: deleteProductError }, executeProductDelete] = useAxios({}, { manual: true })

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [unit, setUnit] = useState('');
    const [amount, setAmount] = useState('');
    const [img, setImg] = useState('');

    // image product other
    const [images, setImages] = useState([])
    const [imageURLs, setImageURLs] = useState([])

    // image product
    const [image, setImage] = useState([])
    const [imageURL, setImageURL] = useState([])


    // modal
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

    useEffect(() => {
        setName(productById?.name)
        setPrice(productById?.price)
        setCategory(productById?.categoryId)
        setDescription(productById?.description)
        setUnit(productById?.unitId)
        setAmount(productById?.amount)
        setImg(productById?.image)
    }, [productById])

    const ShowModalCreate = () => setShowModalCreate(true);

    const ShowModalEdit = async (id) => {
        await getProductById({ url: '/api/products/' + id, method: 'GET' });
        setShowModalEdit(true);
    }

    const CloseModal = () => { setShowModalCreate(false), setShowModalEdit(false) };

    useEffect(() => {

        if (image.length < 1) return
        const newImageUrl = []
        image.forEach(image1 => newImageUrl.push(URL.createObjectURL(image1)))
        setImageURL(newImageUrl)
    }, [image])

    const onImageProductChange = (e) => {
        setImage([...e.target.files])
    }

    useEffect(() => {
        if (images.length < 1) return

        const newImageUrls = []
        images.forEach(image => newImageUrls.push(URL.createObjectURL(image)))
        setImageURLs(newImageUrls)
    }, [images])

    const onImageOtherChange = (e) => {
        setImages([...e.target.files])
    }

    if (loading || productLoading || productByIdLoading || updateProductLoading || deleteProductLoading) return <PageLoading />
    if (error || errorMessage || productByIdError || updateProductError || deleteProductError) return <PageError />

    return (
        <>
            <Container fluid className="pt-4 px-4">
                <div className="bg-secondary text-center rounded shadow p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <h6 className="mb-0">รายการสินค้า</h6>
                        <Button variant="success" onClick={ShowModalCreate}>
                            <FaPlus />
                        </Button>
                    </div>
                    <div className="table-responsive">
                        <table className="table text-start table-striped align-middle table-hover mb-0">
                            <thead>
                                <tr className="text-white">
                                    <th scope="col">รูปภาพ</th>
                                    <th scope="col">ชื่อสินค้า</th>
                                    <th scope="col">ประเภทสินค้า</th>
                                    <th scope="col">จำนวนคงเหลือ</th>
                                    <th scope="col">ราคา</th>
                                    <th scope="col">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productData?.map((product, index) => (
                                    <tr key={index}>
                                        <td>
                                            <img className="rounded-circle flex-shrink-0" src={product.image} alt="" style={{ width: "40px", height: "40px" }} />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product?.category?.name}</td>
                                        <td>{product.amount} {product.unit.name}</td>
                                        <td>{product.price} บาท</td>
                                        <td>
                                            <a className="btn btn-sm btn-success me-2" onClick={() => ShowModalEdit(product.id)}><FaEdit /></a>
                                            <a className="btn btn-sm btn-danger me-2"
                                                onClick={() => executeProductDelete({
                                                    url: '/api/products/' + product.id,
                                                    method: 'DELETE'
                                                })}
                                            ><FaTrash /></a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Container>

            {/* Create */}
            <Modal show={showModalCreate} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>เพิ่มสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปสินค้า</Form.Label>
                        {imageURL.map((imageSrcProduct, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcProduct} alt="product_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageProductChange} />
                    </Form.Group>
                    {/* <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปสินค้า เพิ่มเติม</Form.Label>
                        <Row>
                            <Col >
                                {imageURLs.map((imageSrc, index) =>
                                    <Image key={index} className="mb-2 mx-2" style={{ height: 100 }} src={imageSrc} alt="product_img" fluid rounded />
                                )}
                            </Col>
                        </Row>
                        <Form.Control type="file" multiple accept="image/*" onChange={onImageOtherChange} />
                    </Form.Group> */}
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อสินค้า</Form.Label>
                        <Form.Control type="text" value={name} onChange={event => setName(event.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียดสินค้า</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={event => setDescription(event.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ประเภทสินค้า</Form.Label>
                        <Form.Select value={category} onChange={event => setCategory(event.target.value)}>
                            <option value="">ประเภทสินค้า</option>
                            {categoryData?.map((category, index) => (
                                <option key={index} value={category.id}>{category.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Label>จำนวนคงเหลือ</Form.Label>
                    <InputGroup className="mb-3" >
                        <Form.Control type="text" value={amount} onChange={event => setAmount(event.target.value)} />
                        <Form.Select value={unit} onChange={event => setUnit(event.target.value)}>
                            <option value="">หน่วยนับ</option>
                            {unitData?.map((units, index) => (
                                <option key={index} value={units.id}>{units.name}</option>
                            ))}
                        </Form.Select>
                    </InputGroup>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ราคา</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control type="number" value={price} onChange={event => setPrice(event.target.value)} />
                            <InputGroup.Text>บาท</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={async event => {
                        await executeProduct({
                            data: {
                                name: name,
                                description: description,
                                categoryId: category,
                                amount: amount,
                                unitId: unit,
                                price: price,
                                image: "https://consumer.healthday.com/media-library/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8yMzYzNDQzOS9vcmlnaW4uanBnIiwiZXhwaXJlc19hdCI6MTcyNzU0MzgzMn0.TnRo4v4ekpBk8vWeNr9t-w-2BSOBV7uyXT0yyzvZcMg/image.jpg?width=1245&height=700&quality=85&coordinates=0%2C0%2C0%2C0",
                            }
                        }).then(() => {
                            Promise.all([
                                setName(''),
                                setDescription(''),
                                setCategory(''),
                                setAmount(''),
                                setUnit(''),
                                setPrice(''),
                                getProducts(),
                                getCatagories(),
                                getUnits(),
                            ]).then(() => {
                                CloseModal()
                            })
                        })
                    }}>
                        เพิ่ม
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Edit */}
            <Modal show={showModalEdit} onHide={CloseModal} centered className="bg-templant">
                <Modal.Header closeButton >
                    <Modal.Title>รายละเอียดสินค้า</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปสินค้า</Form.Label>
                        {imageURL?.length === 0 && <Image className="mb-2" style={{ height: 200 }} src={img} alt="product_img" fluid rounded />}
                        {imageURL?.map((imageSrcProduct, index) => <Image key={index} className="mb-2" style={{ height: 200 }} src={imageSrcProduct} alt="product_img" fluid rounded />)}
                        <Form.Control type="file" accept="image/*" onChange={onImageProductChange} />
                    </Form.Group>
                    {/* <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='d-block'>รูปสินค้า เพิ่มเติม</Form.Label>
                        <Row>
                            <Col >
                                {imageURLs.map((imageSrc, index) =>
                                    <Image key={index} className="mb-2 mx-2" style={{ height: 100 }} src={imageSrc} alt="product_img" fluid rounded />
                                )}
                            </Col>
                        </Row>
                        <Form.Control type="file" multiple accept="image/*" onChange={onImageOtherChange} />
                    </Form.Group> */}
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ชื่อสินค้า</Form.Label>
                        <Form.Control type="text" value={name} onChange={event => setName(event.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>รายละเอียดสินค้า</Form.Label>
                        <Form.Control as="textarea" rows={3} value={description} onChange={event => setDescription(event.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ประเภทสินค้า</Form.Label>
                        <Form.Select value={category} onChange={event => setCategory(event.target.value)}>
                            <option value="">ประเภทสินค้า</option>
                            {categoryData?.map((category, index) => (
                                <option key={index} value={category.id}>{category.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Label>จำนวนคงเหลือ</Form.Label>
                    <InputGroup className="mb-3" >
                        <Form.Control type="text" value={amount} onChange={event => setAmount(event.target.value)} />
                        <Form.Select value={unit} onchange={event => setUnit(event.target.value)}>
                            <option value="">หน่วยนับ</option>
                            {unitData?.map((unit, index) => (
                                <option key={index} value={unit.id}>{unit.name}</option>
                            ))}
                        </Form.Select>
                    </InputGroup>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>ราคา</Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control type="number" value={price} onChange={event => setPrice(event.target.value)} />
                            <InputGroup.Text>บาท</InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={CloseModal}>
                        ยกเลิก
                    </Button>
                    <Button variant="success" onClick={() => {

                        executeProductPut({
                            url: '/api/products/' + productById?.id,
                            method: 'PUT',
                            data: {
                                name: name,
                                description: description,
                                categoryId: category,
                                amount: amount,
                                unitId: unit,
                                price: price,
                            }
                        }).then(() => {
                            Promise.all([
                                setName(''),
                                setDescription(''),
                                setCategory(''),
                                setAmount(''),
                                setUnit(''),
                                setPrice(''),
                                getProducts(),
                                getCatagories(),
                                getUnits(),
                            ]).then(() => {
                                CloseModal()
                            })
                        })

                    }}>
                        บันทึก
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
ProductPage.layout = IndexPage