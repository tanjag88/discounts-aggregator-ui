import React, { useState } from "react";

import { useParams } from "react-router-dom";
import useFetch from "../Services/useFetch";
import HistoryPriceChart from "../Components/HistoryPriceChart";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import updateData from "../Services/usePut";

export default function Detail() {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`products/${id}`);

  const [liked, setLiked] = useState(false);

  function HandleLike(e) {
    if(liked){
      setLiked(false);
      updateData(`products/${id}`, { ...product, likes: product.likes-=1 });
    }else{
      setLiked(true);
      updateData(`products/${id}`, { ...product, likes: product.likes+=1 });
    }
    
    
  }

  if (error) throw error;
  if (loading) return <h1>loading..</h1>;
  if (!product) return <h1>page not found</h1>;

  return (
    <section class="py-5">
      <div class="container">
        <div class="row mb-5">
          <div class="col-lg-6">
            <div class="row m-sm-0">
              <div class="col-sm-10 order-1 order-sm-2">
                <div class="owl-carousel product-slider" data-slider-id="1">
                  <a
                    class="d-block"
                    href={product.img}
                    data-lightbox="product"
                    title="Product item 1"
                  >
                    <img class="img-fluid" src={product.img} alt="..."></img>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <ul class="list-inline mb-2">
              <li class="list-inline-item m-0">
                <i class="fas fa-star small text-warning"></i>
              </li>
              <li class="list-inline-item m-0">
                <i class="fas fa-star small text-warning"></i>
              </li>
              <li class="list-inline-item m-0">
                <i class="fas fa-star small text-warning"></i>
              </li>
              <li class="list-inline-item m-0">
                <i class="fas fa-star small text-warning"></i>
              </li>
              <li class="list-inline-item m-0">
                <i class="fas fa-star small text-warning"></i>
              </li>
            </ul>
            <h1>{product.name}</h1>
            <p class="text-muted lead">{`$${product.price}`}</p>
            <p class="text-small mb-4">{product.description}</p>

            <div class="row align-items-stretch mb-4">
              <div class="col-sm-3 pl-sm-0">
                <a
                  class="btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0"
                  href={product.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Buy{" "}
                </a>
              </div>
            </div>
            <button
              class="btn btn-link text-dark p-0 mb-4"
              onClick={HandleLike}
            >
              {liked ? <FaHeart /> : <FaRegHeart />}
              <i> {liked ? "Unlike" : "Like"}</i>
            </button>
            <div class="tab-content mb-5">
              <HistoryPriceChart priceHistory={product.priceHistory} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
