import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Form from "./Form";
import Button from "./Button";
import { useMutation } from "react-query";
import axios from "../axios";

const RegisterSchema = z.object({
  first_name: z.string().min(1, "First Name Required"),
  last_name: z.string().min(1, "Last Name Required"),
  email: z.string().email().min(1, "Email Required"),
  password: z
    .string()
    .min(8, "Password Should be at least 8 Characters")
    .max(20, "Password can't exceed 20 Characters"),
});

export type IUserRegister = z.infer<typeof RegisterSchema>;

export default function RegisterModal({
  onSubmit,
  onChangeModal,
}: {
  onSubmit: () => void;
  onChangeModal: () => void;
}) {
  const { mutateAsync, error } = useMutation({
    mutationFn: (user: IUserRegister) => {
      return axios.post("/api/auth/register", user);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegister>({
    resolver: zodResolver(RegisterSchema),
  });

  async function submit(data: IUserRegister) {
    const { status } = await mutateAsync(data);

    if (status === 201) {
      onSubmit();
    }
  }

  // @ts-expect-error
  const formError = error ? error.response.data.message : "";

  return (
    <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Register</h3>
      <hr class="my-3" />
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Error>{formError}</Form.Error>
        <Form.Field
          label="First Name"
          inputProps={register("first_name")}
          error={errors.first_name?.message || ""}
        />
        <Form.Field
          label="Last Name"
          inputProps={register("last_name")}
          error={errors.last_name?.message || ""}
        />
        <Form.Field
          label="Email"
          inputProps={register("email")}
          error={errors.email?.message || ""}
        />
        <Form.Field
          label="Password"
          inputProps={register("password")}
          error={errors.password?.message || ""}
        />
        <Form.Actions>
          <div className="flex flex-col gap-2">
            <Button type="submit">Register</Button>
            <Button onClick={onChangeModal}>
              Don't have an Account? Register.
            </Button>
          </div>
        </Form.Actions>
      </Form>
    </div>
  );
}
