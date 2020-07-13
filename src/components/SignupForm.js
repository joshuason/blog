import React from "react"
import { useFormik } from "formik"

const SignupForm = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
    },
    onSubmit: values => {
      alert(
        `Humblest apologies, ${values.name}.\nThis feature is currently very much redundant.\nSorry about wasting your time.`
      )
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
        <button type="submit">Sign me up for spam!</button>
      </form>
    </div>
  )
}

export default SignupForm
