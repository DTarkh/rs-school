import '../../globals.css';
import { ClientOnly } from './client';

export function generateStaticParams() {
  return [{ slug: [] }, { slug: ['home'] }, { slug: ['about'] }];
}

export default function Page() {
  return <ClientOnly />;
}
