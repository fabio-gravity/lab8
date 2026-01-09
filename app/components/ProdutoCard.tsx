'use client';

import Image from 'next/image';
import { useState } from 'react';
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
  const [open, setOpen] = useState(false);
  const imageUrl = `https://deisishop.pythonanywhere.com${produto.image}`;

  return (
    <>
      <div className="border rounded-lg p-4 shadow flex flex-col">
        <div className="relative w-full h-40 mb-4">
          <Image src={imageUrl} alt={produto.title} fill className="object-contain" />
        </div>

        <h2 className="font-semibold text-lg mb-2">{produto.title}</h2>
        <p className="text-gray-600 mb-4">€ {produto.price}</p>

        <button
          onClick={() => setOpen(true)}
          className="text-blue-600 underline mb-3 text-left"
        >
          + info
        </button>

        {onAddToCart && (
          <button
            onClick={() => onAddToCart(produto)}
            className="bg-green-600 text-white py-2 rounded mt-auto"
          >
            Adicionar ao carrinho
          </button>
        )}

        {onRemoveFromCart && (
          <button
            onClick={() => onRemoveFromCart(produto.id)}
            className="bg-red-600 text-white py-2 rounded mt-auto"
          >
            Remover do carrinho
          </button>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded max-w-md w-full">
            <h3 className="text-xl font-bold mb-3">{produto.title}</h3>
            <p className="mb-4">{produto.description}</p>
            <p className="font-semibold mb-4">€ {produto.price}</p>
            <button
              onClick={() => setOpen(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
