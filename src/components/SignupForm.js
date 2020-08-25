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
    onSubmit: values => {
      // alert(
      //   `Humblest apologies, ${values.name}.\nThis feature is currently very much redundant.\nSorry about wasting your time.`
      // )
      // console.log(JSON.stringify({ ...values }))
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, content: `HI! 👋` }),
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log("Error: ", error))
      // alert(JSON.stringify(values, null, 2))
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
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <button type="submit">
          Say Hi! <span role="img">👋</span>
        </button>
      </form>
    </div>
  )
}

export default SignupForm
