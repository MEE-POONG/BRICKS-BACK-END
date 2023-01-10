import React, { useEffect } from 'react';
import { Pagination, Form } from 'react-bootstrap';

export default function MyPagination({ page, totalPages, onChangePage, onChangePageSize, pageSize }) {
    const pageNumbers = [];
    for (let i = page - 2; i <= page + 2; i++) {
        if (i > 0 && i <= totalPages) {
            pageNumbers.push(i);
        }
    }


    return (
        <div className='dcc-space-between'>
            <Pagination className='mb-0'>
                <Pagination.First onClick={() => onChangePage(1)} disabled={page === 1} />
                <Pagination.Prev onClick={() => onChangePage(page - 1)} disabled={page === 1} />
                <Pagination.Item className={page === totalPages && totalPages > 5 ? '' : 'd-none'} onClick={() => onChangePage(totalPages - 3)}>{totalPages - 4}</Pagination.Item>
                <Pagination.Item className={totalPages - page < 2 && totalPages > 5 ? '' : 'd-none'} onClick={() => onChangePage(totalPages - 3)}>{totalPages - 3}</Pagination.Item>
                {pageNumbers?.map((p) => (
                    <Pagination.Item key={p} active={p === page} onClick={() => onChangePage(p)}>
                        {p}
                    </Pagination.Item>
                ))}
                <Pagination.Item className={page === 1 && totalPages > 5 ? '' : 'd-none'} onClick={() => onChangePage(4)}>4</Pagination.Item>
                <Pagination.Item className={page > 2 || totalPages < 5 ? 'd-none' : ''} onClick={() => onChangePage(5)}>5</Pagination.Item>
                <Pagination.Next onClick={() => onChangePage(page + 1)} disabled={page === totalPages} />
                <Pagination.Last onClick={() => onChangePage(totalPages)} disabled={page === totalPages} />
            </Pagination>

            <Form.Select className='page-size' aria-label="Default select example" onChange={(e) => { onChangePageSize(e.target.value) }} value={pageSize} >
                <option value="10" >10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="300">300</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
            </Form.Select>
        </div>
    );
}
