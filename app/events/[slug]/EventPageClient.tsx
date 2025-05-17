"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, MapPin, CircleDollarSign } from "lucide-react";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EventSpeaker {
  id: string;
  speaker_name: string;
  speaker_title?: string;
  speaker_bio?: string;
  speaker_avatar_url?: string;
  display_order?: number;
}

interface AdditionalNote { item: string }

interface EventData {
  id: string;
  name: string;
  slug: string;
  event_type_badge?: string;
  summary?: string;
  description_content?: string;
  featured_image_url?: string;
  supporting_image_url?: string;
  event_start_time: string;
  event_end_time?: string;
  event_modality: string;
  venue_name?: string;
  location_address?: string;
  online_meeting_url?: string;
  online_meeting_details?: string;
  is_free: boolean;
  cost_amount?: number;
  cost_currency?: string;
  cost_description?: string;
  is_registration_required: boolean;
  external_registration_link?: string;
  registration_deadline?: string;
  event_contact_person_name?: string;
  event_contact_email?: string;
  event_contact_phone?: string;
  additional_notes_structured?: AdditionalNote[];
  status: string;
  created_at: string;
  updated_at: string;
  speakers: EventSpeaker[];
}

interface EventPageClientProps {
  event: EventData;
}

export default function EventPageClient({ event }: EventPageClientProps) {
  // Section navigation highlighting
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  useEffect(() => {
    const sections = Object.keys(sectionRefs.current);
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    let observer: IntersectionObserver | null = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    });
    sections.forEach((sectionId) => {
      const element = sectionRefs.current[sectionId];
      if (element) {
        observer?.observe(element);
      }
    });
    return () => {
      observer?.disconnect();
      observer = null;
    };
  }, []);

  const addSectionRef = (id: string, ref: HTMLElement | null) => {
    if (ref) {
      sectionRefs.current[id] = ref;
    }
  };

  return (
    <section className="py-32">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section: Main event title, description, and featured image */}
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5">
          {event.event_type_badge && (
            <Badge variant="secondary">{event.event_type_badge}</Badge>
          )}
          <h1 className="text-center text-3xl font-medium text-pretty lg:text-5xl">
            {event.name}
          </h1>
          {event.summary && (
            <p className="text-center text-muted-foreground lg:text-lg">
              {event.summary}
            </p>
          )}
          {/* User who posted the event information with avatar and brief bio (optional) */}
        </div>

        {/* Featured image section */}
        {event.featured_image_url && (
          <div className="mx-auto mt-12 max-w-6xl rounded-lg border p-2">
            <Image
              src={event.featured_image_url}
              alt={event.name}
              className="aspect-video rounded-lg object-cover w-full"
              width={1000}
              height={1000}
            />
          </div>
        )}

        {/* Main content area with navigation and details */}
        <div className="relative mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-4">
          {/* Left sidebar navigation - only visible on larger screens */}
          <div className="sticky top-8 hidden h-fit lg:block">
            <span className="mb-6 text-lg">Content</span>
            <nav className="mt-2">
              <ul className="space-y-2">
                <li>
                  <a
                    href="#section1"
                    className={cn(
                      "block py-1 transition-colors duration-200",
                      activeSection === "section1"
                        ? "font-medium text-primary"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    Workshop Overview
                  </a>
                </li>
                <li>
                  <a
                    href="#section2"
                    className={cn(
                      "block py-1 transition-colors duration-200",
                      activeSection === "section2"
                        ? "font-medium text-primary"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    Key Topics
                  </a>
                </li>
                <li>
                  <a
                    href="#section3"
                    className={cn(
                      "block py-1 transition-colors duration-200",
                      activeSection === "section3"
                        ? "font-medium text-primary"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    Meet the Speakers
                  </a>
                </li>
                <li>
                  <a
                    href="#section4"
                    className={cn(
                      "block py-1 transition-colors duration-200",
                      activeSection === "section4"
                        ? "font-medium text-primary"
                        : "text-muted-foreground hover:text-primary",
                    )}
                  >
                    Additional Notes
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main content area - contains all the detailed sections */}
          <div className="lg:col-span-2">
            <div className="lg:col-span-2">
              {/* Introduction section */}
              <div>
                <h1 className="text-3xl font-extrabold">{event.name}</h1>
                {event.summary && (
                  <p className="mt-2 text-lg text-muted-foreground">
                    {event.summary}
                  </p>
                )}
                {event.supporting_image_url && (
                  <Image
                    src={event.supporting_image_url}
                    alt={event.name}
                    className="my-8 aspect-video w-full rounded-md object-cover"
                    width={1000}
                    height={1000}
                  />
                )}
              </div>

              {/* Workshop Overview Section */}
              <section
                id="section1"
                ref={(ref) => addSectionRef("section1", ref)}
                className="prose mb-8"
              >
                <h2>Workshop Overview</h2>
                {/* Render HTML safely */}
                {event.description_content && (
                  <div dangerouslySetInnerHTML={{ __html: event.description_content }} />
                )}
                <div className="my-6 rounded-lg bg-muted p-4">
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(event.event_start_time).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                    </li>
                    {event.venue_name && (
                      <li className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {event.venue_name}
                      </li>
                    )}
                    {event.is_free ? (
                      <li className="flex items-center gap-2">
                        <CircleDollarSign className="h-4 w-4" />
                        Free
                      </li>
                    ) : (
                      <li className="flex items-center gap-2">
                        <CircleDollarSign className="h-4 w-4" />
                        {event.cost_amount
                          ? `${event.cost_currency || 'USD'} $${event.cost_amount} ${event.cost_description || ''}`
                          : event.cost_description}
                      </li>
                    )}
                  </ul>
                </div>
              </section>

              {/* Key Topics Section with Table */}
              <section
                id="section2"
                ref={(ref) => addSectionRef("section2", ref)}
                className="prose mb-8"
              >
                <h2>Key Topics</h2>
                <p>
                  Our workshop covers essential aspects of successful co-parenting, including:
                </p>
                <div className="my-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Topic</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Effective Communication</TableCell>
                        <TableCell>Learn strategies for clear, respectful communication</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Conflict Resolution</TableCell>
                        <TableCell>Tools for managing disagreements constructively</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Child-Centered Planning</TableCell>
                        <TableCell>Creating schedules that prioritize children&apos;s needs</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>

              {/* Speakers Section */}
              <section
                id="section3"
                ref={(ref) => addSectionRef("section3", ref)}
                className="prose mb-8"
              >
                <h2>Meet the Speakers</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {event.speakers.map((speaker) => (
                    <div key={speaker.id}>
                      {speaker.speaker_avatar_url && (
                        <Avatar className="mb-2">
                          <AvatarImage src={speaker.speaker_avatar_url} />
                        </Avatar>
                      )}
                      <h3>{speaker.speaker_name}</h3>
                      <p>{speaker.speaker_title}</p>
                      <p className="text-muted-foreground">{speaker.speaker_bio}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Additional Notes Section */}
              <section
                id="section4"
                ref={(ref) => addSectionRef("section4", ref)}
                className="prose mb-8"
              >
                <h2>Additional Notes</h2>
                <div className="rounded-lg bg-muted p-6">
                  <div className="space-y-6">
                    {/* Contact Information */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                      <ul className="space-y-2 text-muted-foreground">
                        {event.event_contact_person_name && (
                          <li>
                            <span className="font-medium">Contact Person:</span> {event.event_contact_person_name}
                          </li>
                        )}
                        {event.event_contact_email && (
                          <li>
                            <span className="font-medium">Email:</span>{' '}
                            <a href={`mailto:${event.event_contact_email}`} className="text-primary hover:underline">
                              {event.event_contact_email}
                            </a>
                          </li>
                        )}
                        {event.event_contact_phone && (
                          <li>
                            <span className="font-medium">Phone:</span>{' '}
                            <a href={`tel:${event.event_contact_phone}`} className="text-primary hover:underline">
                              {event.event_contact_phone}
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                    {/* Miscellaneous Notes */}
                    {event.additional_notes_structured && event.additional_notes_structured.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Important Information</h3>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                          {event.additional_notes_structured.map((note, idx) => (
                            <li key={idx}>{note.item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </section>

            </div>
          </div>

          {/* Right sidebar - Workshop details and registration buttons */}
          <div className="sticky top-8 prose hidden h-fit rounded-lg border p-6 lg:block">
            <h5 className="text-xl font-semibold">
              Workshop Details
            </h5>
            <ul className="my-6 text-sm [&>li]:pl-0">
              <li className="flex items-start gap-2 mb-3 border-b-1 border-opacity-75 pb-3">
                <Calendar className="h-4 w-4" />
                {new Date(event.event_start_time).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
              </li>
              {event.venue_name && (
                <li className="flex items-start gap-2 mb-3 border-b-1 border-opacity-75 pb-3">
                  <MapPin className="h-5 w-5" />
                  {event.venue_name}
                </li>
              )}
              {event.is_free ? (
                <li className="flex items-start gap-2 mb-3 border-b-1 border-opacity-75 pb-3">
                  <CircleDollarSign className="h-5 w-5" />
                  Free
                </li>
              ) : (
                <li className="flex items-start gap-2 mb-3 border-b-1 border-opacity-75 pb-3">
                  <CircleDollarSign className="h-5 w-5" />
                  {event.cost_amount
                    ? `${event.cost_currency || 'USD'} $${event.cost_amount} ${event.cost_description || ''}`
                    : event.cost_description}
                </li>
              )}
            </ul>
            {event.external_registration_link && (
              <div className="flex flex-col gap-2">
                <Button asChild>
                  <a href={event.external_registration_link} target="_blank" rel="noopener noreferrer">
                    Register Here
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 