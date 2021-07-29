import { createContext, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

const AllFiltersContext = createContext();

function AllFiltersProvider({ children }) {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const params = useQuery();
  function getParamsALL(parameter) {
    return params.getAll(parameter) ? params.getAll(parameter) : "";
  }

  function getParams(parameter) {
    return params.get(parameter) ? params.get(parameter) : "";
  }

  const selectedCategories = getParamsALL("category");
  const selectedSellers = getParamsALL("seller");

  const priceFrom = params.get("price_gte");
  const priceTo = params.get("price_lte");
  const selectedPriceFrom = priceFrom ? parseInt(priceFrom) : 0;
  const selectedPriceTo = priceTo ? parseInt(priceTo) : 10000;

  const sort = getParams("_sort");
  const order = getParams("_order");
  const selectedSorting = (sort === "") & (order === "") ? [] : [sort, order];

  const pageParam = params.get("_page");
  const page = pageParam === null ? 1 : pageParam;
  const searchedQuery = getParams("q");

  const getUrl = (filtersState) => {
    const categoryUrl =
      filtersState.category.value.length === 0
        ? ""
        : putUrlParams(filtersState.category.value, "category");
    const sellerUrl =
      filtersState.seller.value.length === 0
        ? ""
        : putUrlParams(filtersState.seller.value, "seller");
    const pageUrl =
      filtersState.currentPage.value === 1
        ? "&_page=1"
        : `&_page=${filtersState.currentPage.value}`;

    const sortingUrl =
      filtersState.sorting.value.length === 0
        ? ""
        : `&_sort=${filtersState.sorting.value[0]}&_order=${filtersState.sorting.value[1]}`;

    const priceRangeUrl = `&price_gte=${parseInt(
      filtersState.priceRange.value[0]
    )}&price_lte=${parseInt(filtersState.priceRange.value[1])}`;

    const searchQueryUrl =
      filtersState.searchQuery.value === ""
        ? ""
        : `&q=${filtersState.searchQuery.value}`;

    return (
      `&_limit=${filtersState.limit.value}` +
      pageUrl +
      categoryUrl +
      sellerUrl +
      sortingUrl +
      priceRangeUrl +
      searchQueryUrl
    );
  };

  const defaultFiltersState = {
    category: {
      value: selectedCategories,
      categories: ["furniture", "electronics"],
    },
    seller: {
      value: selectedSellers,
      sellers: ["Structube", "BestBuy"],
    },
    priceRange: {
      value: [selectedPriceFrom, selectedPriceTo],
    },
    sorting: { value: selectedSorting },
    limit: { value: 6 },
    currentPage: { value: page },
    searchQuery: { value: searchedQuery },
    url: getUrl,
  };

  function putUrlParams(selectedFilters, queryProp) {
    const paramUrl =
      selectedFilters.length !== 0
        ? `&${queryProp}=` + selectedFilters.join(`&${queryProp}=`)
        : "";
    return paramUrl;
  }

  const [filtersState, setFiltersState] = useState(defaultFiltersState);
  const history = useHistory();

  useEffect(() => {
    history.push({
      search: filtersState.url(filtersState),
    });
  }, [filtersState, history]);

  return (
    <AllFiltersContext.Provider
      value={{
        filtersState,
        setFiltersState,
      }}
    >
      {children}
    </AllFiltersContext.Provider>
  );
}

export { AllFiltersProvider, AllFiltersContext };
