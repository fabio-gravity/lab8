'use client';

import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { Product } from '../models/interfaces';
import { fetcher } from '../lib/fetcher';
import ProdutoCard from '../components/ProdutoCard';

const API_URL = 'https://deisishop.pythonanywhere.com/products/';
const BUY_URL = 'https://deisishop.pythonanywhere.com/api/deisishop/buy/';
const STORAGE_KEY = 'cart';

type CartItem = Product & { quantity: number };

export default function ProdutosPage() {
  const { data, error, isLoading } = useSWR<Product[]>(API_URL, fetcher);

  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isStudent, setIsStudent] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [buyResponse, setBuyResponse] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return;

      const normalized: CartItem[] = parsed.map((item: any) => ({
        ...item,
        quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1,
      }));

      setCart(normalized);
    } catch {
      setCart([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (data) setFilteredData(data);
  }, [data]);

  const addToCart = (produto: Product) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => Number(p.id) === Number(produto.id));
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + 1 };
        return next;
      }
      return [...prev, { ...produto, quantity: 1 }];
    });
  };

  const increaseQty = (id: number) => {
    setCart((prev) =>
      prev.map((p) =>
        Number(p.id) === Number(id)
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    );
  };

  const decreaseQty = (id: number) => {
    setCart((prev) =>
      prev
        .map((p) =>
          Number(p.id) === Number(id)
            ? { ...p, quantity: p.quantity - 1 }
            : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => Number(p.id) !== Number(id)));
  };

  const total = cart.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
    0
  );

  const buildProductsPayload = (items: CartItem[]) => {
    const arr: number[] = [];
    items.forEach((it) => {
      for (let i = 0; i < it.quantity; i++) {
        arr.push(Number(it.id));
      }
    });
    return arr;
  };

  const buy = async () => {
    if (!cart.length) {
      setBuyResponse({ error: 'Carrinho vazio' });
      return;
    }

    try {
      const res = await fetch(BUY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: buildProductsPayload(cart),
          name: 'Cliente',
          student: isStudent,
          coupon: coupon || '',
        }),
      });

      const dataResp = await res.json();

      if (!res.ok) {
        setBuyResponse(dataResp);
        return;
      }

      setBuyResponse(dataResp);
      setCart([]);
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      setBuyResponse({ error: 'Erro de ligação ao servidor' });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Erro ao carregar produtos</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Produtos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredData.map((produto) => (
          <ProdutoCard
            key={produto.id}
            produto={produto}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4">Carrinho</h2>

      {cart.length === 0 && <p>Carrinho vazio</p>}

      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="border rounded p-4">
            <h3 className="font-semibold">{item.title}</h3>
            <p>€ {Number(item.price).toFixed(2)} cada</p>
            <p>
              Subtotal: €{' '}
              {(Number(item.price) * item.quantity).toFixed(2)}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => decreaseQty(Number(item.id))}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span className="px-3">{item.quantity}</span>
              <button
                onClick={() => increaseQty(Number(item.id))}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(Number(item.id))}
                className="ml-4 px-3 py-1 bg-red-600 text-white rounded"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <>
          <p className="text-xl font-semibold mt-4">
            Total: € {total.toFixed(2)}
          </p>

          <label className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              checked={isStudent}
              onChange={(e) => setIsStudent(e.target.checked)}
            />
            Estudante DEISI
          </label>

          <input
            type="text"
            placeholder="Cupão de desconto"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="border p-2 rounded w-full mt-4"
          />

          <button
            onClick={buy}
            className="bg-blue-600 text-white py-3 px-6 rounded mt-6 hover:bg-blue-700"
          >
            Comprar
          </button>
        </>
      )}

      {buyResponse && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h3 className="font-bold mb-2">Resposta da compra:</h3>
          <pre>{JSON.stringify(buyResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
