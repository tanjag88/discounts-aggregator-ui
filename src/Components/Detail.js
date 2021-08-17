import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import HistoryPriceChart from "../Components/HistoryPriceChart";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import updateData from "../Services/updateData";
import { UserContext } from "../Contexts/UserContext";
import { useMutation, useQuery } from "react-query";
import { fetchProduct } from "../Services/fetchData";

export default function Detail() {
  const { id } = useParams();
  const { mutate } = useMutation(updateData);
  const { userData, setUserData } = useContext(UserContext);
  const [liked, setLiked] = useState(
    userData.likedProducts.includes(parseInt(id))
  );

  const { data } = useQuery(["product", `products/${id}`], fetchProduct);
  if (data && data.error)
    return <h1>An error has occurred:{data.error.message}</h1>;
  if (!data) return <h1>loading product..</h1>;
  const product = data;

  const handleLike = () => {
    if (!userData.likedProducts.includes(parseInt(id))) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        likedProducts: [...prevUserData.likedProducts, parseInt(id)],
      }));
      setLiked(true);
      if (
        product.likes.length === 0 ||
        !product.likes.includes(userData.userId)
      ) {
        mutate({ ...product, likes: product.likes.concat(userData.userId) });
      }
    } else {
      const newLikedList = userData.likedProducts.filter(
        (p) => p !== parseInt(id)
      );
      setUserData((prevUserData) => ({
        ...prevUserData,
        likedProducts: newLikedList,
      }));
      setLiked(false);
    }
  };

  if (!product) return <h1>page not found</h1>;

  return (
    <section className="py-5">
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-6">
            <div className="row m-sm-0">
              <div className="col-sm-10 order-1 order-sm-2">
                <div className="owl-carousel product-slider" data-slider-id="1">
                  <a
                    href={product.url}
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
                  </a>
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
            <h1>{product.name}</h1>
            <p className="text-muted lead">{`$${product.price}`}</p>
            <p className="text-small mb-4">{product.description}</p>

            <div className="row align-items-stretch mb-4">
              <div className="col-sm-3 pl-sm-0">
                <a
                  className="btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0"
                  href={product.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Buy{" "}
                </a>
              </div>
            </div>
            <button
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
