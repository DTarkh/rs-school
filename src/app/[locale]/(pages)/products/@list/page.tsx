import Results from '../../../../../components/Results';

export default async function HomePage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const { search, page } = await searchParams;

  return (
    <>
      <Results searchTerm={search} page={Number(page)} />
    </>
  );
}
