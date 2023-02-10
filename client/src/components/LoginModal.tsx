import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Form from "./Form";
import Button from "./Button";
import { useMutation } from "react-query";
import axios from "../axios";
import { useAuthCtx } from "../Context/AuthContext";

const LoginSchema = z.object({
  email: z.string().email().min(1, "Email Required"),
  password: z
    .string()
    .min(8, "Password Should be at least 8 Characters")
    .max(20, "Password can't exceed 20 Characters"),
});

export type IUserCredentials = z.infer<typeof LoginSchema>;

export default function LoginModal({
  onSubmit,
  onChangeModal,
}: {
  onSubmit?: () => void;
  onChangeModal: () => void;
}) {
  const { login } = useAuthCtx();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserCredentials>({
    resolver: zodResolver(LoginSchema),
  });

  async function submit(data: IUserCredentials) {
    const {
      data: { success },
    } = await login.mutate(data);
    if (success && onSubmit) {
      onSubmit();
    }
  }

  return (
    <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
      <h3 className="text-lg font-medium leading-6 text-gray-900">Login</h3>
      <hr class="my-3" />
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Error>{login.error}</Form.Error>
        <Form.Field
          label="Email"
          inputProps={register("email")}
          error={errors.email?.message || ""}
        />
        <Form.Field
          label="Password"
          inputProps={{ ...register("password"), type: "password" }}
          error={errors.password?.message || ""}
        />
        <Form.Actions>
          <div className="flex flex-col gap-2">
            <Button type="submit">Login</Button>
            <Button onClick={onChangeModal}>
              Don't have an Account? Register.
            </Button>
          </div>
        </Form.Actions>
      </Form>
    </div>
  );
}
