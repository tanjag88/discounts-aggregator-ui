import React from "react";
import PopularProduct from "../Components/PopularProduct";
import { Link } from "react-router-dom";
import {
  useFetchProducts,
  useFetchProductsWithIds,
} from "../Services/fetchData";

import Carousel from "react-grid-carousel";
import { useSelector, useDispatch } from "react-redux";
import { resetFilters, setCategoryResetFilters } from "../features/filtersSlice";

export default function HomePage() {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const result = useFetchProducts("_sort=views.length&_order=desc");

  const data = result.data;

  const resultWithIds = useFetchProductsWithIds(userData.likedProducts);
  const userLikedProducts = resultWithIds ? resultWithIds.data : [];

  const resultViewedProducts = useFetchProductsWithIds(userData.viewedProducts);

  const userViewedProducts = resultViewedProducts
    ? resultViewedProducts.data
    : [];


  if (data && data.error)
    return <h1>An error has occurred:{data.error.message}</h1>;

  if (result.isLoading) return <h1>loading products..</h1>;

  const products = data.data;

  return (
    <div className="container">
      <section
        className="hero pb-3 bg-cover bg-center d-flex align-items-center"
        style={{ background: "url(Images/Sale.jpg)" }}
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
                  dispatch(resetFilters());
                }}
              >
                Go to products
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
                dispatch(setCategoryResetFilters(["furniture"]));
              }}
            >
              <img className="img-fluid" src="Images/sofa.png" alt=""></img>
              <strong className="category-item-title">Furniture</strong>
            </Link>
          </div>
          <div className="col-md-4">
            <Link
              className="category-item"
              to="/products?category=electronics"
              onClick={() => {
                dispatch(setCategoryResetFilters(["electronics"]));
              }}
            >
              <img className="img-fluid" src="Images/robots.png" alt=""></img>
              <strong className="category-item-title">Electronics</strong>
            </Link>
          </div>
        </div>
      </section>

      {products && products.length > 0 ? (
        <section className="py-5" id="popular-products">
          <header>
            <h2 className="h5 text-uppercase mb-4" id="popular-products-header">
              The most popular products
            </h2>
          </header>
          <Carousel cols={4} rows={1} gap={10} loop>
            {products.map((p) => {
              return (
                <Carousel.Item>
                  <PopularProduct product={p} key={p.url} />
                </Carousel.Item>
              );
            })}
          </Carousel>{" "}
        </section>
      ) : (
        ""
      )}

      {userLikedProducts && userLikedProducts.length > 0 ? (
        <section className="py-5" id="user-favorite-products">
          <header>
            <h2
              className="h5 text-uppercase mb-4"
              id="favorite-products-header"
            >
              Your favorite products
            </h2>
          </header>
          <Carousel
            cols={4}
            rows={1}
            gap={10}
            loop
            hideArrow={userLikedProducts.length < 5 ? true : false}
          >
            {userLikedProducts.map((product) => {
              return (
                <Carousel.Item>
                  <PopularProduct product={product} key={product.url} />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </section>
      ) : (
        ""
      )}
      {userViewedProducts && userViewedProducts.length > 0 ? (
        <section className="py-5" id="viewed-products">
          <header>
            <h2 className="h5 text-uppercase mb-4">
              Your recently viewed products
            </h2>
          </header>
          <Carousel
            cols={4}
            rows={1}
            gap={10}
            loop
            hideArrow={userViewedProducts.length < 5 ? true : false}
          >
            {userViewedProducts.map((product) => {
              return (
                <Carousel.Item>
                  <PopularProduct product={product} key={product.url} />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </section>
      ) : (
        ""
      )}
    </div>
  );
}
