"use client";

interface ProjetoProps {
  nome: string;
  url: string;
}

function Projeto({ nome, url }: ProjetoProps) {
  return (
    <p>
      O projeto <strong>{nome}</strong> pode ser consultado em{" "}
      <a href={url} target="_blank" rel="noopener noreferrer">
        este link
      </a>.
    </p>
  );
}

function DescricaoProjetos() {
  return (
    <section>
      <p>
        Ao longo do curso desenvolvi vários projetos utilizando JavaScript,
        React e Next.js.
      </p>

      <Projeto
        nome="Loja Online"
        url="https://fabio-gravity.github.io/loja"
      />

      <Projeto
        nome="Site com JavaScript Interativo"
        url="https://fabio-gravity.github.io/site-js"
      />

      {/* Projetos adicionais (opcional) */}
      <Projeto
        nome="Outro Projeto"
        url="https://fabio-gravity.github.io/outro"
      />
    </section>
  );
}

export default function ProjetosPage() {
  return (
    <main>
      <h1>Projetos</h1>
      <DescricaoProjetos />
    </main>
  );
}
