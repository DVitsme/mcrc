import { notFound } from 'next/navigation';
import { getEventBySlug } from '@/lib/events';
import EventPageClient from './EventPageClient';

interface EventPageProps {
  params: { slug: string };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventBySlug(params.slug);
  if (!event) return notFound();
  return <EventPageClient event={event} />;
}
