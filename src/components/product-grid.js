import React from 'react';
import ProductCard from '../components/product-card'

export default class ProductGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentExpanded: ""
        }
    }
    expandProduct = (id) => {
        console.log(typeof id);
        this.setState({ currentExpanded: id });
    }
    render() {
        return (
            <div id="products-grid">
                {this.props.productsData.map(({ node }) => {
                    const { id, title, price, dimensions, imgs } = node.frontmatter;
                    const imageEdge = this.props.productsImgData.find(({ node }) => node.relativePath === imgs[0]);
                    let imgUrl = '';
                    if (imageEdge)
                        imgUrl = imageEdge.node.publicURL;
                    else
                        console.log(`Could not find image at ${imgs[0]}`)
                    return (
                        <React.Fragment key={id}>
                            <div className="product-card_container"
                                id={`product-container-${id}`}
                            >
                                <ProductCard
                                    id={id}
                                    title={title}
                                    price={price[this.props.currency]}
                                    currency={this.props.currency}
                                    imgUrl={imgUrl}
                                    width={dimensions.w}
                                    length={dimensions.l}
                                    height={dimensions.h}
                                    expandProduct={this.expandProduct}
                                />
                            </div>
                            {
                                this.state.currentExpanded === id &&
                                <div className="product-card_container product-card_container--expand"
                                    id={`product-container-${id}`}
                                >
                                    <ProductCard
                                        id={id}
                                        title={title}
                                        price={price[this.props.currency]}
                                        currency={this.props.currency}
                                        imgUrl={imgUrl}
                                        width={dimensions.w}
                                        length={dimensions.l}
                                        height={dimensions.h}
                                        expandProduct={this.expandProduct}
                                    />
                                </div>
                            }
                        </React.Fragment>
                    )
                })}
            </div>
        )
    }
}