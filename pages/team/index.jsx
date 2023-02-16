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
import TeamAddModal from "@/components/Team/TeamAddModal";
import TeamEditModal from "@/components/Team/TeamEditModal";
import TeamDeleteModal from "@/components/Team/TeamDeleteModal";

export default function Search() {
  const [fname, setFName] = useState("");
  const [searchFName, setSearchFName] = useState("");

  const [lname, setLName] = useState("");
  const [searchLName, setSearchLName] = useState("");

  const [username, setUserName] = useState("");
  const [searchUserName, setSearchUserName] = useState("");

  const SearchAllData = () => {
    setFName(searchFName);
    setLName(searchLName);
    setUserName(searchUserName);
  };

  const handleClearfilter = () => {
    setFName("");
    setSearchFName("");

    setLName("");
    setSearchLName("");

    setUserName("");
    setSearchUserName("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container fluid className="pt-4 px-4">
      <Card className=" text-center rounded shadow p-4">
        <div className=" d-inline  justify-content-center ">
          <Form.Group className="mb-3" onSubmit={handleSubmit}>
            <Form.Label>ค้นหาบัญชีผู้ดูแลระบบ</Form.Label>
            <form onSubmit={handleSubmit} className=" d-flex">
              <input
                className="form-control bg-dark border-0 m-2"
                type="search"
                placeholder="ชื่อ"
                value={searchFName}
                onChange={(e) => {
                  setSearchFName(e.target.value);
                }}
              />
              <input
                className="form-control bg-dark border-0 m-2"
                type="search"
                placeholder="นามสกุล"
                value={searchLName}
                onChange={(e) => {
                  setSearchLName(e.target.value);
                }}
              />

              <input
                className="form-control bg-dark border-0 m-2"
                type="search"
                placeholder="ชื่อผู้ใช้"
                value={searchUserName}
                onChange={(e) => {
                  setSearchUserName(e.target.value);
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
      {TeamPage(fname, lname, username)}
    </Container>
  );
}

function TeamPage(fname, lname, username) {
  const [params, setParams] = useState({
    page: "1",
    pageSize: "10",
  });

  const [{ data: teamData, loading, error }, getTeam] = useAxios({
    url: `/api/team?page=1&pageSize=10&fname=${fname}&lname=${lname}&username=${username}`,
    method: "GET",
  });
  const [{ data: teamTypeData }, getTeamType] = useAxios({
    url: "../api/teamType?",
  });

  useEffect(() => {
    getTeam().catch((error) => {
      console.log(error);
    });
  }, [fname, lname, username]);

  useEffect(() => {
    if (teamData) {
      setParams({
        ...params,
        page: teamData.page,
        pageSize: teamData.pageSize,
      });
    }
  }, [teamData]);

  const handleSelectPage = (pageValue) => {
    getTeam({ url: `/api/team?page=${pageValue}&pageSize=${params.pageSize}` });
  };
  const handleSelectPageSize = (sizeValue) => {
    getTeam({ url: `/api/team?page=1&pageSize=${sizeValue}` });
  };

  if (loading) {
    return <PageLoading />;
  }
  if (error) {
    return <PageError />;
  }
  return (
    <div className="pt-4">
      <Card className="text-center rounded shadow p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <Card.Title className="mb-0">รายการบัญชีผู้ดูแลระบบ</Card.Title>
          <TeamAddModal getData={getTeam} getTeamType={teamTypeData?.data} />
        </div>
        <MyTable
          data={teamData?.data}
          getTeam={getTeam}
          getTeamType={teamTypeData?.data}
        />

        <MyPagination
          page={teamData.page}
          totalPages={teamData.totalPage}
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
          <th>รหัสผ่าน</th>
          <th>ระดับสิทธิ์ผู้ใช้</th>
          <th>จัดการ</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.length
          ? currentItems?.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.fname}</td>
                <td>{item.lname}</td>
                <td>{item.tel}</td>
                <td>{item.email}</td>
                <td>{item.username}</td>
                <td>{item.password}</td>
                <td>{item.teamType?.name}</td>
                <td>
                  <TeamEditModal
                    value={item}
                    getTeam={props?.getTeam}
                    getTeamType={props?.getTeamType}
                  />
                  <TeamDeleteModal value={item} getTeam={props?.getTeam} />
                </td>
              </tr>
            ))
          : ""}
      </tbody>
    </Table>
  );
}

Search.layout = IndexPage;
