/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import IndexPage from "components/layouts/IndexPage";
import {
  Container,
  Card,
  Button,
  Form,
  Table,
} from "react-bootstrap";
import MyPagination from "@/components/Pagination";
import useAxios from "axios-hooks";
import PageLoading from "@/components/PageChange/pageLoading";
import PageError from "@/components/PageChange/pageError";
import UsersAddModal from "@/components/Users/UsersAddModal";
import UsersEditModal from "@/components/Users/UsersEditModal";
import UsersDeleteModal from "@/components/Users/UsersDeleteModal";

export default function SearchUser() {
  const [firstName, setFirstName] = useState("");
  const [searchFirstName, setSearchFirstName] = useState("");

  const [lastName, setLastName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");

  const [name, setName] = useState("");
  const [searchName, setSearchName] = useState("");

  const SearchAllData = () => {
    setFirstName(searchFirstName);
    setLastName(searchLastName);
    setName(searchName);
  };

  const handleClearfilter = () => {
    setFirstName("");
    setSearchFirstName("");

    setLastName("");
    setSearchLastName("");

    setName("");
    setSearchName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container fluid className="pt-4 px-4">
      <Card className=" text-center rounded shadow p-4">
        <div className=" d-inline  justify-content-center ">
          <Form.Group className="mb-3" onSubmit={handleSubmit}>
            <Form.Label>ค้นหาบัญชีสมาชิก</Form.Label>
            <form onSubmit={handleSubmit} className=" d-flex">
              <input
                className="form-control bg-dark border-0 m-2"
                type="search"
                placeholder="ชื่อ"
                value={searchFirstName}
                onChange={(e) => {
                  setSearchFirstName(e.target.value);
                }}
              />
              <input
                className="form-control bg-dark border-0 m-2"
                type="search"
                placeholder="นามสกุล"
                value={searchLastName}
                onChange={(e) => {
                  setSearchLastName(e.target.value);
                }}
              />

              <input
                className="form-control bg-dark border-0 m-2"
                type="search"
                placeholder="ชื่อผู้ใช้"
                value={searchName}
                onChange={(e) => {
                  setSearchName(e.target.value);
                }}
              />
            </form> 
          

            <Button type="submit" className="m-2" onClick={SearchAllData}>
              ค้นหา
            </Button>
            <Button
              type="submit"
              bsPrefix="delete"
              className="icon"
              onClick={handleClearfilter}
            >
              ยกเลิก
            </Button>
          </Form.Group>
        </div>
      </Card>
      {UsersPage(firstName, lastName, name)}
    </Container>
  );
}

function UsersPage(firstName, lastName, name) {
  const [params, setParams] = useState({
    page: "1",
    pageSize: "10",
  });

  const [{ data: usersData, loading, error }, getUsers] = useAxios({
    url: `/api/user?page=1&pageSize=${params.pageSize}&firstName=${firstName}&lastName=${lastName}`,
    method: "GET",
  });
  useEffect(() => {
    if (usersData) {
      setParams({
        ...params,
        page: usersData.page,
        pageSize: usersData.pageSize,
      });
    }
  }, [usersData]);

  const handleSelectPage = (pageValue) => {
    getUsers({ url: `/api/user?page=${pageValue}&pageSize=${params.pageSize}` });
  };
  const handleSelectPageSize = (sizeValue) => {
    getUsers({ url: `/api/user?page=1&pageSize=${sizeValue}` });
  };

  if (loading) {
    return <PageLoading />;
  }
  if (error) {
    return <PageError />;
  }
  return (
    <div  className="pt-4 ">
      <Card className="text-center rounded shadow p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <Card.Title className="mb-0">รายการบัญชีสมาชิก</Card.Title>
          <UsersAddModal getData={getUsers} />
        </div>
        <MyTable data={usersData?.data} getUsers={getUsers} />

        <MyPagination
            page={usersData.page}
            totalPages={usersData.totalPage}
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
          <th>ชื่อจริง</th>
          <th>นามสกุล</th>
          <th>เบอร์โทร</th>
          <th>อีเมล์</th>
          <th>ชื่อผู้ใช้</th>
          <th>จัดการ</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.length
          ? currentItems?.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.tel}</td>
                <td>{item.email}</td>
                <td>{item.username}</td>
                <td>
                  <UsersEditModal value={item} getUsers={props?.getUsers} />
                  <UsersDeleteModal value={item} getUsers={props?.getUsers} />
                </td>
              </tr>
            ))
          : ""}
      </tbody>
    </Table>
  );
}

SearchUser.layout = IndexPage;
