import React from 'react'
import ReactPaginate from "react-paginate";
import styles from './Pagination.module.scss'

export const Pagination = ({currentPage,onChangePage}) => {

  return (
    <ReactPaginate
      className={styles.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(i) => onChangePage(i.selected + 1)}
    pageRangeDisplayed={8}
    pageCount={3}
    forcePage={currentPage - 1}
    renderOnZeroPageCount={null}
  />
  )
}
