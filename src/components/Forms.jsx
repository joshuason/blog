import React, { useContext } from 'react'
import { useFormik, Formik, Form, Field, useField } from 'formik'
import { CommentContext } from './Comments'

// const { url } = require('../../contact-form-api/url.json')
const { GATSBY_COMMENTS_API_URL } = process.env

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

const onSubmitComment = (values, resetForm, setSubmitStatus) => {
  // alert(
  //   JSON.stringify({ ...values}, null, 2)
  // )
  // console.log(GATSBY_COMMENTS_API_URL)
  fetch(GATSBY_COMMENTS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...values }),
  })
    .then(res => res.json())
    .then(data => {
      resetForm({
        name: '',
        text: '',
      })
      setSubmitStatus({ hasSubmit: true, success: true})
    })
    .catch(error => {
      setSubmitStatus({ hasSubmit: true, success: false})
      console.log({ error: `${error}`})
    })
}

const TextInput = ({ label=null, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <Field className={meta.value !== "" && meta.error ? "error" : null} {...field} {...props} />
      {meta.touched && meta.error && null /*<div className="error">{meta.error}</div>*/}
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

const validateName = value => 
  !/^[A-Za-z]+(\s[A-Za-z]+)*$/.test(value) ? 'invalid name' : null

const validateText = value => 
  !/^[A-Za-z0-9._~()'!*:@,;+?-\s]+$/.test(value) ? 'invalid text' : null

const CommentsForm = ({ className = null }) => {
  const { slug, replyTo, setSubmitStatus } = useContext(CommentContext)
  return (
    <div className={`CommentsForm${className ? ` ${className}` : ""}`}>
      <h2>{replyTo.commentId.length === 0 ? "Add comment" : `Reply to ${replyTo.name}`}</h2>
      <Formik
        initialValues={{ 
          name: '',
          text: '',
        }}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            values.slug = slug
            if (replyTo) {
              values.parentCommentId = replyTo.commentId
            }
            onSubmitComment(values, resetForm, setSubmitStatus)
            setSubmitting(false)
          }, 1000)
        }}
      >
        {({ errors, isSubmitting, touched }) => (
          <Form>
            <TextInput
              // label="Name"
              name="name"
              type="text"
              placeholder="Name"
              validate={validateName}
              required
            />
            <TextInput
              // label="Text"
              name="text"
              type="text"
              placeholder="Say something insightful..."
              validate={validateText}
              required
            />
            <button type="submit" disabled={!touched.name || !touched.text || isSubmitting || Object.keys(errors).length}>
              {isSubmitting ? "Submitting..." : "Submit!"}
            </button>
        </Form>
        )}
      </Formik>
    </div>
  )
}

export { SignupForm, ContactForm, CommentsForm }

/*
{"name":"Cindy Vortex","slug":"slugs-eh","text":"Hey_Sheen!","parentCommentId":"8ced7eda-4663-41a5-8385-65cfccffcf1c"}
{"name":"Cindy Vortex","slug":"slugs-eh","text":"Hey Sheen!","parentCommentId":"cb7df4b8-0937-447d-a3a2-84ee1e97044f"}
*/