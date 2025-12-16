'use client';

import useSWR from 'swr';
import { fetcher } from '../../lib/fetcher';
import { Product } from '../../models/interfaces';
import ProdutoDetalhe from '../../components/ProdutoDetalhe';



interface PageProps {
  params: {
    id: string;
  };
}

export default function ProdutoPage({ params }: PageProps) {
  const { id } = params;

  const { data, error, isLoading } = useSWR<Product>(
    `https://deisishop.pythonanywhere.com/products/${id}/`,
    fetcher
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center mt-10">
        Erro ao carregar produto
      </div>
    );
  }

  if (!data) return null;

  return <ProdutoDetalhe produto={data} />;
}