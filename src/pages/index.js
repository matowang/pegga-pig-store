import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import ProductCard from '../components/product-card'

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
      <Layout>
        <div id="index-page" className="">
          <SEO title="Home" keywords={[`Peppa Pig`, `toy`, `gift`, 'new', 'chinese new year']} />
          <p>Currency: {this.state.currency}</p>
          <select onChange={e => this.setCurrency(e.target.value)}>
            <option value="hkd">HKD</option>
            <option value="twd">TWD</option>
          </select>
          <div id="landing">
            <img alt="Peppa Pig Family playing with mud" src={landingImg}></img>
          </div>
          <section id="products-grid">
            {this.props.data.allMarkdownRemark.edges.map(({ node }) => {
              const { id, title, price, dimensions, imgs } = node.frontmatter;
              const imageEdge = this.props.data.allFile.edges.find(({ node }) => node.relativePath === imgs[0]);
              let imgUrl = '';
              if (imageEdge)
                imgUrl = imageEdge.node.publicURL;
              else
                console.log(`Could not find image at ${imgs[0]}`)
              return (
                <ProductCard
                  id={id}
                  title={title}
                  price={price[this.state.currency]}
                  currency={this.state.currency}
                  imgUrl={imgUrl}
                  width={dimensions.w}
                  length={dimensions.l}
                  height={dimensions.h}
                  key={id}
                />
              )
            })}
          </section>
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