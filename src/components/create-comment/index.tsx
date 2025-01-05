import React from "react"
import { useParams } from "react-router-dom"
import { useCreateCommentMutation } from "../../app/services/commentsApi"
import { useLazyGetPostByIdQuery } from "../../app/services/postApi"
import { Controller, useForm } from "react-hook-form"
import { Textarea, Button } from "@nextui-org/react"
import { ErrorMessage } from "../error-message"
import { IoMdCreate } from "react-icons/io"

export const CreateComment = () => {
  const { id } = useParams<{ id: string }>()
  const [createComment] = useCreateCommentMutation()
  const [getPostById] = useLazyGetPostByIdQuery()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm()

  const onSubmit = handleSubmit(async data => {
    try {
      if (id) {
        await createComment({ content: data.comment, postId: id }).unwrap()
        await getPostById(id).unwrap()
        setValue("comment", "")
      }
    } catch (error) {
      console.log("err", error)
    }
  })

  const error = errors?.comment?.message as string
  return (
    <form className="flex-grow" onSubmit={onSubmit}>
      <Controller
        name="comment"
        control={control}
        defaultValue=""
        rules={{
          required: "Required field",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="Write your comment"
            className="mb-5"
          />
        )}
      />
      {errors && <ErrorMessage error={error} />}
      <Button
        className="flex-end"
        color="primary"
        endContent={<IoMdCreate />}
        type="submit"
      >
        Send
      </Button>
    </form>
  )
}
