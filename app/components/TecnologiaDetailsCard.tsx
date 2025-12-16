"use client";

import { Tecnologia } from "@/app/data/tecnologias";
import ContadorPersonalizado from "./ContadorPersonalizado";

interface TecnologiaDetailsCardProps {
  tecnologia: Tecnologia;
}

export default function TecnologiaDetailsCard({
  tecnologia,
}: TecnologiaDetailsCardProps) {
  return (
    <div className="tecnologia-card">
      <img src={tecnologia.image} alt={tecnologia.title} />
      <h2>{tecnologia.title}</h2>
      <p>{tecnologia.description}</p>
      <p>Rating: {tecnologia.rating}</p>

      <ContadorPersonalizado title={tecnologia.title} />
    </div>
  );
}
