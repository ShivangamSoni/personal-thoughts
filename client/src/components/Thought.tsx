import ThoughtInfo from "./ThoughtInfo";

export interface IThought {
  id: string;
  title: string;
  message: string;
  createdAt?: string;
  user?: {
    name: string;
  };
}

export default function Thought({ title, message, ...info }: IThought) {
  return (
    <div className="relative rounded-md bg-white p-4 shadow-md">
      <h2 className="text-xl font-bold underline decoration-double underline-offset-2">
        {title}
      </h2>
      <p className="mt-3 text-justify text-base leading-loose">{message}</p>
      <ThoughtInfo {...info} />
    </div>
  );
}
