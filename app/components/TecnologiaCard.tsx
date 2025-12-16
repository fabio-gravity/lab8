"use client";

import Link from "next/link";
import ContadorPersonalizado from "./ContadorPersonalizado";


interface TecnologiaCardProps {
  title: string;
  image: string;
  index: number;
}

export default function TecnologiaCard({
  title,
  image,
  index,
}: TecnologiaCardProps) {
  return (
    <Link href={`/tecnologias/${index}`}>
      <div
        className="
          w-48 h-56
          bg-white
          rounded-xl
          shadow-md
          p-4
          m-4
          flex flex-col
          items-center
          justify-center
          cursor-pointer
        "
      >
        <img
          src={image}
          alt={title}
          className="w-20 h-20 object-contain mb-4"
        />

        <h3 className="text-lg font-semibold text-gray-800 text-center">
          {title}
        </h3>
        <ContadorPersonalizado title={title} />

      </div>
    </Link>
  );
}
