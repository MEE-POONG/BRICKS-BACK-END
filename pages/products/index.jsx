import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import { Container, Modal, Card, Button, Form, Image, InputGroup, Row, Col, Table, Pagination, Badge } from 'react-bootstrap'
import MyPagination from "@/components/Pagination"
import useAxios from 'axios-hooks'
import PageLoading from '@/components/PageChange/pageLoading'
import PageError from '@/components/PageChange/pageError'
import ProductsAddModal from '@/components/products/productsAddModal'
import ProductsDeleteModal from '@/components/Products/ProductsDeleteModal'
import ProductsEditModal from '@/components/Products/ProductsEditModal'
import AddOnRateModal from '@/components/Products/AddOnRateModal'
import AddImageProductModal from '@/components/Products/AddImageProduct'

export default function Search() {

    const [{ data: subTypeData }, getSubType] = useAxios({
        url: "../api/subType?",
      });
    

  const [name, setName] = useState("");
  const [searchName, setSearchName] = useState("");

  const [subTypeId, setSubTypeId] = useState("");
  const [searchSubTypeId, setSearchSubTypeId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container fluid className="pt-4 px-4">
      <Card className=" text-center rounded shadow p-4">
        <div className=" d-inline  justify-content-center ">
          <Form.Group className="mb-3" onSubmit={handleSubmit}>
            <Form.Label>ค้นหาสินค้า</Form.Label>
            <form onSubmit={handleSubmit}>
              <input
                className="form-control bg-dark border-0"
                type="search"
                placeholder="Search"
                value={searchName}
                onChange={(e) => {
                  setSearchName(e.target.value);
                }}
              />

              <Form.Group className="mb-3" controlId="price">
                <Form.Label>ประเภทสินค้า</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setSubTypeId(e.target.value);
                  }}
                  value={subTypeId}
                >
                  <option value="">ประเภทสินค้า</option>
                  {subTypeData?.data?.map((subTypeData, index) => (
                    <option key={index} value={subTypeData.id}>
                      {subTypeData.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Button
                type="submit"
                className="m-2"
                onClick={() => {
                  setName(searchName);
                }}
              >
                ค้นหาสินค้า
              </Button>
              <Button
                type="submit"
                bsPrefix="delete"
                className="icon"
                onClick={() => {
                  setName(""), setSearchName("");
                }}
              >
                ยกเลิก
              </Button>
            </form>
          </Form.Group>
        </div>
      </Card>

      {ProductPage(name,subTypeData,subTypeId)}
    </Container>
  );
}

function ProductPage(name,subTypeData,subTypeId) {
  const [params, setParams] = useState({
    page: "1",
    pageSize: "10",
  });

  const [
    { data: productsData, loading: productLoading, error: productError },
    getProduct,
  ] = useAxios({
    url: `/api/products?page=1&pageSize=10&name=${name}`,
    method: "GET",
  });

  useEffect(() => {
    getProduct().catch((error) => {
      console.log(error);
    });
  }, [name]);

  useEffect(() => {
    if (productsData) {
      setParams({
        ...params,
        page: productsData.page,
        pageSize: productsData.pageSize,
      });
    }
  }, [productsData]);

  const handleSelectPage = (pageValue) => {
    getProduct(
      {
        url: `/api/products?&name=${name}&page=${pageValue}&pageSize=${params.pageSize}`,
      },
      { manual: true }
    );
  };
  const handleSelectPageSize = (sizeValue) => {
    getProduct(
      { url: `/api/products?page=1&pageSize=${sizeValue}` },
      { manual: true }
    );
  };

  if (productLoading) {
    return <PageLoading />;
  }
  if (productError) {
    return <PageError />;
  }
  return (
    <div fluid className="pt-4">
      <Card className=" text-center rounded shadow p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <Card.Title className="mb-0">รายการสินค้า</Card.Title>

          <ProductsAddModal
            getData={getProduct}
            getSubTypeData={subTypeData?.data}
          />
        </div>
        <MyTable
          data={productsData?.data}
          setNum={
            productsData?.page * productsData?.pageSize - productsData?.pageSize
          }
          getData={getProduct}
          getSubTypeData={subTypeData?.data}
        />
        <MyPagination
          page={productsData.page}
          totalPages={productsData.totalPage}
          onChangePage={handleSelectPage}
          pageSize={params.pageSize}
          onChangePageSize={handleSelectPageSize}
        />
      </Card>
    </div>
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
                    <th>ภาพเพิ่มเติม</th>
                    <th>ชื่อสินค้า</th>
                    <th>ประเภทสินค้า</th>
                    <th>ราคา</th>
                    <th>รายละเอียด</th>
                    <th>เรทราคา</th>
                    <th>จัดการ</th>
                </tr>
            </thead>
            <tbody>
           { currentItems?.map((item, index) => (
                        <tr key={item.id}>
                            <td>{item.productCode}</td>
                            <td>
                                <Image src={item.image}  width="150px" height="150px" className='object-fit-cover' />
                            </td>
                            <td>
                            <AddImageProductModal value={item} getData={props?.getData}/>
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
                            </td>
                            <td>
                                <ProductsEditModal value={item} getData={props?.getData} getSubTypeData={props.getSubTypeData} />
                                <ProductsDeleteModal value={item} getData={props?.getData} />
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>
    );
}

Search.layout = IndexPage;
