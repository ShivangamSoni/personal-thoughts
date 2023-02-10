import { UseQueryOptions } from "react-query";
import axios from "../axios";
import { IThought } from "../components/Thought";
import { AxiosError } from "axios";

export const GET_THOUGHTS: UseQueryOptions<
  IThought[],
  AxiosError<{ message: string }>
> = {
  queryKey: "thoughts",
  queryFn: async () => {
    const token = JSON.parse(localStorage.getItem("token") || "");
    const { data } = await axios.get("/api/messages", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.messages;
  },
  retry: 3,
};
