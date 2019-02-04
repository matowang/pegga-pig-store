import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/seo'
import ProductGrid from '../components/product-grid'

import '../sass/index-page.scss';

import landingImg from '../images/family-play-mud.jpg'

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'twd'
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
          <SEO title="Home" keywords={[`Peppa Pig`, `toy`, `gift`, 'new', 'chinese new year', 'sale']} />
          <iframe id="promotion-video" title="Peppa Pig Stop Motion | What's inside Peppa's Secret Surprise Box?" src="https://www.youtube.com/embed/VR5AViNTvno?rel=0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <div id="landing">
            <Img fluid={this.props.data.landingImage.childImageSharp.fluid} alt="Peppa Pig Family playing with mud" src={landingImg}></Img>
          </div>
          <section id="product-section">
            <h2>Products</h2>
            <ProductGrid productsData={this.props.data.allMarkdownRemark.edges} productsImgData={this.props.data.allFile.edges} currency={this.state.currency} />
          </section>
        </div>
      </Layout>
    )
  }
}

export default IndexPage

export const query = graphql`
query {
  allFile(filter: { sourceInstanceName:{eq:"product-imgs"} extension: {regex: "/png|jpg/"}}) {
      edges {
        node {
          publicURL
          relativePath
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
            } 
          }
        } 
      }
  }
  landingImage: file(relativePath: {eq :"family-play-mud.jpg"}) {
    relativePath
    childImageSharp {
      fluid(quality: 100) {
        ...GatsbyImageSharpFluid
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
        html
        frontmatter {
          id
          title
          price {
            twd
          } 
          dimensions {
            w
            l
            h
            unit
          } 
          imgs
          stock
          batteries
        }
      } 
    }
  }
}
`