import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../models/interfaces';

interface Props {
  produto: Product;
}

export default function ProdutoDetalhe({ produto }: Props) {
  const imageUrl = `https://deisishop.pythonanywhere.com${produto.image}`;

  return (
    <div className="container mx-auto p-6">
      {/* 🔙 Voltar */}
      <Link
        href="/produtos"
        className="inline-block mb-6 text-blue-600 hover:underline"
      >
        ← Voltar aos produtos
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full h-96">
          <Image
            src={imageUrl}
            alt={produto.title}
            fill
            className="object-contain"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">
            {produto.title}
          </h1>

          <p className="text-gray-700 mb-4">
            {produto.description}
          </p>

          <p className="text-xl font-semibold mb-2">
            € {produto.price}
          </p>

          <p className="text-gray-600">
            Categoria: {produto.category}
          </p>

          {/* ⭐ Rating */}
          <div className="mt-4">
            <p>⭐ {produto.rating.rate}</p>
            <p>{produto.rating.count} avaliações</p>
          </div>
        </div>
      </div>
    </div>
  );
}
