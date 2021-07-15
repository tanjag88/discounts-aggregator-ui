import React from "react";


export default function Product({ product }) {
  const { name, price, img, id, url } = product;

  return (
    <div className="col-lg-4 col-sm-6" key={id}>
      <div className="product text-center">
        <div className="mb-3 position-relative">
          <div className="badge text-white badge-"></div>
          <a
            className="d-block"
            href={`/products/${id}`}
            
          >
            <img className="img-fluid w-100" src={img} alt="..." />
          </a>
          <div className="product-overlay">
            <ul className="mb-0 list-inline">
              <li className="list-inline-item m-0 p-0">
                <a className="btn btn-sm btn-outline-dark" href={url}>
                  <i className="far fa-heart"></i>
                </a>
              </li>
              <li className="list-inline-item m-0 p-0">
                <a
                  className="btn btn-sm btn-dark"
                  href={`/products/${id}`}
                  
                >
                  View details
                </a>
              </li>
              <li className="list-inline-item mr-0">
                <a
                  className="btn btn-sm btn-outline-dark"
                  href="#productView"
                  data-toggle="modal"
                >
                  <i className="fas fa-expand"></i>
                </a>
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
        <p className="small text-muted">{price}</p>
      </div>
    </div>
  );
}

