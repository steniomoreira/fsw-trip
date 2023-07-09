"use client"

import Button from "@/components/Button";
import CurrencyInput from "@/components/CurrencyInput";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";

export function TripSearch() {
  return (
    <div className="container mx-auto p-5 bg-search-background bg-cover bg-no-repeat">
      <h1 className="font-semibold text-2xl text-primaryDarker text-center">
        Encontre sua próxima <span className="text-primary">viagem!</span>
      </h1>

      <div className="flex flex-col gap-4 mt-5">
        <Input placeholder="Onde você quer ir?" />

        <div className="flex gap-4">
          <DatePicker className="w-full" placeholderText="Data de ida" onChange={() => {}} />
          <CurrencyInput className="w-full" placeholder="Orçamento" />
        </div>

        <Button>Pesquisar</Button>
      </div>
    </div>
  )
}