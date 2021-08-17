import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import updateData from "../Services/updateData";
import { useMutation } from "react-query";

export default function Product({ product }) {
  const { name, price, img, id } = product;
  const { userData, setUserData } = useContext(UserContext);
  const { mutate } = useMutation(updateData);

  const handleView = () => {
    if (!userData.viewedProducts.includes(id)) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        viewedProducts: [...prevUserData.viewedProducts, id],
      }));
    }
    if (
      product.views.length === 0 ||
      !product.views.includes(userData.userId)
    ) {
      mutate({ ...product, views: product.views.concat(userData.userId) });
    }
  };

  return (
    <div className="col-lg-4 col-sm-6" key={id}>
      <div className="product text-center">
        <div className="mb-3 position-relative">
          <div className="badge text-white badge-"></div>
          <Link to={`/products/${id}`} className="d-block" onClick={handleView}>
            <img className="img-fluid w-100" src={img} alt="..." />
          </Link>
          <div className="product-overlay">
            <ul className="mb-0 list-inline">
              <li className="list-inline-item m-0 p-0">
                <Link
                  className="btn btn-sm btn-dark"
                  to={`/products/${id}`}
                  onClick={handleView}
                >
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
