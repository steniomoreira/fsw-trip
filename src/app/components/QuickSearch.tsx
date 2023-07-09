import Image from "next/image";

export function Quicksearch() {
  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <span className="w-full h-[1px] bg-lightGray block"></span>
        <h2 className="px-5 font-medium text-dark whitespace-nowrap">Tente pesquisar por</h2>
        <span className="w-full h-[1px] bg-lightGray block"></span>
      </div>

      <div className="flex justify-between mt-5">
        <div className="flex flex-col items-center gap-1">
          <Image src='/hotel-icon.png' width={35} height={35} alt="Hotel" />
          <p className="text-sm text-dark">Hotel</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Image src='/farm-icon.png' width={35} height={35} alt="Fazenda" />
          <p className="text-sm text-dark">Fazenda</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Image src='/cottage-icon.png' width={35} height={35} alt="Chalé" />
          <p className="text-sm text-dark">Chalé</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Image src='/inn-icon.png' width={35} height={35} alt="Pousada" />
          <p className="text-sm text-dark">Pousada</p>
        </div>
      </div>

    </div>
  )
}