import React from "react";
import PopularProduct from "./PopularProduct";
import useFetch from "../Services/useFetch";

export default function HomePage() {
  const {
    data: products,
    loading,
    error,
    
  } = useFetch("products?_sort=popularity&_order=asc");

  if (error) throw error;
  if (loading) return <h1>loading products..</h1>;

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
              <a className="btn btn-dark" href={`/products`}>
                Search products
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-5">
        <header className="text-center">
          <p className="small text-muted small text-uppercase mb-1">
            Carefully created collections
          </p>
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
            <a
              className="category-item mb-4"
              href={"/products?category=furniture"}
            >
              <img className="img-fluid" src="Images/sofa.png" alt=""></img>
              <strong className="category-item-title">Furniture</strong>
            </a>
            <a className="category-item" href="shop.html">
              <img className="img-fluid" src="Images/ThisWeek.jpg" alt=""></img>
              <strong className="category-item-title">Something</strong>
            </a>
          </div>
          <div className="col-md-4">
            <a className="category-item" href={"/products?category=electronics"}>
              <img className="img-fluid" src="Images/robots.png" alt=""></img>
              <strong className="category-item-title">Electronics</strong>
            </a>
          </div>
        </div>
      </section>

      <section className="py-5">
        <header>
          <p class="small text-muted small text-uppercase mb-1">
            Made the hard way
          </p>
          <h2 class="h5 text-uppercase mb-4">Top trending products</h2>
        </header>
        <div class="row">
          {products.map((product) => {
            return <PopularProduct product={product} />;
          })}
        </div>
      </section>
      <section class="py-5">
          <div class="container p-0">
            <div class="row">
              <div class="col-lg-6 mb-3 mb-lg-0">
                <h5 class="text-uppercase">Let's be friends!</h5>
                <p class="text-small text-muted mb-0">Nisi nisi tempor consequat laboris nisi.</p>
              </div>
              <div class="col-lg-6">
                <form action="#">
                  <div class="input-group flex-column flex-sm-row mb-3">
                    <input class="form-control form-control-lg py-3" type="email" placeholder="Enter your email address" aria-describedby="button-addon2"></input>
                    <div class="input-group-append">
                      <button class="btn btn-dark btn-block" id="button-addon2" type="submit">Subscribe</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
  </div>
  );
}
