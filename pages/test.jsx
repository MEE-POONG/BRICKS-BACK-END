import React, { useEffect, useState } from 'react'
import IndexPage from "components/layouts/IndexPage"
import MyPagination from "@/components/Pagination"

export default function TestPage() {
    const [currentPage, setCurrentPage] = React.useState(10);
    const [totalPages, setTotalPages] = React.useState(27);
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    return (
        <MyPagination page={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    );
}
TestPage.layout = IndexPage