import { Trip } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import ReactCountryFlag from "react-country-flag";

interface TripsItemProps {
  trip: Trip
}

export function TripItem({ trip } : TripsItemProps) {
  return (
    <Link href={`/trips/${trip.id}`}>
      <div className="flex flex-col">
        <div className="relative w-[280px] h-[280px]">
          <Image className="rounded-lg shadow-md object-cover" fill src={trip.coverImage} alt={trip.name} />
        </div>
        
        <h3 className="text-primaryDarker font-medium text-sm mt-2">{ trip.name }</h3>

        <div className="flex items-center gap-1 my-1">
          <ReactCountryFlag countryCode={trip.countryCode} svg/>
          <p className="text-xs text-dark">{trip.location}</p>
        </div>

        <p className="text-xs text-dark">
          <span className="text-primary font-medium">R$ {trip.pricePerDay.toString()}</span> por dia
        </p>
      </div>
    </Link>
  )
}