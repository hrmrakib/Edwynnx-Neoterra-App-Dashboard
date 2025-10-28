"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, Clock, Users, ArrowLeft, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Guest {
  id: string;
  name: string;
  avatar: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  location: string;
  price: number;
  hostEarned: number;
  adminEarned: number;
  ticketsSold: number;
  ticketsTotal: number;
  guests: Guest[];
  status: "upcoming" | "completed";
}

const MOCK_GUESTS: Record<string, Guest[]> = {
  "event-1": [
    {
      id: "1",
      name: "Theresa Webb",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Theresa",
    },
    {
      id: "2",
      name: "Devon Lane",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Devon",
    },
    {
      id: "3",
      name: "Robert Fox",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    },
    {
      id: "4",
      name: "Guy Hawkins",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guy",
    },
    {
      id: "5",
      name: "Floyd Miles",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Floyd",
    },
    {
      id: "6",
      name: "Jenny Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny",
    },
    {
      id: "7",
      name: "Jacob Jones",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jacob",
    },
    {
      id: "8",
      name: "Arlene McCoy",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arlene",
    },
    {
      id: "9",
      name: "Ralph Edwards",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ralph",
    },
    {
      id: "10",
      name: "Esther Howard",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Esther",
    },
  ],
};

const MOCK_EVENTS: Event[] = [
  {
    id: "event-1",
    title: "Oxford Road NightsOut",
    description:
      "Join us for the ultimate nightlife experience! Dance, drink, and vibe with top DJs spinning electrifying beats all night long",
    image: "/nightclub-stage-with-lights-and-crowd.jpg",
    date: "21/03",
    time: "09:00pm - 02:00am",
    location: "Yellowstone National Park, Wyoming",
    price: 50,
    hostEarned: 500,
    adminEarned: 75,
    ticketsSold: 10,
    ticketsTotal: 40,
    guests: MOCK_GUESTS["event-1"],
    status: "upcoming",
  },
  {
    id: "event-2",
    title: "Oxford Road NightsOut",
    description:
      "Join us for the ultimate nightlife experience! Dance, drink, and vibe with top DJs spinning electrifying beats all night long",
    image: "/concert-microphone-stage.jpg",
    date: "21/03",
    time: "09:00pm - 02:00am",
    location: "Downtown Music Hall, New York",
    price: 50,
    hostEarned: 500,
    adminEarned: 75,
    ticketsSold: 10,
    ticketsTotal: 40,
    guests: MOCK_GUESTS["event-1"],
    status: "upcoming",
  },
  {
    id: "event-3",
    title: "Oxford Road NightsOut",
    description:
      "Join us for the ultimate nightlife experience! Dance, drink, and vibe with top DJs spinning electrifying beats all night long",
    image: "/crowd-at-concert-with-stage-lights.jpg",
    date: "21/03",
    time: "09:00pm - 02:00am",
    location: "Central Park, New York",
    price: 50,
    hostEarned: 500,
    adminEarned: 75,
    ticketsSold: 10,
    ticketsTotal: 40,
    guests: MOCK_GUESTS["event-1"],
    status: "upcoming",
  },
  {
    id: "event-4",
    title: "Oxford Road NightsOut",
    description:
      "Join us for the ultimate nightlife experience! Dance, drink, and vibe with top DJs spinning electrifying beats all night long",
    image: "/disco-ball-party-lights.jpg",
    date: "21/03",
    time: "09:00pm - 02:00am",
    location: "Las Vegas Strip, Nevada",
    price: 50,
    hostEarned: 500,
    adminEarned: 75,
    ticketsSold: 10,
    ticketsTotal: 40,
    guests: MOCK_GUESTS["event-1"],
    status: "upcoming",
  },
  {
    id: "event-5",
    title: "Oxford Road NightsOut",
    description:
      "Join us for the ultimate nightlife experience! Dance, drink, and vibe with top DJs spinning electrifying beats all night long",
    image: "/red-concert-lights-crowd.jpg",
    date: "21/03",
    time: "09:00pm - 02:00am",
    location: "Miami Beach, Florida",
    price: 50,
    hostEarned: 500,
    adminEarned: 75,
    ticketsSold: 10,
    ticketsTotal: 40,
    guests: MOCK_GUESTS["event-1"],
    status: "upcoming",
  },
  {
    id: "event-6",
    title: "Oxford Road NightsOut",
    description:
      "Join us for the ultimate nightlife experience! Dance, drink, and vibe with top DJs spinning electrifying beats all night long",
    image: "/fireworks-city-night.jpg",
    date: "21/03",
    time: "09:00pm - 02:00am",
    location: "San Francisco, California",
    price: 50,
    hostEarned: 500,
    adminEarned: 75,
    ticketsSold: 10,
    ticketsTotal: 40,
    guests: MOCK_GUESTS["event-1"],
    status: "upcoming",
  },
  {
    id: "event-7",
    title: "Oxford Road NightsOut",
    description:
      "Join us for the ultimate nightlife experience! Dance, drink, and vibe with top DJs spinning electrifying beats all night long",
    image: "/stage-lights-concert.jpg",
    date: "21/03",
    time: "09:00pm - 02:00am",
    location: "Chicago, Illinois",
    price: 50,
    hostEarned: 500,
    adminEarned: 75,
    ticketsSold: 10,
    ticketsTotal: 40,
    guests: MOCK_GUESTS["event-1"],
    status: "upcoming",
  },
  {
    id: "event-8",
    title: "Oxford Road NightsOut",
    description:
      "Join us for the ultimate nightlife experience! Dance, drink, and vibe with top DJs spinning electrifying beats all night long",
    image: "/temple-night-lights.jpg",
    date: "21/03",
    time: "09:00pm - 02:00am",
    location: "Bangkok, Thailand",
    price: 50,
    hostEarned: 500,
    adminEarned: 75,
    ticketsSold: 10,
    ticketsTotal: 40,
    guests: MOCK_GUESTS["event-1"],
    status: "upcoming",
  },
  {
    id: "event-9",
    title: "Oxford Road NightsOut",
    description:
      "Join us for the ultimate nightlife experience! Dance, drink, and vibe with top DJs spinning electrifying beats all night long",
    image: "/nightclub-stage-with-lights-and-crowd.jpg",
    date: "15/03",
    time: "09:00pm - 02:00am",
    location: "Yellowstone National Park, Wyoming",
    price: 50,
    hostEarned: 500,
    adminEarned: 75,
    ticketsSold: 40,
    ticketsTotal: 40,
    guests: MOCK_GUESTS["event-1"],
    status: "completed",
  },
  {
    id: "event-10",
    title: "Oxford Road NightsOut",
    description:
      "Join us for the ultimate nightlife experience! Dance, drink, and vibe with top DJs spinning electrifying beats all night long",
    image: "/concert-microphone-stage.jpg",
    date: "14/03",
    time: "09:00pm - 02:00am",
    location: "Downtown Music Hall, New York",
    price: 50,
    hostEarned: 500,
    adminEarned: 75,
    ticketsSold: 40,
    ticketsTotal: 40,
    guests: MOCK_GUESTS["event-1"],
    status: "completed",
  },
  {
    id: "event-11",
    title: "Oxford Road NightsOut",
    description:
      "Join us for the ultimate nightlife experience! Dance, drink, and vibe with top DJs spinning electrifying beats all night long",
    image: "/crowd-at-concert-with-stage-lights.jpg",
    date: "13/03",
    time: "09:00pm - 02:00am",
    location: "Las Vegas Strip, Nevada",
    price: 50,
    hostEarned: 500,
    adminEarned: 75,
    ticketsSold: 40,
    ticketsTotal: 40,
    guests: MOCK_GUESTS["event-1"],
    status: "completed",
  },
  {
    id: "event-12",
    title: "Oxford Road NightsOut",
    description:
      "Join us for the ultimate nightlife experience! Dance, drink, and vibe with top DJs spinning electrifying beats all night long",
    image: "/disco-ball-party-lights.jpg",
    date: "12/03",
    time: "09:00pm - 02:00am",
    location: "Miami Beach, Florida",
    price: 50,
    hostEarned: 500,
    adminEarned: 75,
    ticketsSold: 40,
    ticketsTotal: 40,
    guests: MOCK_GUESTS["event-1"],
    status: "completed",
  },
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [guestListModalOpen, setGuestListModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed">(
    "upcoming"
  );
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const uniqueLocations = useMemo(() => {
    return Array.from(
      new Set(MOCK_EVENTS.map((event) => event.location))
    ).sort();
  }, []);

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter((event) => {
      const matchesTab = event.status === activeTab;
      const matchesLocation =
        !selectedLocation || event.location === selectedLocation;
      return matchesTab && matchesLocation;
    });
  }, [activeTab, selectedLocation]);

  const handleEventCardClick = (event: Event) => {
    setSelectedEvent(event);
    setDetailModalOpen(true);
  };

  const handleGuestListClick = () => {
    setDetailModalOpen(false);
    setGuestListModalOpen(true);
  };

  const handleBackFromGuestList = () => {
    setGuestListModalOpen(false);
    setDetailModalOpen(true);
  };

  const EventCard = ({ event }: { event: Event }) => (
    <Card
      onClick={() => handleEventCardClick(event)}
      className='cursor-pointer overflow-hidden border-2 border-purple-500 bg-slate-900 hover:border-purple-400 transition-all hover:shadow-lg hover:shadow-purple-500/20 py-0'
    >
      <div className='relative h-40 w-full overflow-hidden bg-slate-800'>
        <Image
          src={"/event.jpg"}
          alt={event.title}
          fill
          className='object-cover'
        />
      </div>
      <div className='p-4'>
        <h3 className='text-white font-semibold truncate'>{event.title}</h3>
        <div className='flex items-center justify-between mt-3'>
          <span className='text-sm text-gray-400'>{event.date}</span>
          <span className='text-sm font-semibold text-cyan-400'>
            ${event.price}
          </span>
        </div>
      </div>
    </Card>
  );

  const LocationFilter = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='w-full md:w-auto border-slate-600 text-white hover:bg-slate-800 bg-transparent flex items-center gap-2'
        >
          <MapPin className='w-4 h-4' />
          <span>{selectedLocation || "All Locations"}</span>
          <ChevronDown className='w-4 h-4 ml-auto md:ml-2' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 bg-slate-800 border-slate-700'>
        <DropdownMenuItem
          onClick={() => setSelectedLocation(null)}
          className={`cursor-pointer text-white hover:bg-slate-700 ${
            !selectedLocation ? "bg-purple-600" : ""
          }`}
        >
          All Locations
        </DropdownMenuItem>
        {uniqueLocations.map((location) => (
          <DropdownMenuItem
            key={location}
            onClick={() => setSelectedLocation(location)}
            className={`cursor-pointer text-white hover:bg-slate-700 ${
              selectedLocation === location ? "bg-purple-600" : ""
            }`}
          >
            {location}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const EventDetailModal = () => {
    if (!selectedEvent) return null;

    return (
      <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
        <DialogContent className='max-w-md bg-slate-800 border-purple-500 border-2 text-white max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle className='text-white text-xl'>
              {selectedEvent.title}
            </DialogTitle>
          </DialogHeader>

          <div className='space-y-4'>
            <p className='text-sm text-gray-300'>{selectedEvent.description}</p>

            <div className='flex items-start gap-3'>
              <Clock className='w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0' />
              <div>
                <p className='text-sm text-gray-400'>Date & Time</p>
                <p className='text-white font-semibold'>
                  {selectedEvent.date} | {selectedEvent.time}
                </p>
              </div>
            </div>

            <div className='flex items-start gap-3'>
              <MapPin className='w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0' />
              <div>
                <p className='text-sm text-gray-400'>Location</p>
                <p className='text-white font-semibold'>
                  {selectedEvent.location}
                </p>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-3 pt-2'>
              <div className='bg-slate-700 rounded-lg p-3'>
                <p className='text-xs text-gray-400'>Host Earned</p>
                <p className='text-lg font-bold text-cyan-400'>
                  ${selectedEvent.hostEarned}
                </p>
              </div>
              <div className='bg-slate-700 rounded-lg p-3'>
                <p className='text-xs text-gray-400'>Admin Earned</p>
                <p className='text-lg font-bold text-cyan-400'>
                  ${selectedEvent.adminEarned}
                </p>
              </div>
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <div className='bg-slate-700 rounded-lg p-3'>
                <p className='text-xs text-gray-400'>Ticket Sold</p>
                <p className='text-lg font-bold text-white'>
                  {selectedEvent.ticketsSold}/{selectedEvent.ticketsTotal}
                </p>
              </div>
              <div className='bg-slate-700 rounded-lg p-3'>
                <p className='text-xs text-gray-400'>Ticket Price</p>
                <p className='text-lg font-bold text-cyan-400'>
                  ${selectedEvent.price}
                </p>
              </div>
            </div>

            <Button
              onClick={handleGuestListClick}
              className='w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 mt-4'
            >
              <Users className='w-4 h-4 mr-2' />
              Guest List ({selectedEvent.guests.length})
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const GuestListModal = () => {
    const guests = selectedEvent?.guests || [];

    return (
      <Dialog open={guestListModalOpen} onOpenChange={setGuestListModalOpen}>
        <DialogContent className='max-w-md bg-slate-800 border-purple-500 border-2 text-white max-h-[90vh] overflow-y-auto p-0'>
          <div className='sticky top-0 bg-slate-800 border-b border-slate-700 p-4 flex items-center gap-3'>
            <Button
              variant='ghost'
              size='icon'
              onClick={handleBackFromGuestList}
              className='text-white hover:bg-slate-700'
            >
              <ArrowLeft className='w-5 h-5' />
            </Button>
            <DialogTitle className='text-white text-lg'>Guest List</DialogTitle>
          </div>

          <div className='space-y-2 p-4'>
            {guests.map((guest: Guest) => (
              <div
                key={guest.id}
                className='flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700 transition-colors'
              >
                <div className='relative w-10 h-10 flex-shrink-0'>
                  <Image
                    src={guest.avatar || "/placeholder.svg"}
                    alt={guest.name}
                    fill
                    className='rounded-full object-cover'
                  />
                </div>
                <span className='text-white font-medium'>{guest.name}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8'>
      <div className='mb-8'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
          <div>
            <h1 className='text-3xl md:text-4xl font-bold text-white mb-2'>
              Welcome, Sharon
            </h1>
            <p className='text-gray-400'>Have a nice day</p>
          </div>
          <LocationFilter />
        </div>

        <div className='flex gap-3'>
          <Button
            onClick={() => setActiveTab("upcoming")}
            className={`rounded-full font-semibold transition-all ${
              activeTab === "upcoming"
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-slate-700 hover:bg-slate-600 text-gray-300"
            }`}
          >
            Up coming
          </Button>
          <Button
            onClick={() => setActiveTab("completed")}
            className={`rounded-full font-semibold transition-all ${
              activeTab === "completed"
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-slate-700 hover:bg-slate-600 text-gray-300"
            }`}
          >
            Completed
          </Button>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <div className='col-span-full text-center py-12'>
            <p className='text-gray-400 text-lg'>No events found</p>
          </div>
        )}
      </div>

      <EventDetailModal />
      <GuestListModal />
    </div>
  );
}
