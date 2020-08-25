import React from "react"
import { useFormik } from "formik"

const { url } = require("../../contact-form-api/url.json")

const SignupForm = () => {
  // console.log({ url })
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
    },
    onSubmit: (values, { resetForm }) => {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, content: `HI! 👋` }),
      })
        .then(res => (res.ok ? res.json() : Error("failed")))
        .then(data => {
          alert(`Thanks ${values.name} for saying hi :)`)
          resetForm({
            email: "",
            name: "",
          })
          console.log(data)
        })
        .catch(error => console.log("Error: ", error))
    },
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
        />
        <button type="submit">
          Say Hi!{" "}
          <span role="img" aria-label="waving-hand">
            👋
          </span>
        </button>
      </form>
    </div>
  )
}

export default SignupForm
