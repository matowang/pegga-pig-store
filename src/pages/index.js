import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import ProductGrid from '../components/product-grid'

import '../sass/index-page.scss';

import landingImg from '../images/family-play-mud.jpg'

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'hkd'
    }
  }
  setCurrency = (currency) => {
    this.setState({ currency });
    window.Snipcart.setCurrency(currency);
  }
  render() {
    return (
      <Layout setCurrency={this.setCurrency} currentCurrency={this.state.currency}>
        <div className="nav-height" />
        <div id="index-page" className="">
          <SEO title="Home" keywords={[`Peppa Pig`, `toy`, `gift`, 'new', 'chinese new year']} />
          <div id="landing">
            <img alt="Peppa Pig Family playing with mud" src={landingImg}></img>
          </div>
          <h2>Products</h2>
          <ProductGrid productsData={this.props.data.allMarkdownRemark.edges} productsImgData={this.props.data.allFile.edges} currency={this.state.currency} />
        </div>
      </Layout>
    )
  }
}

export default IndexPage

export const query = graphql`
query {
  allFile(filter: { relativePath: { regex: "/images/products//" } extension: {regex: "/png|jpg/"}}) {
      edges {
        node {
          publicURL
          relativePath
        } 
      }
  }
  allMarkdownRemark(
    filter: { 
      fileAbsolutePath: {regex: "/data/products/.+md$/"}
    }
    sort : {
      fields: [frontmatter___id]
      order: ASC
    }
  ) {
    edges {
      node {
        fileAbsolutePath
        frontmatter {
          id
          title
          price {
            hkd
            twd
          } 
          dimensions {
            w
            l
            h
            unit
          } 
          imgs
        }
      } 
    }
  }
}
`