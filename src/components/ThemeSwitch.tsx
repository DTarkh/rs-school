import { useTheme } from '../contexts/useTheme';

export default function Themeswitch() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="bg-gray-200 rounded-2xl px-3 py-1 text-gray-700 font-semibold"
    >
      Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </button>
  );
}
