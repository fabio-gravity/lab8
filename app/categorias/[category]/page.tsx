import produtos from "@/app/data/produtos.json";

export default function CategoriaPage({ params }: any) {
  const produtosCategoria = produtos.filter(
    (p) => p.category === params.category
  );

  return (
    <div>
      <h1>Categoria: {params.category}</h1>

      <ul>
        {produtosCategoria.map((p) => (
          <li key={p.id}>
            <img src={p.image} alt={p.title} width={120} />
            <p>{p.title}</p>
            <p>{p.price} €</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
