import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Form from "./Form";
import Button from "./Button";
import { useMutation, useQueryClient } from "react-query";
import axios from "../axios";

const NewThoughtSchema = z.object({
  title: z.string().min(1, "Title Required"),
  message: z.string().min(1, "Thought Required"),
});

export type IThought = z.infer<typeof NewThoughtSchema>;

export default function NewThoughtModal({
  onSubmit,
}: {
  onSubmit: () => void;
}) {
  const client = useQueryClient();
  const { mutateAsync, error } = useMutation({
    mutationFn: (thought: IThought) => {
      const token = JSON.parse(localStorage.getItem("token") || "");
      return axios.post("/api/messages/", thought, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IThought>({
    resolver: zodResolver(NewThoughtSchema),
  });

  async function submit(data: IThought) {
    const { status } = await mutateAsync(data);

    if (status === 201) {
      client.invalidateQueries("thoughts", {
        refetchActive: true,
        refetchInactive: false,
      });
      onSubmit();
    }
  }

  // @ts-expect-error
  const formError = error ? error.response.data.message : "";

  return (
    <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Post</h3>
      <hr class="my-3" />
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Error>{formError}</Form.Error>
        <Form.Field
          label="Title"
          inputProps={register("title")}
          error={errors.title?.message || ""}
        />
        <Form.Field
          label="Thought"
          inputProps={register("message")}
          error={errors.message?.message || ""}
          inputType="textarea"
        />
        <Form.Actions>
          <div className="flex flex-col gap-2">
            <Button type="submit">Post</Button>
          </div>
        </Form.Actions>
      </Form>
    </div>
  );
}
