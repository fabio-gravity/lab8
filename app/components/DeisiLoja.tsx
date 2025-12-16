import Link from "next/link";
import produtos from "@/app/data/produtos.json";

export default function DeisiLoja() {
  return (
    <section>
      <h2>DEISIshop</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {produtos.map((produto) => (
          <div
            key={produto.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
            }}
          >
            <Link href={`/produtos/${produto.id}`}>
              <img
                src={produto.image}
                alt={produto.title}
                width={180}
              />
              <h3>{produto.title}</h3>
            </Link>

            <p>{produto.price} €</p>
            <p>{produto.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
