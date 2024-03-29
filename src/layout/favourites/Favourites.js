import React, { useState, useEffect } from 'react';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBInput,
} from "mdb-react-ui-kit";
import Product from '../product/Product';

const Favourites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const existingFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(existingFavorites);
    }, []);

    const removeFavourite = (id) => {
        const updatedFavorites = favorites.filter(product => product.id !== id);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }

    return (
        <>
        <MDBContainer fluid className="my-5 text-center">
            <h4 className="mt-4 mb-5 shadow-5 rounded-5 mx-auto py-3 px-3  ">
                <strong style={{fontSize:"3.5rem"}}>Favourites</strong>
            </h4>
            <MDBRow>
                {favorites.map((product) => (
                    <MDBCol key={product.id} md="6" lg="4" className="mb-4">
                        <Product product={product} isFavourite={true} onRemove={removeFavourite} />
                    </MDBCol>
                ))}
            </MDBRow>
        </MDBContainer>
    </>
    )
}

export default Favourites