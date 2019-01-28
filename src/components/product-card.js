import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

const ProductCard = ({ id, title, price, imgUrl, width, length, height }) => {
    return (
        <div className="product-card">

            <StaticQuery query={graphql`
                query {
                    allFile(filter: { relativePath: { regex: "/products//" } }) {
                        edges {
                          node {
                            publicURL
                            relativePath
                          } 
                        }
                      }
                }
            `}
                render={data =>
                    <img
                        src={data.allFile.edges.filter(
                            ({ node }) => {
                                return node.relativePath === imgUrl
                            })[0].node.publicURL
                        }
                        alt={title}
                    />}
            />
            <h2>{title}</h2>
            <div className="product-card-price">{price}</div>
            <button
                className="snipcart-add-item"
                data-item-id={id}
                data-item-name={title}
                data-item-price={price}
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