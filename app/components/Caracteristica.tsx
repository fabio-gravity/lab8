"use client";

import Link from "next/link";

interface CaracteristicaProps {
  caracteristica: string;
}

export default function Caracteristica({
  caracteristica,
}: CaracteristicaProps) {
  return (
    <div className="m-4">
      <Link href={`/caracteristicas/${caracteristica}`}>
        <p className="text-blue-600 underline cursor-pointer">
          {caracteristica}
        </p>
      </Link>
    </div>
  );
}
