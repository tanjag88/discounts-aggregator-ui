import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../Services/useFetch";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";

export default function Detail() {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`products/${id}`);
  const [showPriceHistory, setShowPriceHistory] = useState(false);

  if (error) throw error;
  if (loading) return <h1>loading..</h1>;
  if (!product) return <h1>page not found</h1>;

  const onClickShowPriceHistory = () => setShowPriceHistory(!showPriceHistory);

  return (
    <Card style={{ width: "50rem"}}>
      <Card.Img variant="top" src={product.img} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Price - {product.price}</ListGroupItem>
      </ListGroup>
      <Button onClick={onClickShowPriceHistory}>
        {showPriceHistory ? "Close" : "Show price history"}{" "}
      </Button>
      {showPriceHistory ? (
        <ul>
          {product.priceHistory.map((priceHistory) => (
            <li key={priceHistory.value}>
              {`price: ${priceHistory.amount} | date: ${priceHistory.date}`}
            </li>
          ))}
        </ul>
      ) : null}
      <Card.Body>
        <Card.Link href={product.url}>Buy</Card.Link>
        <Card.Link href="#">Beck to all products</Card.Link>
      </Card.Body>
    </Card>
    
  );
}
