import React from 'react';
import ProductCard from '../components/product-card'

export default class ProductGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentExpanded: "",
            closingExpanded: false
        };
    }
    expandProduct = (id) => {
        if (this.state.currentExpanded !== "" && this.state.currentExpanded !== id) {
            //starts expanding after closing the previous product
            this.closeProduct()
                .then(() => { console.log("expand"); this.setState({ currentExpanded: id, closingExpanded: false }) })
        } else
            this.setState({ currentExpanded: id, closingExpanded: false })
    }
    //creates a promise so that when expanding another card it runs after finished animation
    closeProduct = () => {
        this.setState({ closingExpanded: true });
        return new Promise((resolve) => setTimeout(() => {
            this.setState({ currentExpanded: "" });
            resolve();
        }, 200))
    }
    render() {
        return (
            <div id="products-grid">
                {this.props.productsData.map(({ node }) => {
                    const { id, title, price, dimensions, imgs, stock, batteries } = node.frontmatter;
                    const imageEdge = this.props.productsImgData.find(({ node }) => node.relativePath === imgs[0]);
                    let imgUrl = '';
                    let imgStatic = '';
                    if (imageEdge) {
                        imgUrl = imageEdge.node.childImageSharp.fluid;
                        imgStatic = imageEdge.node.childImageSharp.original.src;
                    } else
                        console.log(`Could not find image at ${imgs[0]}`)
                    return (
                        <React.Fragment key={id}>
                            <div className="product-card_container"
                                id={`product-container-${id}`}
                            >
                                <ProductCard
                                    id={id}
                                    title={title}
                                    price={price}
                                    currency={this.props.currency}
                                    imgStatic={imgStatic}
                                    imgUrl={imgUrl}
                                    width={dimensions.w}
                                    length={dimensions.l}
                                    height={dimensions.h}
                                    expandProduct={this.expandProduct}
                                />
                            </div>
                            {
                                this.state.currentExpanded === id &&
                                <div
                                    className={`product-card_container product-card_container--expand drop-down ${this.state.closingExpanded && "close-up"}`}
                                    id={`product-container-${id}-expanded`}
                                >
                                    <ProductCard
                                        id={id}
                                        title={title}
                                        remarks={node.html}
                                        price={price}
                                        currency={this.props.currency}
                                        imgStatic={imgStatic}
                                        imgUrl={imgUrl}
                                        width={dimensions.w}
                                        length={dimensions.l}
                                        height={dimensions.h}
                                        displayDimensions={true}
                                        stock={stock}
                                        batteries={batteries}
                                        expandProduct={() => { }}
                                        closeProduct={() => this.closeProduct(id)}
                                        scrollToPosition={true}
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