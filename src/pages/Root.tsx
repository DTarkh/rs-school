import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Menu from '../components/Menu';
import { useTheme } from '../contexts/useTheme';

export default function RootLayout() {
  const { theme } = useTheme();

  return (
    <>
      <Header />
      <main
        className={`${theme === 'light' ? 'bg-gray-50' : 'bg-gray-500'} w-full min-h-screen flex flex-col items-center justify-center`}
      >
        <Menu />
        <Outlet />
      </main>
    </>
  );
}
