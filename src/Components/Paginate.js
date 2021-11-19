import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../features/filtersSlice";

export default function Paginate({ totalPages }) {
  const filtersState = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  function handlePageChange(data) {
    dispatch(setPage(data.selected + 1));
  }

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
        initialPage={filtersState.currentPage.value - 1}
        forcePage={filtersState.currentPage.value - 1}
        onPageChange={handlePageChange}
        activeClassName={"active"}
        disableInitialCallback={true}
      ></ReactPaginate>
    </nav>
  );
}
