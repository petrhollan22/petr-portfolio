import { buildMetadata } from '@/lib/metadata';
import ScheduleTimeClient from './ScheduleTimeClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale, 'scheduleTitle', 'scheduleDescription', '/schedule-time');
}

export default function Page() {
  return <ScheduleTimeClient />;
}
