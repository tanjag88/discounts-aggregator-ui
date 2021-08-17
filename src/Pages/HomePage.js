import React from "react";
import PopularProduct from "../Components/PopularProduct";
import { Link } from "react-router-dom";
import { AllFiltersContext } from "../Contexts/AllFiltersContext";
import { useContext } from "react";
import getDefaultFiltersState from "../Services/getDefaultFiltersState";
import { useQuery } from "react-query";
import { fetchProducts } from "../Services/fetchData";

export default function HomePage() {
  const getUrl = () => {
    return "_sort=views.length&_order=desc";
  };

  const state = {
    url: getUrl,
  };

  const result = useQuery(["products", state], fetchProducts);
  const data = result.data;

  const { setFiltersState } = useContext(AllFiltersContext);
  const defaultFiltersState = getDefaultFiltersState();

  if (data && data.error)
    return <h1>An error has occurred:{data.error.message}</h1>;

  if (result.isLoading) return <h1>loading products..</h1>;

  const products = data.data;

  return (
    <div className="container">
      <section
        className="hero pb-3 bg-cover bg-center d-flex align-items-center"
        style={{ background: "url(images/Sale.jpg)" }}
      >
        <div className="container py-5">
          <div className="row px-4 px-lg-5">
            <div className="col-lg-6">
              <p className="text-muted small text-uppercase mb-2">
                Newest products
              </p>
              <h1 className="h2 text-uppercase mb-3">Newest products</h1>
              <Link
                className="btn btn-dark"
                to="/products"
                onClick={() => {
                  setFiltersState(defaultFiltersState);
                }}
              >
                Search products
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-5">
        <header className="text-center">
          <h2 className="h5 text-uppercase mb-4">Browse our categories</h2>
        </header>
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <a className="category-item" href={"/products"}>
              <img className="img-fluid" src="Images/ThisWeek.jpg" alt=""></img>
              <strong className="category-item-title">Something</strong>
            </a>
          </div>
          <div className="col-md-4 mb-4 mb-md-0">
            <Link
              className="category-item mb-4"
              to="/products?category=furniture"
              onClick={() => {
                setFiltersState({
                  ...defaultFiltersState,
                  category: {
                    ...defaultFiltersState.category,
                    value: ["furniture"],
                  },
                });
              }}
            >
              <img className="img-fluid" src="Images/sofa.png" alt=""></img>
              <strong className="category-item-title">Furniture</strong>
            </Link>
            <Link className="category-item" to="shop.html">
              <img className="img-fluid" src="Images/ThisWeek.jpg" alt=""></img>
              <strong className="category-item-title">Something</strong>
            </Link>
          </div>
          <div className="col-md-4">
            <Link
              className="category-item"
              to="/products?category=electronics"
              onClick={() => {
                setFiltersState({
                  ...defaultFiltersState,
                  category: {
                    ...defaultFiltersState.category,
                    value: ["electronics"],
                  },
                });
              }}
            >
              <img className="img-fluid" src="Images/robots.png" alt=""></img>
              <strong className="category-item-title">Electronics</strong>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-5">
        <header>
          <h2 className="h5 text-uppercase mb-4">The most popular products</h2>
        </header>
        <div className="row">
          {products.map((product) => {
            return <PopularProduct product={product} key={product.url} />;
          })}
        </div>
      </section>
    </div>
  );
}
