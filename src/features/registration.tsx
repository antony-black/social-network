import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Button, Link } from "@nextui-org/react"

import { Input } from "../components/input"
import {
  useLazyCurrentQuery,
  useRegistrationMutation,
} from "../app/services/userApi"
import { hasErrorField } from "../utils/hasErrorField"
import { ErrorMessage } from "../components/error-message"

type Props = {
  setSelected: (value: string) => void
}

type Registration = {
  email: string
  name: string
  password: string
}

export const Registration: React.FC<Props> = ({ setSelected }) => {
  const [register, { isLoading }] = useRegistrationMutation()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [triggerCurrentCuery] = useLazyCurrentQuery()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Registration>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: { email: "", name: "", password: "" },
  })

  const onSubmit = async (data: Registration) => {
    try {
      await register(data).unwrap()
      setSelected("login")
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
        name="name"
        label="Name"
        type="text"
        required="Required field"
      />
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
        If you have accaunt{" "}
        <Link
          className="cursor-pointer"
          size="sm"
          onPress={() => setSelected("login")}
        >
          Login
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Registration
        </Button>
      </div>
    </form>
  )
}
