import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import HistoryPriceChart from "../Components/HistoryPriceChart";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useUpdateData } from "../Services/updateData";

import { useFetchProduct } from "../Services/fetchData";
import { useSelector, useDispatch } from "react-redux";
import {
  addLikedProduct,
  addViewedProduct,
  removeLikedProducts,
} from "../features/userSlice";

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { mutateAsync } = useUpdateData();

  const userData = useSelector((state) => state.user);

  const [liked, setLiked] = useState(userData.likedProducts.includes(id));
  const { data } = useFetchProduct(id);

  if (data && data.error)
    return <h1>An error has occurred:{data.error.message}</h1>;
  if (!data) return <h1 id="loader">loading product..</h1>;
  const product = data;

  if (!userData.viewedProducts.includes(id)) {
    dispatch(addViewedProduct(id));

    if (
      product.views.length === 0 ||
      !product.views.includes(userData.userId)
    ) {
      mutateAsync({ ...product, views: product.views.concat(userData.userId) });
    }
  }

  function handleLike() {
    if (!userData.likedProducts.includes(id)) {
      dispatch(addLikedProduct(id));

      setLiked(true);
      if (
        product.likes.length === 0 ||
        !product.likes.includes(userData.userId)
      ) {
        mutateAsync({
          ...product,
          likes: product.likes.concat(userData.userId),
        });
      }
    } else {
      dispatch(removeLikedProducts(id));
      setLiked(false);
    }
  }
  if (!product) return <h1>page not found</h1>;

  return (
    <section className="py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-6">
            <div className="row m-sm-0">
              <div className="col-sm-10 order-1 order-sm-2">
                <div className="owl-carousel product-slider" data-slider-id="1">
                  <Link
                    to={{ pathname: product.url }}
                    className="d-block"
                    data-lightbox="product"
                    title="Product item 1"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="img-fluid"
                      src={product.img}
                      alt="..."
                    ></img>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <ul className="list-inline mb-2">
              <li className="list-inline-item m-0">
                <i className="fas fa-star small text-warning"></i>
              </li>
              <li className="list-inline-item m-0">
                <i className="fas fa-star small text-warning"></i>
              </li>
              <li className="list-inline-item m-0">
                <i className="fas fa-star small text-warning"></i>
              </li>
              <li className="list-inline-item m-0">
                <i className="fas fa-star small text-warning"></i>
              </li>
              <li className="list-inline-item m-0">
                <i className="fas fa-star small text-warning"></i>
              </li>
            </ul>
            <h1 id="productName">{product.name}</h1>
            <p className="text-muted lead">{`$${product.price}`}</p>
            <p className="text-small mb-4">{product.description}</p>

            <div className="row align-items-stretch mb-4">
              <div className="col-sm-3 pl-sm-0">
                <Link
                  to={{ pathname: product.url }}
                  className="btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0"
                  target="_blank"
                  rel="noreferrer"
                  id="buy"
                >
                  Buy{" "}
                </Link>
              </div>
            </div>
            <button
              id="buttonLike"
              className="btn btn-link text-dark p-0 mb-4"
              onClick={handleLike}
            >
              {liked ? <FaHeart /> : <FaRegHeart />}
              <i> {liked ? "Unlike" : "Like"}</i>
            </button>
            <div className="tab-content mb-5">
              <HistoryPriceChart priceHistory={product.priceHistory} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
