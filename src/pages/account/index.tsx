import { Formik, Form, Field } from 'formik'
import React, { InputHTMLAttributes, useState } from 'react'
import { api } from '~/utils/api'
import * as Yup from 'yup'
import Image from 'next/image'

const UserValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required"),  
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required("Password is required")
})

const Account = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { data: user } = api.user.getFirst.useQuery()

  const ctx = api.useContext()
  const { mutate, isLoading: updatingUser } = api.user.update.useMutation({
    onSuccess: () => {
      void ctx.user.getFirst.invalidate()
    }
  })

  const NameField = (props: InputHTMLAttributes<HTMLInputElement>) => (
    <label className="input-group md:max-w-md">
      <span>Name</span>
      <input
        {...props}
        type="text"
        placeholder="John Doe"
        className="input-bordered input w-full"
      />
    </label>
  )

  const EmailField = (props: InputHTMLAttributes<HTMLInputElement>) => (
    <label className="input-group md:max-w-md">
      <span>Email</span>
      <input
        {...props}
        type="email"
        placeholder="john@doe.cpm"
        className="input-bordered input w-full"
      />
    </label>
  )
 
  const PasswordField = (props: InputHTMLAttributes<HTMLInputElement>) => (
    <label className="input-group md:max-w-md">
      <span>Password</span>
      <input
        {...props}
        type={showPassword ? "text" : "password"}
        placeholder="+_#@$%"
        className="input-bordered input w-full "
      />
      <span>
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {!showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          )}
        </button>
      </span>
    </label>
  )

  const onSubmit = (values: { name: string, email: string, password: string }) => {
    const newUserValues = {
      ...values,
      id: user?.id || 0,
    }
    mutate(newUserValues)
  }

  return (
    <Formik
      initialValues={{ name: user?.name || "", email: user?.email || "", password: user?.password || "" }}
      validationSchema={UserValidationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ errors, touched, isValid, dirty }) =>
      <Form>
        <div className="justify-center flex-wrap flex-col gap-2 form-control p-2">
          <Image className="self-center" src={user?.profile_picture || ""} height={200} width={200} alt="profile picture" />
          <Field name="name" as={NameField} />
          <Field name="email" as={EmailField} />
          <Field name="password" as={PasswordField} />
        </div>
        <div className="flex justify-center mt-2">
          <button type="submit" className="btn" disabled={!isValid || !dirty || updatingUser}>
            Save
          </button>
        </div>
        <div className="flex flex-col justify-center text-center">
          {errors.name && touched.name ?
          <div>{errors.name}</div>
          : null}
          {errors.email && touched.email ?
          <div>{errors.email}</div>
          : null}
          {errors.password && touched.password ?
          <div>{errors.password}</div>
          : null}
        </div>
      </Form>}
    </Formik>
  )
}

export default Account