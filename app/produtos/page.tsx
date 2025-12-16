'use client';

import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { Product } from '../models/interfaces';
import { fetcher } from '../lib/fetcher';
import ProdutoCard from '../components/ProdutoCard';

const API_URL = 'https://deisishop.pythonanywhere.com/products/';
const BUY_URL = 'https://deisishop.pythonanywhere.com/api/deisishop/buy/';

export default function ProdutosPage() {
  // 🔹 Produtos
  const { data, error, isLoading } = useSWR<Product[]>(API_URL, fetcher);

  // 🔹 Estados
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [isStudent, setIsStudent] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [buyResponse, setBuyResponse] = useState<any>(null);

  // 🔹 Ler carrinho
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // 🔹 Guardar carrinho
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // 🔹 Inicializar lista
  useEffect(() => {
    if (data) setFilteredData(data);
  }, [data]);

  // 🔹 Carrinho
  const addToCart = (produto: Product) => {
    setCart((prev) => [...prev, produto]);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) =>
      prev.filter((p) => Number(p.id) !== Number(id))
    );
  };

  // 🔹 Total
  const total = cart.reduce(
    (sum, produto) => sum + Number(produto.price),
    0
  );

  // 🔹 COMPRAR (código baseado no exemplo fornecido)
  const buy = () => {
    fetch(BUY_URL, {
      method: 'POST',
      body: JSON.stringify({
        products: cart.map((product) => product.id),
        name: 'Cliente',
        student: isStudent,
        coupon: coupon,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        setBuyResponse(response);
        setCart([]);
        localStorage.removeItem('cart');
      })
      .catch(() => {
        setBuyResponse({ error: 'Erro ao comprar' });
      });
  };

  // 🔹 Loading / erro
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Erro ao carregar produtos</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Produtos</h1>

      {/* 🛍️ Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredData.map((produto) => (
          <ProdutoCard
            key={produto.id}
            produto={produto}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      {/* 🛒 Carrinho */}
      <h2 className="text-2xl font-bold mt-10 mb-4">Carrinho</h2>

      {cart.length === 0 && <p>Carrinho vazio</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cart.map((produto) => (
          <ProdutoCard
            key={produto.id}
            produto={produto}
            onRemoveFromCart={removeFromCart}
          />
        ))}
      </div>

      {cart.length > 0 && (
        <>
          {/* 💰 Total */}
          <p className="text-xl font-semibold mt-4">
            Total: € {total.toFixed(2)}
          </p>

          {/* 🎓 Estudante */}
          <label className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              checked={isStudent}
              onChange={(e) => setIsStudent(e.target.checked)}
            />
            Estudante DEISI
          </label>

          {/* 🎟️ Cupão */}
          <input
            type="text"
            placeholder="Cupão de desconto"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="border p-2 rounded w-full mt-4"
          />

          {/* 🛍️ Comprar */}
          <button
            onClick={buy}
            className="bg-blue-600 text-white py-3 px-6 rounded mt-6 hover:bg-blue-700"
          >
            Comprar
          </button>
        </>
      )}

      {/* 📩 Resposta da API */}
      {buyResponse && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h3 className="font-bold mb-2">Resposta da compra:</h3>
          <pre>{JSON.stringify(buyResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}