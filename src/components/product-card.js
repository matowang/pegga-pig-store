import React from 'react';

import saleData from '../data/sale-data.json';

class ProductCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }
    render() {
        const { id, title, price, currency, imgUrl, width, length, height, stock } = this.props;
        const salePrice = price - saleData.sale * price;
        return (
            <div className="product-card">
                <img className="product-card_image" src={imgUrl} alt={title} onClick={() => this.props.expandProduct(id)} />
                <h3 className="product-card_name" onClick={() => this.props.expandProduct(id)}>{title}</h3>
                {stock && <div className="product-card_stock">Stock: {stock}</div>}
                <div className="product-card_price product-card_price--crossed-out">{`${currency}${price}`}</div>
                <div className="product-card_price product-card_price--current">{`${currency}${salePrice}`}</div>
                <button
                    className="snipcart-add-item buy-button product-card_buy-button"
                    onClick={() => console.log(`added item ${title}`)}
                    data-item-id={id}
                    data-item-name={title}
                    data-item-price={JSON.stringify(salePrice)}
                    data-item-url="https://angry-meitner-03adf1.netlify.com/"
                    data-item-image={`https://angry-meitner-03adf1.netlify.com${imgUrl}`}
                    data-item-width={width}
                    data-item-length={length}
                    data-item-height={height}
                >
                    Buy
                </button>
                <button className="product-card_close-button" onClick={() => this.props.expandProduct("")}>×</button>
                <span className="sale-amount">10% OFF</span>
            </div>
        )
    }
}

export default ProductCard;