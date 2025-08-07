import type { Metadata } from 'next';
import Header from '../components/Header';

export const metadata: Metadata = {
  title: 'Rs school project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
