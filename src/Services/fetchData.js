import { useQuery } from "react-query";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

async function fetchProducts(key) {
  const path = key.queryKey[0];
  const state = key.queryKey[1];
  const url = state.url(state);

  return fetch(baseUrl + path + "?" + url).then(async (response) => {
    const data = await response.json();
    if (response.ok) {
      return {
        data,
        noOfProducts: parseInt(response.headers.get("x-total-count")),
        totalPages: response.headers.get("Link")
          ? parseInt(
              response.headers
                .get("Link")
                .split(",")
                .filter(function (item) {
                  return item.includes("last");
                })[0]
                .match(/page=([0-9]+)/)[1]
            )
          : 1,
        loaded: true,
      };
    } else {
      return {
        data,
        code: response.status,
        error: { message: response.statusText },
      };
    }
  });
}

const useFetchProducts = (filtersState) => {
  const result = useQuery(["products", filtersState], fetchProducts);
  return result;
};

async function fetchProduct({ queryKey }) {
  const res = await fetch(baseUrl + queryKey[1]);
  return res.json();
}

const useFetchProduct = (id) => {
  const { data } = useQuery(["product", `products/${id}`], fetchProduct);
  return { data };
};

export { fetchProducts, fetchProduct, useFetchProduct, useFetchProducts };
