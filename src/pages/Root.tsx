import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function RootLayout() {
  return (
    <main className="bg-amber-200 w-full h-screen flex flex-col items-center justify-center">
      <Header />
      <Outlet />
    </main>
  );
}
