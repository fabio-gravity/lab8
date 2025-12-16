import { tecnologias } from "@/app/data/tecnologias";
import TecnologiaDetailsCard from "@/app/components/TecnologiaDetailsCard";
import Link from "next/link";

interface TecnologiaPageProps {
  params: {
    index: string;
  };
}

export default function TecnologiaPage({
  params,
}: TecnologiaPageProps): JSX.Element {
  const index = Number(params.index);
  const tecnologia = tecnologias[index];

  return (
    <main>
      <TecnologiaDetailsCard tecnologia={tecnologia} />

      <Link href="/tecnologias">
        <button>Voltar</button>
      </Link>
    </main>
  );
}
