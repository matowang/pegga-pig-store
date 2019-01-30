import React from 'react';

const ProductCard = ({ id, title, price, currency, imgUrl, width, length, height }) => {
    return (
        <div className="product-card">
            <img className="product-card_image" src={imgUrl} alt={title} />
            <h2 className="product-card_name">{title}</h2>
            <div className="product-card_price">{`${currency}${price}`}</div>
            <button
                className="snipcart-add-item buy-button"
                onClick={() => console.log(`added item ${title}`)}
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