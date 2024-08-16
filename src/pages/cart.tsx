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
    <div className="min-h-screen bg-my-background-1000 text-cm-text">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-semibold mb-12 font-hahmlet">
          Your Shopping Cart
        </h1>
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
          <>
            <div className="space-y-6">
              {products.map((product) => {
                console.log(product);

                return (
                  <CartItem
                    key={product.id}
                    product={product}
                    quantity={cart[product.id]}
                    updateQuantity={updateQuantity}
                    removeItem={removeItem}
                  />
                );
              })}
            </div>
            <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
              <p className="text-2xl font-bold mb-4">
                Total: ${calculateTotal().toFixed(2)}
              </p>
              <button className="w-full bg-black text-[#ffd84d] px-6 py-3 rounded-full font-semibold text-xl hover:bg-[#0c0c03] transition-colors duration-300">
                Proceed to Checkout
              </button>
            </div>
          </>
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



// example jsx component
function ExampleDiv({ name, age }: { name: string; age: number }) {
  return (
    <div>
      <h1>{name}</h1>
      <h1>{age}</h1>
    </div>
  );
}
