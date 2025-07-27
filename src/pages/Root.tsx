import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Menu from '../components/menu';

export default function RootLayout() {
  return (
    <main className="bg-gray-50 w-full min-h-screen flex flex-col items-center justify-center">
      <Menu />
      <Header />
      <Outlet />
    </main>
  );
}
