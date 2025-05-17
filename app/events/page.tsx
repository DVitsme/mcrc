import { getAllPublishedEvents, getAllEventTypeBadges } from "@/lib/events";
import { EventsPageClient } from "@/components/blocks/EventsPageClient";

/**
 * Events Page Component
 * 
 * This is a Server Component that handles data fetching and passes data to the client component.
 * We split this into server and client components for several reasons:
 * 
 * 1. Data Fetching: Server Components can fetch data directly without client-side API calls
 * 2. Performance: Initial data is fetched server-side, reducing client-side JavaScript
 * 3. SEO: Search engines can see the full content immediately
 * 4. Interactivity: Client component handles user interactions (filtering, sorting)
 * 
 * The page uses Promise.all to fetch both events and event type badges in parallel,
 * optimizing the initial load time.
 */
export default async function Event() {
  // Fetch both events and event type badges concurrently
  const [events, badges] = await Promise.all([
    getAllPublishedEvents(),
    getAllEventTypeBadges(),
  ]);

  // Pass the fetched data to the client component
  // EventsPageClient handles the UI rendering and user interactions
  return <EventsPageClient events={events} badges={badges} />;
}
