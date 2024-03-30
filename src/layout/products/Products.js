import React, { useState, useEffect } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBInput,
} from "mdb-react-ui-kit";
import Product from '../product/Product';

const Products = () => {
    const [productsData, setProductsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [limit, setLimit] = useState(20);

    useEffect(() => {
        fetch(`https://dummyjson.com/products?limit=100`)
        .then((response) => response.json())
        .then((data) => {
            setProductsData(data.products);
            setFilteredProducts(data.products);
            setDisplayProducts(data.products.slice(0, limit));
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, []);

    useEffect(() => {
        setDisplayProducts(filteredProducts.slice(0, limit));
    }, [limit, filteredProducts]);

    const handleSearch = () => {
        const filtered = productsData.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredProducts(filtered);
        setLimit(20);
    };

    const handleClear = () => {
        setSearchTerm('');
        setFilteredProducts(productsData);
        setLimit(20);
    };

    const loadMoreProducts = () => {
        setLimit(prevLimit => Math.min(prevLimit + 20, filteredProducts.length));
    };

    return (
        <>
            <MDBContainer fluid className="my-5 text-center">
                <h4 className="mt-4 mb-5">
                    <strong style={{fontSize:"3.5rem"}}>Bestsellers</strong>
                </h4>

                <div className='shadow-6 rounded-5 py-3 mb-4'>
                    <MDBRow className="mb-4 d-flex justify-content-center py-2 mt-4">
                        <MDBCol md="auto" className='w-50'> 
                            <MDBInput label="Search Products" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="mb-2 mb-md-0" /> {/* Added marginBottom for better mobile responsiveness */}
                        </MDBCol>
                        <div className='d-flex justify-content-center gap-4 mt-3'>
                            <MDBCol md="auto"> 
                                <MDBBtn rounded color='info' disabled={!searchTerm} onClick={handleSearch}>Search</MDBBtn>
                            </MDBCol>

                            <MDBCol md="auto"> 
                                <MDBBtn rounded color='danger' disabled={!searchTerm} onClick={handleClear}>Clear</MDBBtn>
                            </MDBCol>
                        </div>
                    </MDBRow>
                </div>
                <MDBRow>
                    {displayProducts.map((product) => (
                        <MDBCol key={product.id} sm="6" md="4" lg="3" className="mb-4">
                            <Product product={product} />
                        </MDBCol>
                    ))}
                </MDBRow>

                {displayProducts.length < filteredProducts.length && (
                    <MDBBtn onClick={loadMoreProducts}>Load More</MDBBtn>
                )}
            </MDBContainer>
        </>
    );
};

export default Products;
