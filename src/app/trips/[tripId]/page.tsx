import { prisma } from "@/lib/prisma"
import { TripHeader } from "./components/TripHeader";
import { TripReservation } from "./components/TripReservation";
import { TripDescription } from "./components/TripDescription";
import { TripHighlights } from "./components/TripHighlights";
import { TripLocation } from "./components/TripLocation";

type TripDetailsProps = {
  params: {
    tripId: string
  }
}

const getTripDetails =  async (tripId: string) => {
  const trip = await prisma.trip.findUnique({
    where: {
      id: tripId,
    }
  });

  return trip;
} 

export default async function TripDetails({ params }: TripDetailsProps) {
  const trip = await getTripDetails(params.tripId);

  if (!trip) return null;

  return (
    <div className="container mx-auto">
      <TripHeader trip={trip} />
      <TripReservation tripStartDate={trip.startDate} tripEndData={trip.endDate} maxGuests={trip.maxGuests} />
      <TripDescription description={trip.description} />
      <TripHighlights highlights={trip.highlights} />
      <TripLocation location={trip.location} locationDescription={trip.locationDescription} />
    </div>
  )
} 