import { getAllPublishedEvents, getAllEventTypeBadges } from "@/lib/events";
import { EventsPageClient } from "@/components/blocks/EventsPageClient";

export default async function Event() {
  const [events, badges] = await Promise.all([
    getAllPublishedEvents(),
    getAllEventTypeBadges(),
  ]);
  return <EventsPageClient events={events} badges={badges} />;
}
