import React from 'react'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'

import PageContainer from '../components/PageContainer'
import SEO from '../components/SEO'

import '../css/About.scss'

const About = ({ data }) => (
  <PageContainer activePage="about" contentClassName="about">
    <SEO title="j.sh – ab.ut" />
    <div className="about-content">
      <h1>Hello, I'm Josh!</h1>
      <i className="subtitle">(a/per)spiring web developer</i>
      <Img fixed={data.file.childImageSharp.fixed} />
      <h2>this.me</h2>
      <p>
        I'm just a regular guy who likes to tinker with things that tickle my
        curiously creative curiosities. <br />
        When I'm not coding I doodle. On occasions, I have been known to
        obsessively overindulge in a cheeseburger or two.
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
      <h2>this.blog</h2>
      <p>
        This blog documents the progress of my Gatsby learning
        process&mdash;learning new things like Markdown, GraphQL, Gatsby's API,
        plugins, and deployment. Just like the self-taught learning process, at
        times, this blog is unrefined and unprocessed. I draw sustanance from
        various other blogs, essays and online documentation. I hope you enjoy
        reading my struggles unfiltered and that you gain something of value.
      </p>
      <h2>this.blog.meta</h2>
      <div className="this-blog-meta-content">
        <p>Typefaces:</p>
        <ul>
          <li>Heading: Crimson Text (serif)</li>
          <li>Body: Roboto (sans serif)</li>
          <li>Code: Courier New (monospace)</li>
        </ul>
        <p>Plugins:</p>
        <ul>
          <li>Helmet</li>
          <li>Formik</li>
        </ul>
        <p>Misc:</p>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://github.com/joshuason/blog"
              rel="noreferrer"
            >
              Source code
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://github.com/gatsbyjs/gatsby-starter-default"
              rel="noreferrer"
            >
              Gatsby starter
            </a>
          </li>
        </ul>
      </div>
      <br />
      <h3>GODSPEED</h3>
      <i>
        (I thought I should end with something catchy and vaguely appropriate)
      </i>
    </div>{' '}
    {/* ->| .about-content */}
  </PageContainer>
)

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
