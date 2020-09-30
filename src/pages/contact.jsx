import React from 'react'

import PageContainer from '../components/PageContainer'
import { ContactForm } from '../components/Forms'
import SEO from '../components/SEO'

import '../css/Contact.scss'

const Contact = () => (
  <PageContainer activePage="contact" contentClassName={'Contact'}>
    <SEO title="j.sh – c.tact" />
    <h2>
      I'm a little flattered you want to contact me{' '}
      <span role="img" aria-label="smiling face with hearts">
        🥰
      </span>
    </h2>
    <p>Nonetheless... here is a form should it take your fancy.</p>
    <ContactForm />
  </PageContainer>
)

export default Contact
