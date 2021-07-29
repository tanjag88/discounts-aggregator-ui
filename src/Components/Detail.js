import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../Services/useFetch";
import HistoryPriceChart from "../Components/HistoryPriceChart";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import updateData from "../Services/updateData";

export default function Detail() {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`products/${id}`);

  const [liked, setLiked] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleLike = useCallback(async () => {
    if (isSending) return;
    setIsSending(true);

    const newNumberOfLikes = product.likes + (liked ? -1 : 1);
    const success = await updateData(`products/${id}`, {
      ...product,
      likes: newNumberOfLikes,
    });

    if (success) {
      setLiked(!liked);
    } else {
      console.log("ERERRERER");
    }
    setIsSending(false);
  }, [isSending, liked, product, id]);

  if (error) return <h1>Product not found</h1>;
  if (loading) return <h1>loading..</h1>;
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
              <li class="list-inline-item m-0">
                <i class="fas fa-star small text-warning"></i>
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
