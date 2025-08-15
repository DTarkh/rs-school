import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="p-[2rem] text-center">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you’re looking for doesn’t exist.</p>
      <Link href="/">Go back home</Link>
    </main>
  );
}
