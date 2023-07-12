import { TripItem } from "@/components/TripItem";
import { prisma } from "@/lib/prisma"
import { Trip } from "@prisma/client";

async function getTrips() {
  return await prisma.trip.findMany({});   
}

export async function RecommendedTrips() {
  const data = await getTrips(); 
  
  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <span className="w-full h-[1px] bg-lightGray block"></span>
        <h2 className="px-5 font-medium text-dark whitespace-nowrap">Destinos recomendados</h2>
        <span className="w-full h-[1px] bg-lightGray block"></span>
      </div>

      <div className="flex flex-col items-center gap-5 mt-5">
        {data.map((trip: Trip) => (
          <TripItem key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  )
}