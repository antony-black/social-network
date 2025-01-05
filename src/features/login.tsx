import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Button, Link } from "@nextui-org/react"

import { Input } from "../components/input"
import { useLazyCurrentQuery, useLoginMutation } from "../app/services/userApi"
import { ErrorMessage } from "../components/error-message"
import { hasErrorField } from "../utils/hasErrorField"

type Props = {
  setSelected: (value: string) => void
}

type Login = {
  email: string
  password: string
}

export const Login: React.FC<Props> = ({ setSelected }) => {
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [triggerCurrentCuery] = useLazyCurrentQuery()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Login>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = async (data: Login) => {
    try {
      await login(data).unwrap()
      await triggerCurrentCuery().unwrap()
      navigate('/')
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="email"
        label="Email"
        type="email"
        required="Required field"
      />
      <Input
        control={control}
        name="password"
        label="Password"
        type="password"
        required="Required field"
      />
      <ErrorMessage error={error} />
      <p className="text-center text-small">
        If you have no accaunt{" "}
        <Link
          className="cursor-pointer"
          size="sm"
          onPress={() => setSelected("sign-up")}
        >
          Get registration
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Login
        </Button>
      </div>
    </form>
  )
}
