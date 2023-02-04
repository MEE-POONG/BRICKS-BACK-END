import React from "react";
import IndexPage from "components/layouts/IndexPage"
import { Card, Container, Table } from "react-bootstrap";
import TeamEditModal from "@/container/Team/TeamEditModal";
import TeamDeleteModal from "@/container/Team/TeamDeleteModal";
import TeamAddModal from "@/container/Team/TeamAddModal";
import MyPagination from "@/components/Pagination";


export default function TeamPage( ){

    return (
        <Container fluid className="pt-4 px-4">
        <Card className="text-center rounded shadow p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <Card.Title className="mb-0">
                    พนักงาน
                </Card.Title>
                {/* <TeamAddModal getData={getSubType} getTypeData={typeData?.data}/> */}
            </div>
            {/* <MyTable data={subTypeData?.data} setNum={(subTypeData?.page * subTypeData?.pageSize) - subTypeData?.pageSize} getData={getSubType} getTypeData={typeData?.data} /> */}
            {/* <MyPagination page={subTypeData.page} totalPages={subTypeData.totalPage} onChangePage={handleSelectPage} pageSize={params.pageSize} onChangePageSize={handleSelectPageSize} /> */}
        </Card >
    </Container >
    )

}

function MyTable(props) {
    // const [currentItems, setCurrentItems] = useState(props?.data);
    // const [numberSet, setNumberSet] = useState(props?.setNum);
    useEffect(() => {
        setCurrentItems(currentItems);
        console.log(props);
    }, [props]);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>ชื่อ</th>
                    <th>ประเภทย่อยสินค้า</th>
                    <th>ประเภทย่อยสินค้า</th>
                    <th>จัดการ</th>
                </tr>
            </thead>
            <tbody>
                
                        <tr>
                            <td>pong</td>
                            <td> 098888998</td>
                            <td> password</td>
                            <td>
                                <TeamEditModal />
                                <TeamDeleteModal />
                            </td>
                        </tr>
                
            </tbody>
        </Table>
    );
}
TeamPage.layout = IndexPage