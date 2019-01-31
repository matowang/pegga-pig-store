import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout'

const About = (props) => {
    return (
        <Layout>
            <h1>About</h1>
            <p>{props.data.site.siteMetadata.description}</p>
        </Layout>
    )
}
export const query = graphql`
query {
    site {
      siteMetadata {
        description
      }
    }
  }
`
export default About;