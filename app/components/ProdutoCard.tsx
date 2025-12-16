import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../models/interfaces';

interface Props {
  produto: Product;
  onAddToCart?: (produto: Product) => void;
  onRemoveFromCart?: (id: number) => void;
}

export default function ProdutoCard({
  produto,
  onAddToCart,
  onRemoveFromCart,
}: Props) {
  const imageUrl = `https://deisishop.pythonanywhere.com${produto.image}`;

  return (
    <div className="border rounded-lg p-4 shadow flex flex-col">
      <div className="relative w-full h-40 mb-4">
        <Image
          src={imageUrl}
          alt={produto.title}
          fill
          className="object-contain"
        />
      </div>

      <h2 className="font-semibold text-lg mb-2">
        {produto.title}
      </h2>

      <p className="text-gray-600 mb-4">
        € {produto.price}
      </p>

      <Link
        href={`/produtos/${produto.id}`}
        className="text-blue-600 underline mb-3"
      >
        + info
      </Link>

      {/* BOTÃO ADICIONAR */}
      {onAddToCart && (
        <button
          type="button"
          onClick={() => onAddToCart(produto)}
          className="bg-green-600 text-white py-2 rounded hover:bg-green-700 mt-auto"
        >
          Adicionar ao carrinho
        </button>
      )}

      {/* BOTÃO REMOVER */}
      {onRemoveFromCart && (
        <button
          type="button"
          onClick={() => onRemoveFromCart(produto.id)}
          className="bg-red-600 text-white py-2 rounded hover:bg-red-700 mt-auto"
        >
          Remover do carrinho
        </button>
      )}
    </div>
  );
}
