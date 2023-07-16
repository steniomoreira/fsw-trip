"use client"

import Button from "@/components/Button";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { add, differenceInDays } from "date-fns";
import { useRouter } from "next/navigation";

interface TripReservationProps {
  tripId: string,
  tripStartDate: Date,
  tripEndData: Date,
  maxGuests: number
  pricePerDay: number
}

interface TripReservationForm {
  guests: number
  startDate: Date | null
  endDate: Date | null
}

export function TripReservation({ tripId, tripStartDate, tripEndData, maxGuests, pricePerDay }: TripReservationProps) {  
  const router = useRouter()

  const {register, handleSubmit, control, watch, setError, formState: {
    errors
  }} = useForm<TripReservationForm>();

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  async function onSubmit(data: TripReservationForm) {
    const { startDate, endDate, guests } = data;

    const response = await fetch('http://localhost:3000/api/trips/check', {
      method: 'POST',
      body: Buffer.from(JSON.stringify(
        {
          startDate,
          endDate,
          tripId,
        }
      ))
    });

    const res = await response.json()
    
    if ( res?.error?.code === 'TRIP_ALREADY_RESERVED'){
        setError('startDate', {
        type: 'manual',
        message: 'Esta data já está reservada'
      });

      return setError('endDate', {
        type: 'manual',
        message: 'Esta data já está reservada'
      });
    }

    if ( res?.error?.code === 'INVALID_START_DATE'){
      return setError('startDate', {
        type: 'manual',
        message: 'Data inválida'
      });
    } 

    if ( res?.error?.code === 'INVALID_END_DATE'){
      return setError('endDate', {
        type: 'manual',
        message: 'Data inválida'
      });
    }

    router.push(`
      /trips/${tripId}/confirmation?startDate=${startDate?.toISOString()}&endDate=${endDate?.toISOString()}&guests=${guests}
    `)
  }

  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-4">
        <Controller 
          name='startDate'
          control={control}
          rules={{
            required: 'Data inicial é obrigatória'
          }}
          render={({ field: { onChange,value } }) => (
            <DatePicker 
              className="w-full" 
              placeholderText="Date de início"
              onChange={onChange} 
              selected={value} 
              error={!!errors.startDate}
              errorMessage={errors.startDate?.message}
              minDate={tripStartDate}
            />              
          )}         
        />

        <Controller 
          name='endDate'
          control={control}
          rules={{
            required: 'Data final é obrigatória',            
          }}

          render={({ field: { onChange,value } }) => (
            <DatePicker 
              className="w-full" 
              placeholderText="Date de final"
              onChange={onChange} 
              selected={value} 
              error={!!errors.endDate}
              errorMessage={errors.endDate?.message}
              maxDate={tripEndData}
              minDate={(add(startDate ?? tripStartDate, {days: 1}))}
            />              
          )}         
        />     
      </div>

      <Input 
        className="mt-4" 
        type="number" 
        min={1} 
        max={maxGuests} 
        placeholder={`Número de hóspedes (max: ${maxGuests})`} 
        {...register('guests', {
          required: 'Número de hóspedes é obrigatório',
          max: {
            value: maxGuests,
            message: `Máximo de ${maxGuests} hóspedes`
          }
        })}
        error={!!errors.guests}
        errorMessage={errors.guests?.message}
      />

      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total: </p>
        <p className="font-medium text-sm text-primaryDarker">
          {startDate && endDate ? `R$ ${differenceInDays(endDate, startDate) * pricePerDay}` : 'R$ 0,00'}
        </p>
      </div>

      <div className="pb-10 border-b border-b-lightGray w-full">
        <Button onClick={() => handleSubmit(onSubmit)()} className="mt-3 w-full">Reservar agora</Button>
      </div>
    </div>
  )
}