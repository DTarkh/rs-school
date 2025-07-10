export default function ResultsList({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <ul className="w-1/2">
        <li>Title: {title.slice(0, 20)}</li>
      </ul>
      <ul className="w-1/2">
        <li>Description: {description.slice(0, 30)}</li>
      </ul>
    </div>
  );
}
