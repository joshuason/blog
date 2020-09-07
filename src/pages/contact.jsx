import React from "react"
import { Helmet } from "react-helmet"

import PageContainer from "../components/PageContainer"
import { ContactForm } from "../components/Forms"

import "../css/contact.scss"

const Contact = () => {
  return (
    <PageContainer activePage="contact" contentClassName={"Contact"}>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <title>j.sh – c.tact</title>
        <script
          src="https://kit.fontawesome.com/dc5c29d233.js"
          crossOrigin="anonymous"
        ></script>
      </Helmet>
      <h2 style={{ textAlign: "center" }}>
        I'm a little flattered you want to contact me{" "}
        <span role="img" aria-label="smiling face with hearts">
          🥰
        </span>
      </h2>
      <p>Nonetheless... here is a form should it take your fancy.</p>
      <ContactForm />
    </PageContainer>
  )
}

export default Contact
