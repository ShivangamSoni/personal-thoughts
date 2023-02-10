import { useQuery } from "react-query";

import { Spinner } from "./Spinner";
import Thought from "./Thought";
import { GET_THOUGHTS } from "../Query";

export default function ThoughtBoard() {
  const { isLoading, data: messages, isError, error } = useQuery(GET_THOUGHTS);
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
