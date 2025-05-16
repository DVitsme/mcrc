import { Suspense } from 'react'
import { CalendarDays, Clock, MapPin, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RegistrationModal } from '@/components/events/registration-modal'

// Mock data - would be replaced with actual data fetching logic
const upcomingEvents = [
  {
    id: 1,
    title: 'Community Mediation Workshop',
    description: 'Learn essential mediation skills to help resolve conflicts in your community.',
    date: 'June 15, 2024',
    time: '10:00 AM - 2:00 PM',
    location: 'Community Center, 123 Main Street',
    category: 'workshop',
    attendees: 24,
    maxAttendees: 30,
  },
  {
    id: 2,
    title: 'Conflict Resolution for Families',
    description: 'A specialized session focused on addressing and resolving family conflicts through mediation techniques.',
    date: 'June 22, 2024',
    time: '1:00 PM - 4:00 PM',
    location: 'Family Resource Center, 456 Oak Avenue',
    category: 'seminar',
    attendees: 15,
    maxAttendees: 25,
  },
  {
    id: 3,
    title: 'Restorative Justice Circle',
    description: 'Join our monthly restorative justice circle to learn and participate in healing community harms.',
    date: 'July 5, 2024',
    time: '5:30 PM - 7:30 PM',
    location: 'MCRC Main Office, 789 Elm Street',
    category: 'circle',
    attendees: 18,
    maxAttendees: 20,
  },
]

const pastEvents = [
  {
    id: 4,
    title: 'De-escalation Techniques Training',
    description: 'Learn effective techniques for de-escalating tense situations and preventing conflicts.',
    date: 'May 20, 2024',
    time: '9:00 AM - 12:00 PM',
    location: 'Community College, 321 Pine Road',
    category: 'training',
    attendees: 40,
    maxAttendees: 50,
  },
  {
    id: 5,
    title: 'Peer Mediation in Schools',
    description: 'A workshop for educators and administrators on implementing peer mediation programs in schools.',
    date: 'May 8, 2024',
    time: '3:30 PM - 6:30 PM',
    location: 'Central High School, 555 Education Lane',
    category: 'workshop',
    attendees: 22,
    maxAttendees: 25,
  },
]

function EventCard({ event }: { event: typeof upcomingEvents[0] }) {
  const isUpcoming = new Date(event.date) > new Date()

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{event.title}</CardTitle>
          <Badge variant={getBadgeVariant(event.category)}>
            {formatCategory(event.category)}
          </Badge>
        </div>
        <CardDescription className="mt-2">{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 flex-grow">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{event.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{event.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{event.attendees} / {event.maxAttendees} attendees</span>
        </div>
      </CardContent>
      <CardFooter>
        {isUpcoming ? (
          <RegistrationModal event={event} />
        ) : (
          <Button variant="outline" className="w-full">View Details</Button>
        )}
      </CardFooter>
    </Card>
  )
}

function getBadgeVariant(category: string) {
  switch (category) {
    case 'workshop':
      return 'default'
    case 'seminar':
      return 'secondary'
    case 'training':
      return 'outline'
    case 'circle':
      return 'destructive'
    default:
      return 'default'
  }
}

function formatCategory(category: string) {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

export default function EventsPage() {
  return (
    <main className="container max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Events & Workshops</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Join us for various events and workshops focused on mediation,
          conflict resolution, and restorative justice.
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="mb-12">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Suspense fallback={<p>Loading events...</p>}>
              {upcomingEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </Suspense>
          </div>
          {upcomingEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No upcoming events at this time. Check back soon!</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="past" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Suspense fallback={<p>Loading events...</p>}>
              {pastEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </Suspense>
          </div>
          {pastEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No past events to display.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Separator className="my-12" />

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Want to Host an Event?</h2>
        <p className="text-center mb-8">
          We welcome collaboration with community organizations to host events related to
          mediation, conflict resolution, and restorative justice.
        </p>
        <div className="flex justify-center">
          <Button size="lg" asChild>
            <a href="/contact">Contact Us</a>
          </Button>
        </div>
      </div>
    </main>
  )
} 