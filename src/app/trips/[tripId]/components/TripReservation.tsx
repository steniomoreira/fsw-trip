"use client"

import Button from "@/components/Button";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { Trip } from "@prisma/client";

interface TripReservationProps {
  trip: Trip
}

interface TripReservationForm {
  guests: number
  startDate: Date | null
  endDate: Date | null
}

export function TripReservation({ trip }: TripReservationProps) {  
  const {register, handleSubmit, control, formState: {
    errors
  }} = useForm<TripReservationForm>();

  function onSubmit(data: any) {
    console.log(data);
    
  }

  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-4">
        <Controller 
          name='startDate'
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Data inicial é obrigatória'
            }
          }}
          render={({ field: { onChange,value } }) => (
            <DatePicker 
              className="w-full" 
              placeholderText="Date de início"
              onChange={onChange} 
              selected={value} 
              error={!!errors.startDate}
              errorMessage={errors.startDate?.message}
            />              
          )}         
        />

        <Controller 
          name='endDate'
          control={control}
          rules={{
            required: {
              value: true,
              message: 'Data final é obrigatória'
            }
          }}
          render={({ field: { onChange,value } }) => (
            <DatePicker 
              className="w-full" 
              placeholderText="Date de final"
              onChange={onChange} 
              selected={value} 
              error={!!errors.endDate}
              errorMessage={errors.endDate?.message}
            />              
          )}         
        />     
      </div>

      <Input 
        className="mt-4" 
        type="number" 
        min={1} 
        max={trip?.maxGuests} 
        placeholder={`Número de hóspedes (max: ${trip.maxGuests})`} 
        {...register('guests', {
          required: {
            value: true,
            message: 'Número de hópedes é obrigatório'
          },
        })}
        error={!!errors.guests}
        errorMessage={errors.guests?.message}
      />

      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total: </p>
        <p className="font-medium text-sm text-primaryDarker">R$ 2.500 </p>
      </div>

      <div className="pb-10 border-b border-b-lightGray w-full">
        <Button onClick={() => handleSubmit(onSubmit)()} className="mt-3 w-full">Reservar agora</Button>
      </div>
    </div>
  )
}