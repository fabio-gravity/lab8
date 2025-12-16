'use client';

import { useEffect, useState } from 'react';

export default function Relogio() {
  const [hora, setHora] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setHora(new Date());

    const intervalo = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  function formatarHora(data: Date) {
    return data.toLocaleTimeString('pt-PT');
  }

  // 👇 evita erro de hidratação
  if (!mounted || !hora) return null;

  return <span>{formatarHora(hora)}</span>;
}
