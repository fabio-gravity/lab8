import MagiaDoJSX from '@/components/MagiaDoJSX/MagiaDoJSX'
import Caracteristica from "../components/Caracteristica";

const caracteristicas = [
  'JSX, sintaxe que mistura HTML e JS.',
  'Componentes, funções que retornam JSX.',
  'Componentes Reutilizáveis e Modulares.',
  'Roteamento Automático e APIs.',
  'Hooks: useState, useEffect e useSWR.',
  'Renderização Rápida e SEO Friendly.',
  'TypeScript Seguro e Escalável.',
  'Comunidade Ativa e Popularidade.'
];

export default function CaracteristicasPage() {
  return (
    <main>
      <h1>Características</h1>

      {caracteristicas.map((caracteristica, index) => (
        <Caracteristica
          key={index}
          caracteristica={caracteristica}
        />
      ))}
    </main>
  );
}
