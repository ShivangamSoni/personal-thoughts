import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Form from "./Form";
import Button from "./Button";

import { useAuthCtx } from "../Context/AuthContext";

const JoinSchema = z.object({
  code: z.string().min(1, "Join Code Required"),
});

type IJoin = z.infer<typeof JoinSchema>;

export default function LoginModal({ onSubmit }: { onSubmit: () => void }) {
  const { join } = useAuthCtx();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IJoin>({
    resolver: zodResolver(JoinSchema),
  });

  async function submit({ code }: IJoin) {
    const { status } = await join.mutate(code);
    if (status === 201) {
      onSubmit();
    }
  }

  return (
    <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Join Membership
      </h3>
      <hr class="my-3" />
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Error>{join.error}</Form.Error>
        <Form.Field
          label="Join Code"
          inputProps={register("code")}
          error={errors.code?.message || ""}
        />
        <Form.Actions>
          <div className="flex flex-col gap-2">
            <Button type="submit">Join</Button>
          </div>
        </Form.Actions>
      </Form>
    </div>
  );
}
