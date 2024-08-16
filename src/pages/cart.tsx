import { useCart } from "../contexts/CartContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Product } from "../types";
import CartItem from "@/components/CartItem";

export default function Cart() {
  const { cart, updateQuantity, removeItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const productIds = Object.keys(cart).join(",");
    if (productIds !== "") {
      fetch(`https://dummyjson.com/products?select=title,price,id,thumbnail`)
        .then((res) => res.json())
        .then((data) => {
          const filteredProducts = data.products.filter((product: Product) =>
            productIds.includes(product.id.toString())
          );

          setProducts(filteredProducts);
        });
    } else {
      setProducts([]);
    }
  }, [cart]);

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      return total + product.price * (cart[product.id] || 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-my-background-1000 text-my-text-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-semibold mb-12">Your Shopping Cart</h1>
        {products.length === 0 ? (
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <p className="text-xl">Your cart is empty.</p>
            <Link
              href="/"
              className="mt-4 inline-block text-[#ffd84d] bg-black px-6 py-2 rounded-full font-semibold hover:bg-[#0c0c03] transition-colors duration-300"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex gap-16">
            <div className="space-y-6 w-2/3">
              {products.map((product) => {
                const quantity = cart[product.id];

                return (
                  <CartItem
                    key={product.id}
                    product={product}
                    quantity={quantity}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                );
              })}
            </div>
            <div className="mt-0 bg-my-background-500 p-8 rounded-lg shadow-lg w-1/3 h-max">
              <p className="text-2xl font-normal mb-4 text-my-text-950">
                Total: ${calculateTotal().toFixed(2)}
              </p>
              <button className="w-full bg-black text-my-text-900 px-6 py-3 rounded-full font-semibold text-xl hover:bg-[#0c0c03] transition-colors duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
        <Link
          href="/"
          className="mt-8 inline-block text-[#0c0c03] font-semibold hover:underline"
        >
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
}
