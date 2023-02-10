import { IThought } from "./Thought";

const DateTimeFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function ThoughtInfo({
  createdAt,
  user,
}: Omit<IThought, "title" | "message">) {
  return (
    <div className="absolute top-1 right-1 rounded-full bg-indigo-100 py-1 px-3 text-sm font-semibold">
      {!user || !createdAt ? (
        <span>Become a Member to see Post Date & Creators Name</span>
      ) : (
        <span>
          Posted By: {user.name} on{" "}
          {DateTimeFormatter.format(new Date(createdAt))}
        </span>
      )}
    </div>
  );
}
