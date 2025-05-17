import { ArrowRight } from "lucide-react";
import { Fragment } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { getAllPublishedEvents } from "@/lib/events";

const EventsPreview = async () => {
  const allEvents = await getAllPublishedEvents();
  const currentDate = new Date();

  // Filter future events and limit to 5
  const futureEvents = allEvents
    .filter(event => new Date(event.event_start_time) > currentDate)
    .slice(0, 5);

  if (futureEvents.length === 0) {
    return (
      <section className="py-32">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl font-medium text-muted-foreground">
              We are working on some new workshops and events. Please check back soon or sign up for our newsletter.
            </h3>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:gap-2">
          <div className="flex-1">
            <div className="flex justify-between">
              <div className="flex flex-col max-w-1/2 sm:max-w-3/4">
                <h2 className="mb-6 text-3xl font-bold text-pretty lg:text-5xl">
                  Our Upcoming Events
                </h2>
                <p className="mb-6 text-muted-foreground lg:text-xl">
                  Join our in-person and online workshops to build mediation skills, strengthen connections, and turn conflict into community.
                </p>
              </div>
              <div className="flex">
                <Button variant="default" className="hover:bg-accent-foreground">View All Events</Button>
              </div>
            </div>
            <div className="mt-14">
              <Separator />
              {futureEvents.map((item) => (
                <Fragment key={item.id}>
                  <a
                    href={`/events/${item.slug}`}
                    className="group flex flex-col justify-between gap-10 py-6 transition-all duration-400 lg:flex-row lg:items-center lg:hover:bg-muted"
                  >
                    <div className="flex items-center gap-2 text-lg transition-all duration-400 lg:group-hover:translate-x-8">
                      <p className="inline text-pretty text-primary">
                        {item.name}
                        <ArrowRight className="ml-2 inline size-4 shrink-0 opacity-0 transition-all duration-400 lg:group-hover:text-primary lg:group-hover:opacity-100" />
                      </p>
                    </div>
                    <div className="flex w-full items-center justify-between transition-all duration-400 lg:max-w-72 lg:group-hover:-translate-x-4 xl:max-w-80">
                      <p className="text-xs text-muted-foreground">
                        {item.event_type_badge || 'Event'}
                      </p>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-7 rounded-full border border-border">
                          <AvatarImage src={item.featured_image_url || '/images/event-placeholder.jpg'} />
                        </Avatar>
                        <time className="text-xs text-muted-foreground">
                          {new Date(item.event_start_time).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                        </time>
                      </div>
                    </div>
                  </a>
                  <Separator />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { EventsPreview };
