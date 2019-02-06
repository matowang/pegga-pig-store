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
  componentDidMount() {
    window.Snipcart.setCurrency(this.state.currency);
  }
  render() {
    return (
      <Layout setCurrency={this.setCurrency} currentCurrency={this.state.currency}>
        <div className="nav-height" />
        <div id="index-page" className="">
          <SEO title="Home" keywords={[`Peppa Pig`, `toy`, `gift`, 'new', 'chinese new year', 'sale']} image={this.props.data.landingImage.childImageSharp.original.src} />
          <iframe id="promotion-video" title="Peppa Pig Stop Motion | What's inside Peppa's Secret Surprise Box?" src="https://www.youtube.com/embed/VR5AViNTvno?rel=0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <div id="landing">
            <div id="landing_title">
              <span id="landing_title_ch">新年快樂。</span><br></br>
              <span id="landing_title_en">Happy Chinese New Year!</span>
            </div>
            <div id="landing_img">
              <Img fluid={this.props.data.landingImage.childImageSharp.fluid} alt="Peppa Pig Family playing with mud" src={landingImg}
                imgStyle={{ "objectFit": "contain" }}></Img>
            </div>
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
            original {
              src
            }
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
            } 
          }
        } 
      }
  }
  landingImage: file(relativePath: {eq :"peppa-chinese-outfit.png"}) {
    childImageSharp {
      original {
        src
      }
      fluid(quality: 100, maxWidth: 1600) {
        ...GatsbyImageSharpFluid_tracedSVG
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