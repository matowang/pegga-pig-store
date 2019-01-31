import React from 'react';

class ProductCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }
    render() {
        const { id, title, price, currency, imgUrl, width, length, height } = this.props;
        return (
            <div className="product-card">
                <a href={`#product-container-${id}`} onClick={() => this.props.expandProduct(id)}><img className="product-card_image" src={imgUrl} alt={title} /></a>
                <h3 className="product-card_name"><a href={`#product-container-${id}`} onClick={() => this.props.expandProduct(id)}>{title}</a></h3>
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
                <button className="product-card_close-button" onClick={() => this.props.expandProduct("")}>×</button>
            </div>
        )
    }
}

export default ProductCard;