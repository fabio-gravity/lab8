import Image from 'next/image'
import tecnologias from '@/app/data/tecnologias.json'
import TecnologiaCard from "../components/TecnologiaCard";

export default function TecnologiasPage() {
  const lista = JSON.parse(JSON.stringify(tecnologias))

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Tecnologias Exploradas</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lista.map((tech, idx) => (
          <article
            key={idx}
            className="bg-white/80 dark:bg-slate-800 rounded-2xl p-4 shadow-md flex flex-col items-start gap-3"
          >
            <div className="flex items-center gap-4 w-full">
              <div className="w-16 h-16 flex items-center justify-center bg-white/60 rounded-lg overflow-hidden">
                <Image
                  src={`/tecnologias/${tech.image}`}
                  alt={tech.title}
                  width={64}
                  height={64}
                  quality={80}
                />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-medium">{tech.title}</h3>
                <div className="text-sm text-slate-500">{tech.description}</div>
              </div>
            </div>

            <div className="mt-2">
              <div className="text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={i < tech.rating ? 'opacity-100' : 'opacity-30'}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
