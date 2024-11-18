export default function ServerError({ error }) {
  if (!error) return;

  return <p className="mt-1.5 text-[0.8rem]  text-red-500 dark:text-red-500">{error}</p>;
}
