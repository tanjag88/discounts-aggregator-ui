import React from "react";
import { Link} from "react-router-dom";
import { Card } from "react-bootstrap";

export default function Product({ product }) {
  const { name, price, img, id, url } = product;

  return (  <Card className="p-3" key={id}>
      <Card.Img
        variant="top"
        src={img}
        Link={`/products/${id}`}
        height="60%"
        weight= "50%"
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          <p>Price - {price}</p>
          <Link to={`/products/${id}`}>Details</Link>
          <br />
          <Link to={url}>Buy</Link>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Last updated 3 mins ago</small>
      </Card.Footer>
    </Card>
  );
}
