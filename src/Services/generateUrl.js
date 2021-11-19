const generateUrl = (filtersState) => {
  function putUrlParams(selectedFilters, queryProp) {
    const paramUrl =
      selectedFilters.length !== 0
        ? `&${queryProp}=` + selectedFilters.join(`&${queryProp}=`)
        : "";
    return paramUrl;
  }

  const categoryUrl =
    filtersState.category.value.length === 0
      ? ""
      : putUrlParams(filtersState.category.value, "category");
  const sellerUrl =
    filtersState.seller.value.length === 0
      ? ""
      : putUrlParams(filtersState.seller.value, "seller");
  const pageUrl =
    filtersState.currentPage.value === ""
      ? ""
      : `&_page=${filtersState.currentPage.value}`;

  const sortingUrl =
    filtersState.sorting.value.length === 0
      ? ""
      : `&_sort=${filtersState.sorting.value[0]}&_order=${filtersState.sorting.value[1]}`;

  const priceRangeUrl =
    filtersState.priceRange.value.length === 0
      ? ""
      : `&price_gte=${parseInt(
          filtersState.priceRange.value[0]
        )}&price_lte=${parseInt(filtersState.priceRange.value[1])}`;

  const searchQueryUrl =
    filtersState.searchQuery.value === ""
      ? ""
      : `&q=${filtersState.searchQuery.value}`;

  const limitUrl =
    filtersState.limit.value === ""
      ? ""
      : `&_limit=${filtersState.limit.value}`;
  const url =
    limitUrl +
    pageUrl +
    categoryUrl +
    sellerUrl +
    sortingUrl +
    priceRangeUrl +
    searchQueryUrl;
  return url;
};

export default generateUrl;
