import React from 'react';

import saleData from '../data/sale-data.json';
import Img from 'gatsby-image';

class ProductCard extends React.Component {
    componentDidMount() {
        if (this.props.scrollToPosition) {
            const el = document.getElementById(`product-container-${this.props.id}-expanded`);
            window.scrollTo(0, el.offsetTop - window.innerHeight / 2);
        }
    }
    render() {
        const { id, title, price, currency, imgUrl, width, length, height, stock, displayDimensions, remarks, batteries, imgStatic } = this.props;
        const salePrice = {};
        for (let key in price) {
            if (price.hasOwnProperty(key)) {
                salePrice[key] = price[key] - saleData.sale * price[key]
            }
        }
        let displayedCurrency;
        switch (currency) {
            case 'twd':
                displayedCurrency = 'nt';
                break;
            default:
                displayedCurrency = currency;
        }
        return (
            <div className="product-card">
                <div className="product-card_image" onClick={() => this.props.expandProduct(id)}>
                    <Img ref={this.imageRef} fluid={imgUrl} alt={title}
                        style={{
                            "height": "100%"
                        }}
                        imgStyle={{
                            "objectFit": "contain"
                        }} />
                </div>
                <h3 className="product-card_name" onClick={() => this.props.expandProduct(id)}>
                    {title}</h3>
                {remarks && <div className="product-card_description" dangerouslySetInnerHTML={{ __html: remarks }} />}
                {displayDimensions && <div className="product-dimensions">{`Dimensions: ${width}×${length}×${height}cm`}</div>}
                {stock && <div className="product-card_stock">Stock: {stock}</div>}
                {batteries && <div className="product-card_batteries">Batteries: {batteries}</div>}
                {saleData.sale > 0 && <div className="product-card_price product-card_price--crossed-out">{`${displayedCurrency}${price[currency]}`}</div>}
                <div className="product-card_price product-card_price--current">{`${displayedCurrency}${salePrice[currency]}`}</div>
                <button
                    className="snipcart-add-item buy-button product-card_buy-button"
                    onClick={() => console.log(`added item ${title}`)}
                    data-item-id={id}
                    data-item-name={title}
                    data-item-price={JSON.stringify(salePrice)}
                    data-item-url="https://angry-meitner-03adf1.netlify.com/"
                    data-item-image={`https://angry-meitner-03adf1.netlify.com${imgStatic}`}
                    data-item-width={width}
                    data-item-length={length}
                    data-item-height={height}
                >
                    Buy
                </button>
                <button className="product-card_close-button" onClick={() => this.props.expandProduct("")}>×</button>
                {saleData.sale > 0 && <span className="sale-amount">{saleData.sale * 100}% OFF</span>}
            </div>
        )
    }
}

export default ProductCard;