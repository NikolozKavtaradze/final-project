import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBCard, MDBCardImage, MDBCarousel, MDBCarouselItem, MDBCol, MDBContainer, MDBInput, MDBRow } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const imageStyle = {
    height: '450px',
    width: '100%',
    objectFit: 'contain', 
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) throw new Error('Product not found.');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError('Error fetching data: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  const addToFavorites = () => {
    const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (existingFavorites.some((favorite) => favorite.id === product.id)) {
      alert('Product already in favorites!');
      return;
    }

    const updatedFavorites = [...existingFavorites, product];

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    alert('Product added to favorites!');
  }

  return (
    <>
      <main className="mt-2 pt-4">
        <MDBContainer className='mt-3'>
          <h1 className='text-center mb-6'>{product.title}</h1>

          <div className="text-center mb-4">
          <span className="badge bg-dark me-1">{product.brand}</span>
          <span className="badge bg-secondary me-1">{product.category}</span>
          <span className="badge bg-success me-1">In Stock: {product.stock}</span>
      </div>
      <div className="text-center mb-6">
        <span style={{fontSize: '24px', color: '#ffc107'}}>
          {'★'.repeat(Math.floor(product.rating))}
          {'☆'.repeat(5 - Math.floor(product.rating))} 
        </span>
        <span className="ms-2" style={{fontSize: '20px', verticalAlign: 'middle'}}>({product.rating.toFixed(2)})</span>
      </div>
          <MDBRow>
            <MDBCol md="6" className='mb-4'>
              <MDBCard className='shadow-lg'>
                <MDBCarousel showControls showIndicators dark fade>
                  {product.images.map((image, index) => (
                    <MDBCarouselItem itemId={index + 1} key={index}>
                      <MDBCardImage src={image} className='d-block w-100' alt={`Slide ${index}`} style = {imageStyle} />
                    </MDBCarouselItem>
                  ))}
                </MDBCarousel>
              </MDBCard>
            </MDBCol>
            <MDBCol md="6" className='mb-4'>
              <div className='p-4'>
                <div className='mb-3'>
                  <span className="badge bg-info me-1">New</span>
                  <span className="badge bg-primary me-1">Bestseller</span>
                  <span className="badge bg-danger me-1">-{Math.round(product.discountPercentage)}%</span>
                </div>

                <p className="lead">
                  <span className="me-1">
                    <del>${product.price}</del>
                  </span>
                  <span>${Math.round((product.price * (1 - (product.discountPercentage / 100))) )}</span>
                </p>

                <strong><p style={{fontSize: '20px'}}>Description</p></strong>
                
                <p>{product.description}</p>

                <div className='d-flex justify-content-left'>
                  <MDBBtn onClick={addToFavorites}>
                    Add to favorites
                    <i className="fas fa-heart ms-1"></i>
                  </MDBBtn>
                </div>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </main>
    </>

  );
}

export default ProductDetails;