import Header from '../components/Header';

export default function ErrorPage() {
  return (
    <>
      <Header />
      <main className="bg-gray-50 w-full min-h-screen flex flex-col items-center justify-center gap-3">
        <h1 className="text-3xl">404 Not Found!</h1>
        <p>Could not find this page!</p>
      </main>
    </>
  );
}
