import React from 'react';
const ProductCard = ({ title, price, imgSrc }) => {
    return (
        <div className="product-card">
            {/* <img src={imgSrc} /> */}
            <h2>{title}</h2>
            <div className="product-card-price">{price}</div>
        </div>
    )
}
export default ProductCard;