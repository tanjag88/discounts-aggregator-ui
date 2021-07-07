import ReactPaginate from "react-paginate";

export default function Paginate({
  totalPages,
  pageChangeCallback,
  currentPage,
}) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      previousLabel={"previous"}
      nextLabel={"next"}
      initialPage={currentPage}
      forcePage={currentPage}
      onPageChange={pageChangeCallback}
      containerClassName={"pagination"}
      activeClassName={"active"}
      disableInitialCallback={true}
    ></ReactPaginate>
  );
}
