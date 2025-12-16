import paises from "@/app/data/paises.json";
import Pais from "@/app/components/paises";

export default function PaisesPage() {
    return (
        <>
        {paises.map((pais, index) => (
            <Pais key={index} Paises={pais} />
        ))}
        </>
    );

}
