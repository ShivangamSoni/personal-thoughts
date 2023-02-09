import { useQuery } from "react-query";
import { AxiosError } from "axios";
import axios from "../axios";

import { Spinner } from "./Spinner";
import Thought, { IThought } from "./Thought";

export default function ThoughtBoard() {
  const {
    isLoading,
    data: messages,
    isError,
    error,
  } = useQuery<IThought[], AxiosError<{ message: string }>>(
    "messages",
    async () => {
      return (await axios.get("/api/messages")).data.messages;
    }
  );

  if (isError) {
    return <h2>{error!.response?.data.message || error!.message}</h2>;
  }

  return (
    <>
      {isLoading ? (
        <Spinner label="Loading Messages" />
      ) : (
        <ul className="flex w-full flex-col gap-4 overflow-auto">
          {messages!.map((message) => (
            <li key={message.id}>
              <Thought {...message} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
