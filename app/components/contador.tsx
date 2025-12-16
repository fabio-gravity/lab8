"use client";

import { useEffect, useState } from "react";

export default function Contador() {
  const [valor, setValor] = useState(0);
  const [historico, setHistorico] = useState<number[]>([]);

  // Carregar do localStorage
  useEffect(() => {
    const valorSalvo = localStorage.getItem("contador_valor");
    const historicoSalvo = localStorage.getItem("contador_historico");

    if (valorSalvo !== null) {
      setValor(Number(valorSalvo));
    }

    if (historicoSalvo) {
      setHistorico(JSON.parse(historicoSalvo));
    }
  }, []);

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem("contador_valor", valor.toString());
    localStorage.setItem("contador_historico", JSON.stringify(historico));
  }, [valor, historico]);

  function atualizarValor(novoValor: number) {
    if (novoValor < 0 || novoValor > 10) return;

    setValor(novoValor);
    setHistorico((prev) => [...prev, novoValor]);
  }

  function incrementar() {
    atualizarValor(valor + 1);
  }

  function decrementar() {
    atualizarValor(valor - 1);
  }

  function resetar() {
    setValor(0);
    setHistorico([0]);
  }

  function corValor() {
    if (valor <= 3) return "text-red-500";
    if (valor <= 7) return "text-yellow-500";
    return "text-green-500";
  }

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md text-center space-y-4">
      <h2 className="text-xl font-semibold">Contador</h2>

      <div className={`text-5xl font-bold ${corValor()}`}>
        {valor}
      </div>

      <div className="flex justify-center gap-3">
        <button
          onClick={decrementar}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          -
        </button>

        <button
          onClick={incrementar}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          +
        </button>

        <button
          onClick={resetar}
          className="px-4 py-2 bg-red-300 rounded"
        >
          Reset
        </button>
      </div>

      <div>
        <h3 className="font-medium mt-4">Histórico</h3>
        <ul className="list-disc list-inside text-left">
          {historico.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
