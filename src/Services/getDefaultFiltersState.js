export default function getDefaultFiltersState() {
  function putUrlParams(selectedFilters, queryProp) {
    const paramUrl =
      selectedFilters.length !== 0
        ? `&${queryProp}=` + selectedFilters.join(`&${queryProp}=`)
        : "";
    return paramUrl;
  }

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
      value: [],
      categories: ["furniture", "electronics"],
    },
    seller: {
      value: [],
      sellers: ["Structube", "BestBuy"],
    },
    priceRange: {
      value: [0,10000],
    },
    sorting: { value: [] },
    limit: { value: 6 },
    currentPage: { value: 1 },
    searchQuery: { value: "" },
    url: getUrl,
  };
  return defaultFiltersState;
}
