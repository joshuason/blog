import React from "react"
import Helmet from "react-helmet"
import Img from "gatsby-image"
import { graphql } from "gatsby"

export default function About({ data }) {
  console.log(data)
  return (
    <div>
      <h1>Hello, I'm Josh!</h1>
      <h2>Aspiring web developer</h2>
      <Img fluid={data.allFile.edges[0].node.childImageSharp.fluid} />
      <h3>this.me</h3>
      <p>
        I'm just a regular guy who likes to tinker with things that tickle my
        curiously creative curiosities. <br />
        When I'm not coding I doodle. On occasions, I have been known to
        obsessively overindulge in a cheesburger or two. <br /> <br />
        🍔 <br />
        ╰(＾Ｏ＾)╯
        {/*[Time], [first person pronoun] [] */}
      </p>
      <h3>this.blog</h3>
      <p>
        This blog documents the progress of my Gatsby learning process––learning
        new things like Markdown, Gatsby's API, plugins, and deployment. Just
        like the self-taught learning process at times, this blog is unrefined
        and unprocessed. I draw sustanance from various other blogs, essays and
        online documentation. I hope you enjoy reading my struggles unfiltered
        and that you gain something of value.
      </p>
      <br />
      <h3>GODSPEED</h3>
      <i>(I thought I should end with something catchy)</i>
    </div>
  )
}

export const query = graphql`
  query {
    allFile(
      filter: { relativePath: { eq: "tumblr_pcq1bsaABB1v46tua_640.jpg" } }
    ) {
      edges {
        node {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
