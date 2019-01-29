import React from 'react';

const ProductCard = ({ id, title, price, imgUrl, width, length, height }) => {
    return (
        <div className="product-card">
            <img src={imgUrl} alt={title} />
            <h2>{title}</h2>
            <div className="product-card-price">{price.hkd}</div>
            <button
                className="snipcart-add-item"
                data-item-id={id}
                data-item-name={title}
                data-item-price={JSON.stringify(price)}
                data-item-url="https://angry-meitner-03adf1.netlify.com/"
                data-item-image={`https://angry-meitner-03adf1.netlify.com${imgUrl}`}
                data-item-width={width}
                data-item-length={length}
                data-item-height={height}
            >
                Buy
            </button>
        </div>
    )
}
export default ProductCard;