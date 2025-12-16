import Link from "next/link";

interface CaracteristicaPageProps {
  params: {
    caracteristica: string;
  };
}

export default function CaracteristicaPage({
  params,
}: CaracteristicaPageProps): JSX.Element {
  return (
    <main className="flex justify-center items-center h-screen flex-col">
      <h2 className="text-2xl font-semibold mb-6">
        {params.caracteristica}
      </h2>

      <Link href="/caracteristicas">
        <button className="px-4 py-2 bg-gray-200 rounded">
          Voltar às características
        </button>
      </Link>
    </main>
  );
}
