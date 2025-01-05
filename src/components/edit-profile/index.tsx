import React, { useContext, useState } from "react"
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  user,
} from "@nextui-org/react"
import { User } from "../../app/types"
import { ThemeContext } from "../theme-provider"
import { useUpdateUserMutation } from "../../app/services/userApi"
import { useParams } from "react-router-dom"
import { hasErrorField } from "../../utils/hasErrorField"
import { Controller, useForm } from "react-hook-form"
import { Input } from "../input"
import { MdOutlineEmail } from "react-icons/md"
import { ErrorMessage } from "../error-message"

type Props = {
  isOpen: boolean
  onClose: () => void
  user?: User
}

export const EditProfile: React.FC<Props> = ({
  isOpen = false,
  onClose = () => null,
  user,
}) => {
  const { theme } = useContext(ThemeContext)
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const [error, setError] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { id } = useParams<{ id: string }>()

  const { handleSubmit, control } = useForm<User>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: user?.email,
      name: user?.name,
      dateOfBirth: user?.dateOfBirth,
      bio: user?.bio,
      location: user?.location,
    },
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      setSelectedFile(event.target.files[0])
    }
  }

  const onSubmit = async (data: User) => {
    if (id) {
      try {
        const formData = new FormData()
        data.name && formData.append("name", data.name)
        data.email && data.email !== user?.email && formData.append("email", data.email)
        data.dateOfBirth &&
          formData.append(
            "dateOfBirth",
            new Date(data.dateOfBirth).toISOString(),
          )
        data.bio && formData.append("bio", data.bio)
        data.location && formData.append("location", data.location)
        selectedFile && formData.append("avatar", selectedFile)

        await updateUser({ userData: formData, id }).unwrap()
        onClose()
      } catch (err) {
        console.log(err)
        if (hasErrorField(err)) {
          setError(err.data.error)
        }
      }
    }
  }

  return (
    <Modal
      className={`${theme} text-foreground`}
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit profile
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  control={control}
                  name="email"
                  label="Email"
                  type="email"
                  endContent={<MdOutlineEmail />}
                />
                <Input control={control} name="name" label="Имя" type="text" />
                <input
                  name="avatarUrl"
                  placeholder="Coose the file"
                  type="file"
                  onChange={handleFileChange}
                />
                <Input
                  control={control}
                  name="dateOfBirth"
                  label="Birthday"
                  type="date"
                  placeholder="my"
                />
                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Your biography"
                    />
                  )}
                />
                <Input
                  control={control}
                  name="location"
                  label="Location"
                  type="text"
                />
                <ErrorMessage error={error} />
                <div className="flex gap-2 justify-end">
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Update profile
                  </Button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
