import React, { useEffect } from "react";

/* react bootstrap */
import { Carousel, Image } from "react-bootstrap";

/* react redux */
import { useDispatch, useSelector } from "react-redux";

/* react router */
import { Link } from "react-router-dom";

/* components */
import Loader from "./Loader";
import Message from "./Message";

/* action types */
import { listTopProducts } from "../actions/productActions";

function ProductCarousel() {
  const dispatch = useDispatch();

 /* pull a partial state from the state in redux store */ 
  const productTopRated = useSelector((state) => state.productTopRated);
  const { error, loading, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={`https://deployanimeecom-lt0t.onrender.com${product.image}`} alt={product.name} fluid />

            <Carousel.Caption className="carousel.caption">
              <h4>
                {product.name} (${product.price})
              </h4>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;
