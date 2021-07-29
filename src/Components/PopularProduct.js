import React from "react";
import { Link } from "react-router-dom";

export default function PopularProduct({ product }) {
  const { name, price, img, id } = product;

  return (
    <div className="col-xl-3 col-lg-4 col-sm-6" key={id}>
      <div className="product text-center">
        <div className="mb-3 position-relative">
          <div className="badge text-white badge-"></div>
          <Link to={`/products/${id}`} className="d-block">
            <img className="img-fluid w-100" src={img} alt="..." />
          </Link>
          <div className="product-overlay">
            <ul className="mb-0 list-inline">
              <li className="list-inline-item m-0 p-0">
                <Link className="btn btn-sm btn-dark" to={`/products/${id}`}>
                  View details
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <h6>
          {" "}
          <a className="reset-anchor" href={`/products/${id}`}>
            {name}
          </a>
        </h6>
        <p className="small text-muted">{`$${price}`}</p>
      </div>
    </div>
  );
}
