import ReactPaginate from "react-paginate";

export default function Paginate({ totalPages, pageChangeCallback }) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={9}
      marginPagesDisplayed={2}
      previousLabel={"previous"}
      nextLabel={"next"}
      initialPage={0}
      onPageChange={pageChangeCallback}
      containerClassName={"pagination"}
      activeClassName={"active"}
      disableInitialCallback={true}
    ></ReactPaginate>
  );
}
