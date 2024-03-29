import React from "react";
import { Link } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

function Product({ product, isFavourite = false, onRemove}) {

  const imageStyle = {
    height: '250px',
    objectFit: 'cover', 
  };

  return (
    <MDBCard>
      <MDBRipple
        rippleColor="light"
        rippleTag="div"
        className="bg-image rounded hover-zoom"
      >
        <MDBCardImage
          src={product.thumbnail}
          fluid
          className="w-100"
          style={imageStyle}
        />
        <Link to={`/product/${product.id}`}>
          <div className="mask">
            <div class="d-flex justify-content-start align-items-end h-100">
              <h5>
                <span className="badge bg-primary ms-2">New</span>
                <span className="badge bg-danger ms-2">-{Math.round(product.discountPercentage)}%</span>
              </h5>
            </div>
          </div>
          <div className="hover-overlay">
            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
            ></div>
          </div>
        </Link>
      </MDBRipple>
      <MDBCardBody>
          <a href="#!" className="text-reset">
            <h5 className="card-title mb-3">{product.title}</h5>
          </a>
        <div className="d-flex justify-content-evenly align-items-center">
          <div>
            <p className="small text-muted">Rated {product.rating.toFixed(2)}/5</p>
          </div>
          <a href="#!" className="text-reset">
            <p>{product.category}</p>
          </a>
        </div>
        <h6 className="mb-3">
          <s>${product.price}</s>
          <strong className="ms-2 text-danger">${Math.round((product.price * (1 - (product.discountPercentage / 100))) )}</strong>
        </h6>

        {isFavourite && 
        <MDBBtn color="danger" size="sm" className="me-2" onClick={() => onRemove(product.id)} >
          <MDBIcon icon="heart" className="me-1" />
          Remove
        </MDBBtn>
        }
      </MDBCardBody>
    </MDBCard>
  );
}

export default Product;