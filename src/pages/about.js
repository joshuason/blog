import React from "react"
import { Helmet } from "react-helmet"
import Img from "gatsby-image"
import { Link, graphql } from "gatsby"

import Footer from "../components/Footer"

import "../css/about.css"

const About = ({ data }) => {
  console.log(data)
  return (
    <div className="about">
      <Helmet>
        <meta charSet="utf-8" />
        <title>About</title>
      </Helmet>
      <div className="nav">
        <Link to="/">( back )</Link>
      </div>
      <div className="about-content">
        <h1>Hello, I'm Josh!</h1>
        <h2>(a/per)spiring web developer</h2>
        <Img fixed={data.file.childImageSharp.fixed} />
        <h3>this.me</h3>
        <p>
          I'm just a regular guy who likes to tinker with things that tickle my
          curiously creative curiosities. <br />
          When I'm not coding I doodle. On occasions, I have been known to
          obsessively overindulge in a cheesburger or two.
        </p>
        <p className="burgers">
          <span role="img" aria-label="hamburger">
            🍔
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span role="img" aria-label="hamburger">
            🍔
          </span>
          <br />
          ╰(＾Ｏ＾)╯
        </p>
        {/*[Time], [first person pronoun] [] */}
        <h3>this.blog</h3>
        <p>
          This blog documents the progress of my Gatsby learning
          process––learning new things like Markdown, Gatsby's API, plugins, and
          deployment. Just like the self-taught learning process, at times, this
          blog is unrefined and unprocessed. I draw sustanance from various
          other blogs, essays and online documentation. I hope you enjoy reading
          my struggles unfiltered and that you gain something of value.
        </p>
        <br />
        <h3>GODSPEED</h3>
        <i>
          (I thought I should end with something catchy and vaguely appropriate)
        </i>
      </div>{" "}
      {/* ->| .about-content */}
      <Footer />
    </div>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "tumblr_pcq1bsaABB1v46tua_640.jpg" }) {
      childImageSharp {
        fixed(height: 200, width: 200, grayscale: true) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default About
