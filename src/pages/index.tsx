import { useCart } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";
import CartIcon from "../components/CartIcon";
import { Product } from "../types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

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
    <div className="min-h-screen bg-my-background-1000 text-my-text-100">
      <div className="container mx-auto px-4 pb-28">
        <header className="flex justify-between items-center py-8">
          <h1 className="text-4xl font-semibold capitalize select-none font-hahmlet bg-my-background-500 text-white px-4 py-2 rounded-lg">
            D-Mart @ your service
          </h1>
          <Link
            href="/cart"
            className="origin-top-right transition p-2 rounded-full hover:bg-my-primary-500 hover:text-my-text-950 [&:hover_span]:-top-4 [&:hover_span]:-right-4"
          >
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
        <Toaster position="bottom-center" richColors />
      </div>
    </div>
  );
}
