import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function RootLayout() {
  return (
    <main className="bg-gray-50 w-full min-h-screen flex flex-col items-center justify-center">
      <Header />
      <Outlet />
    </main>
  );
}
