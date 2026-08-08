import { buildMetadata } from '@/lib/metadata';
import InspirationClient from './InspirationClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, 'inspirationTitle', 'inspirationDescription', '/inspiration');
}

export default function Page() {
  return <InspirationClient />;
}
