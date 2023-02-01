import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import ProductsAddModal from '@/container/products/productsAddModal'
import ProductsDeleteModal from '@/container/Products/ProductsDeleteModal'
import ProductsEditModal from '@/container/Products/ProductsEditModal'
import AddOnRateModal from '@/container/Products/AddOnRateModal'

export default function Search() {
    const [name, setName] = useState("")

    return (
        <Container fluid className="pt-4 px-4">
            <Card className=" text-center rounded shadow p-4">
                <div className=" d-inline  justify-content-center ">


                    <Form.Group className="mb-3" >
                        <Form.Label>ค้นหาสินค้า</Form.Label>
                        <form className="d-none d-md-flex ms-4">
                        <input
                            className="form-control bg-dark border-0"
                            type="search"
                            placeholder="Search"
                            onChange={(e) => {
                                setName(e.target.value);
                                }}
                        />
                        </form>
                    </Form.Group>

                </div>
            </Card >
           {ProductPage(name)}
        </Container >
        
    );
}

 function ProductPage(name) {
    const [params, setParams] = useState({
        page: '1',
        pageSize: '10'
    });
    
    

    const [{ data: productsData, loading, error }, getProduct] = useAxios({ url: `/api/products?page=1&pageSize=10&name=${name}`, method: 'GET' });

    const [{ data: subTypeData }, getSubType] = useAxios({
        url: "../api/subType?",
      });


    
    useEffect(() => {
        if (productsData) {
            setParams({
                ...params,
                page: productsData.page,
                pageSize: productsData.pageSize
            });
        }
    }, [productsData]);

    const handleSelectPage = (pageValue) => {
        getProduct({ url: `/api/products?page=${pageValue}&pageSize=${params.pageSize}` })
    };
    const handleSelectPageSize = (sizeValue) => {
        getProduct({ url: `/api/products?page=1&pageSize=${sizeValue}` })
    };

    if (loading) {
        return <PageLoading />;
    }
    if (error) {
        return <PageError />;
    }
    return (
        <Container fluid className="pt-4">
            <Card className=" text-center rounded shadow p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <Card.Title className="mb-0">
                        รายการสินค้า
                    </Card.Title>

                    <ProductsAddModal getData={getProduct} getSubTypeData={subTypeData?.data}/>
                </div>
                <MyTable data={productsData?.data} setNum={(productsData?.page * productsData?.pageSize) - productsData?.pageSize} getData={getProduct} getSubTypeData={subTypeData?.data} />
                <MyPagination page={productsData.page} totalPages={productsData.totalPage} onChangePage={handleSelectPage} pageSize={params.pageSize} onChangePageSize={handleSelectPageSize} />
            </Card >
        </Container >
    );
}

function MyTable(props) {
    const [currentItems, setCurrentItems] = useState(props?.data);
    const [numberSet, setNumberSet] = useState(props?.setNum);
    useEffect(() => {
        setCurrentItems(currentItems);
        console.log(props);
    }, [props]);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>ภาพ</th>
                    <th>ชื่อสินค่า</th>
                    <th>ประเภทสินค้า</th>
                    <th>ราคา</th>
                    <th>รายละเอียด</th>
                    <th>จัดการ</th>
                </tr>
            </thead>
            <tbody>
           { currentItems?.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1 + numberSet}</td>
                            <td>
                                <Image src={item.image}  width="150px" height="150px" className='object-fit-cover' />
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                <Badge bg="primary">
                                    {item.subType.type.name}
                                </Badge>
                                <br/>
                                <Badge bg="primary">
                                    {item.subType.name}
                                </Badge>
                            </td>
                            <td>
                                {item.price}{' '}บาท
                            </td>
                            <td>
                                <div dangerouslySetInnerHTML={{ __html: item?.detail}} />
                            </td>
                            <td>
                                <AddOnRateModal value={item} getData={props?.getData}/>
                                <ProductsEditModal value={item} getData={props?.getData} getSubTypeData={props.getSubTypeData} />
                                <ProductsDeleteModal value={item} getData={props?.getData} />
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    );
}

Search.layout = IndexPage