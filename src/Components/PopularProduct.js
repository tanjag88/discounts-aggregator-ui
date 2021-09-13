import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export default function PopularProduct({ product }) {
  const { name, img, id } = product;
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <Card
        style={{ width: "15rem", height: "19rem" }}
        id={`product-card-${id}`}
        className={"product-card"}
      >
        <Link to={`/products/${id}`} className="d-block">
          <Card.Img
            onMouseOver={() => setHovered(true)}
            onMouseOut={() => setHovered(false)}
            style={{
              width: "14.9rem",
              height: "12rem",
              filter: hovered ? "brightness(80%)" : "none",
            }}
            variant="top"
            src={img}
          />
        </Link>

        <Card.Body>
          <Card.Title style={{ fontSize: "1rem" }}>
            <small>{name}</small>
          </Card.Title>
          {/* <Link to={`/products/${id}`} className="d-block">
            <Button variant="primary">Go somewhere</Button>
          </Link> */}
        </Card.Body>
      </Card>
    </>
  );
}
