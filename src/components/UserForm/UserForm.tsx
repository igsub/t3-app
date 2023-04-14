import { Field, Form, Formik } from 'formik'
import React from 'react'
import { api } from '~/utils/api'
import Image from 'next/image'
import inputFields, { UserUpdateData, UserValidationSchema } from './UserFormFields'

const UserForm = () => {
  const { data: user } = api.user.getFirst.useQuery()

  const ctx = api.useContext()
  const { mutate, isLoading: updatingUser } = api.user.update.useMutation({
    onSuccess: () => {
      void ctx.user.getFirst.invalidate()
    }
  })

  const onSubmit = (values: UserUpdateData) => {
    const newUserValues = {
      ...values,
      id: user?.id || 0,
    }
    mutate(newUserValues)
  }

  const initialValues: UserUpdateData = {
    name: user?.name || "",
    email: user?.email || "",
    password: user?.password || ""
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UserValidationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ errors, touched, isValid, dirty }) =>
      <Form>
        <div className="justify-center flex-wrap flex-col gap-2 form-control p-2">
          <Image className="self-center" src={user?.profile_picture || ""} height={200} width={200} alt="profile picture" />
          { inputFields.map(input => <Field name={input.name} as={input.component} key={`${input.name}-field`} />) }
        </div>
        <div className="flex justify-center mt-2">
          <button type="submit" className="btn" disabled={!isValid || !dirty || updatingUser}>
            Save
          </button>
        </div>
        <div className="flex flex-col justify-center text-center">
          { inputFields.map(field => errors[field.name as keyof typeof errors] && touched[field.name as keyof typeof touched] ? <div>{ errors[field.name as keyof typeof errors] }</div> : null) }
        </div>
      </Form>}
    </Formik>
  )
}

export default UserForm