"use client"

import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";

interface TripReservationProps {
  trip: Trip
}

export function TripReservation({ trip }: TripReservationProps) {
  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-4">
        <DatePicker className="w-full" placeholderText="Date de início" onChange={()=>{}} />
        <DatePicker className="w-full" placeholderText="Date de final" onChange={()=>{}} />      
      </div>

      <Input className="mt-4" placeholder={`Número de hóspedes (max: ${trip.maxGuests})`} />

      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total: </p>
        <p className="font-medium text-sm text-primaryDarker">R$ 2.500 </p>
      </div>

      <div className="pb-10 border-b border-b-lightGray w-full">
        <Button className="mt-3 w-full">Reservar agora</Button>
      </div>
    </div>
  )
}