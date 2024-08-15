import { useCart } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";
import CartIcon from "../components/CartIcon";
import { Product } from "../types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { cart, addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(
      "https://dummyjson.com/products?limit=20&select=title,price,id,thumbnail"
    )
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <div className="min-h-screen bg-cm-background text-cm-text">
      <div className="container mx-auto px-4">
        <header className="flex justify-between items-center py-8">
          <h1 className="text-4xl font-bold capitalize select-none">
            D-Mart @ your service
          </h1>
          <Link href="/cart" className="hover:scale-110 transition">
            <CartIcon
              itemCount={Object.values(cart).reduce((a, b) => a + b, 0)}
            />
          </Link>
        </header>
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
