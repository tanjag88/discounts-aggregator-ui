import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

export default function PageNotFound() {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="container">
      <section className="py-5">
        <div className="container p-0">
          <h1>Page not found !</h1>
          <Link onClick={goBack}>Go back!</Link>
        </div>
      </section>
    </div>
  );
}
