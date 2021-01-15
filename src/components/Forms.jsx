import React from 'react'
import { useFormik, Formik, Form, Field, useField } from 'formik'

// const { url } = require('../../contact-form-api/url.json')
const { 
  GATSBY_CONTACT_API_URL, 
  GATSBY_COMMENTS_API_URL 
} = process.env

const onSubmit = (values, { resetForm }) => {
  alert(
    JSON.stringify({ ...values, content: values.content || `HI! 👋` }, null, 2)
  )
  resetForm({
    email: '',
    name: '',
    content: '',
  })

  // fetch(url, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ ...values, content: values.content || `HI! 👋` }),
  // })
  //   .then(res => (res.ok ? res.json() : Error("failed")))
  //   .then(data => {
  //     // alert(`Thanks ${values.name} for saying hi :)`)
  //     resetForm({
  //       email: "",
  //       name: "",
  //       content: "",
  //     })
  //     console.log(data)
  //   })
  //   .catch(error => console.log("Error: ", error))
}

const onSubmitComment = (values, { resetForm }) => {
  alert(
    JSON.stringify({ ...values}, null, 2)
  )
  resetForm({
    name: '',
    text: '',
  })
}

const TextInput = ({ label=null, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <Field {...field} {...props} />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </>
  )
}

const ContactForm = () => (
  <div className="ContactForm">
    <Formik
      initialValues={{ email: '', name: '', content: '' }}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        setTimeout(() => {
          onSubmit(values, { resetForm })
          setSubmitting(false)
        }, 1000)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <TextInput
            label="First Name"
            name="name"
            type="text"
            placeholder="Name"
            required
          />
          <TextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <TextInput
            label="Message"
            name="content"
            as="textarea"
            placeholder="Message"
            required
          />
          <button type="submit" disabled={isSubmitting}>
            Submit!
          </button>
        </Form>
      )}
    </Formik>
  </div>
)

const SignupForm = () => {
  // console.log({ url })
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
    },
    onSubmit: (values, { resetForm }) => onSubmit(values, { resetForm }),
  })

  return (
    <div className="SignupForm">
      <form onSubmit={formik.handleSubmit}>
        <label id="name_label" htmlFor="name">
          First Name:
        </label>
        <input
          type="text"
          aria-labelledby="name_label"
          id="name"
          name="name"
          placeholder="Name"
          onChange={formik.handleChange}
          value={formik.values.name}
          required
        />
        <label id="email_label" htmlFor="email">
          Email Address:
        </label>
        <input
          type="email"
          aria-labelledby="email_label"
          id="email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          required
        />
        <button type="submit">
          Say Hi!{' '}
          <span role="img" aria-label="waving-hand">
            👋
          </span>
        </button>
      </form>
    </div>
  )
}

const CommentsForm = ({ slug }) => (
  <div className="CommentsForm">
    <h3>Add comment</h3>
    <Formik
      initialValues={{ name: '',
      text: '',
      slug: slug, }}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        setTimeout(() => {
          onSubmitComment(values, { resetForm })
          setSubmitting(false)
        }, 1000)
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <TextInput
            // label="Name"
            name="name"
            type="text"
            placeholder="Name"
            required
          />
          <TextInput
            // label="Text"
            name="text"
            type="text"
            placeholder="Say something..."
            required
          />
          <button type="submit" disabled={isSubmitting}>
            Submit!
          </button>
      </Form>
      )}
    </Formik>
  </div>
)


export { SignupForm, ContactForm, CommentsForm }
