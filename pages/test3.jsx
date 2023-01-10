import React from 'react';
import { Table } from 'react-bootstrap';

function MyTable(props) {
    const { data, itemsPerPage } = props;
    const [page, setPage] = React.useState(1);

    const handlePrevClick = () => {
        setPage(page - 1);
    };

    const handleNextClick = () => {
        setPage(page + 1);
    };

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.address}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <button onClick={handlePrevClick} disabled={page === 1}>
                Previous
            </button>
            <button onClick={handleNextClick} disabled={page * itemsPerPage >= data.length}>
                Next
            </button>
        </div>
    );
}

export default function TestThree() {
    const data = [
        { id: 1, name: 'Alice', age: 25, address: 'New York' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        { id: 2, name: 'Bob', age: 32, address: 'Los Angeles' },
        // ...
        { id: 100, name: 'Eve', age: 29, address: 'Chicago' },
    ];

    const itemsPerPage = 10;

    return <MyTable data={data} itemsPerPage={itemsPerPage} />;
}
// TestThree.layout = IndexPage
