import ReactPaginate from "react-paginate";

export default function Paginate({
  totalPages,
  pageChangeCallback,
  currentPage,
}) {
  return (
    <nav aria-label="Page navigation example">
      <ReactPaginate
        containerClassName={
          "pagination justify-content-center justify-content-lg-end"
        }
        pageCount={totalPages}
        pageRangeDisplayed={6}
        marginPagesDisplayed={2}
        previousLabel={"previous"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLabel={"next"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        pageClassName={"page-item"}
        initialPage={currentPage}
        forcePage={currentPage}
        onPageChange={pageChangeCallback}
        activeClassName={"active"}
        disableInitialCallback={true}
      ></ReactPaginate>
    </nav>
  );
}
