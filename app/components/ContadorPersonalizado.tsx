"use client";

import { useEffect, useState } from "react";

interface ContadorPersonalizadoProps {
  title: string;
}

export default function ContadorPersonalizado({
  title,
}: ContadorPersonalizadoProps) {
  const storageKey = `likes_${title}`;
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const salvo = localStorage.getItem(storageKey);
    if (salvo) {
      setLikes(Number(salvo));
    }
  }, [storageKey]);

  function adicionarLike() {
    const novoValor = likes + 1;
    setLikes(novoValor);
    localStorage.setItem(storageKey, novoValor.toString());
  }

  return (
    <button
      onClick={adicionarLike}
      className="mt-2 px-3 py-1 rounded bg-blue-600 text-white text-sm"
    >
      👍 {likes}
    </button>
  );
}
