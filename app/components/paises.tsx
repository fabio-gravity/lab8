"use client";

import {Paises} from "@/app/data/paises.json";

interface pais {
    name: {
        official: string;
    };
    area: number;
    population: number;
}
interface paisprops{
    Paises : Paises;
}

export default function pais ({Paises} : paisprops) {
   return(
    <>
    <h2>{Paises.name.official}</h2>
    <p>{Paises.area}</p>
    <p>{Paises.population}</p>
    </>
  );
}