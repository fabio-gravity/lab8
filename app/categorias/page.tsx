import Link from "next/link";
import produtos from "@/app/data/produtos.json";

export default function CategoriasPage() {
  const categorias = Array.from(
    new Set(produtos.map((p) => p.category))
  );

  return (
    <div>
      <h1>Categorias</h1>

      <ul>
        {categorias.map((cat) => (
          <li key={cat}>
            <Link href={`/categorias/${cat}`}>
              {cat}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
