import { prisma } from "@/lib/prisma"
import Image from "next/image"
import ReactCountryFlag from "react-country-flag";

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
      <div className="relative w-full h-[300px]">
        <Image className="object-cover" src={trip.coverImage} alt={trip.name} fill />
      </div>

      <div className="flex flex-col p-5">
        <h1 className="font-semibold text-xl text-primaryDarker">{trip.name}</h1>

        <div className="flex items-center gap-1 my-1">
          <ReactCountryFlag countryCode={trip.countryCode} svg/>
          <p className="text-xs text-dark underline">{trip.location}</p>
        </div>

        <p className="text-xs text-dark">
          <span className="text-primary font-medium">R$ {trip.pricePerDay.toString()}</span> por dia
        </p>
      </div>
    </div>
  )
} 