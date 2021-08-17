import ReactPaginate from "react-paginate";
import { useContext } from "react";
import { AllFiltersContext } from "../Contexts/AllFiltersContext";

export default function Paginate({ totalPages }) {
  const { filtersState, setFiltersState } = useContext(AllFiltersContext);

  function handlePageChange(data) {
    setFiltersState((prevFiltersState) => ({
      ...prevFiltersState,
      currentPage: {
        ...prevFiltersState.currentPage,
        value: data.selected + 1,
      },
    }));
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
