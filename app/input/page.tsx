"use client";

import { useState } from "react";

export default function InputPage() {
  // INPUT DE TEXTO
  const [texto, setTexto] = useState("");

  // SELECTOR
  const [categoria, setCategoria] = useState("React");

  // LISTA DE TAREFAS
  const [tarefa, setTarefa] = useState("");
  const [tarefas, setTarefas] = useState<string[]>([]);
  const [editandoIndex, setEditandoIndex] = useState<number | null>(null);

  function adicionarTarefa() {
    if (!tarefa.trim()) return;

    if (editandoIndex !== null) {
      const novasTarefas = [...tarefas];
      novasTarefas[editandoIndex] = tarefa;
      setTarefas(novasTarefas);
      setEditandoIndex(null);
    } else {
      setTarefas([...tarefas, tarefa]);
    }

    setTarefa("");
  }

  function editarTarefa(index: number) {
    setTarefa(tarefas[index]);
    setEditandoIndex(index);
  }

  function apagarTarefa(index: number) {
    setTarefas(tarefas.filter((_, i) => i !== index));
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Página Input</h1>

      {/* INPUT DE TEXTO */}
      <div>
        <label className="block font-medium">Texto</label>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <p className="mt-2 text-gray-600">
          Texto digitado: <strong>{texto}</strong>
        </p>
      </div>

      {/* SELECTOR */}
      <div>
        <label className="block font-medium">Tecnologia</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="border p-2 w-full rounded"
        >
          <option>React</option>
          <option>Next.js</option>
          <option>TypeScript</option>
          <option>Tailwind</option>
        </select>
        <p className="mt-2 text-gray-600">
          Selecionado: <strong>{categoria}</strong>
        </p>
      </div>

      {/* LISTA DE TAREFAS */}
      <div>
        <label className="block font-medium">Nova tarefa</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={tarefa}
            onChange={(e) => setTarefa(e.target.value)}
            className="border p-2 flex-1 rounded"
          />
          <button
            onClick={adicionarTarefa}
            className="bg-blue-600 text-white px-4 rounded"
          >
            {editandoIndex !== null ? "Salvar" : "Adicionar"}
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          {tarefas.map((t, index) => (
            <li
              key={index}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>{t}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => editarTarefa(index)}
                  className="text-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => apagarTarefa(index)}
                  className="text-red-600"
                >
                  Apagar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
