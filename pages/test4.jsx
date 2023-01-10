import React, { useState, useEffect } from 'react';
import { PrismaClient } from '@prisma/client';
import Pagination from 'react-bootstrap/Pagination';
import useAxios from 'axios-hooks'


export default function MyComponent() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [positions, setPositions] = useState([]);

    const [{ data: positionData, loading, error }, getPosition] = useAxios({}, { manual: true })

    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    };

    useEffect(() => {

        // const fetchData = async () => {
        // const positions = await prisma.position.findMany({
        //     skip: (page - 1) * pageSize,
        //     take: pageSize,
        // });
        // setPositions(positionData);
        // };
        // fetchData();
    }, []);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {positionData?.map((position, index) => (
                        <tr key={position.id}>
                            <td>{index + 1}</td>
                            <td>{position.team}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                total={5} // total number of positions in the database
                activePage={page}
                onSelect={handlePageChange}
            />
        </div>
    );
}