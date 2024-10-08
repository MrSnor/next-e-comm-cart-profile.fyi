import { useEffect, useState } from "react";
import { Product } from "../types";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  addToCart: (productId: number) => void;
}

const currencySymbol = "$";

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  // get cart value
  const { cart } = useCart();

  // check if product is in cart using useEffect
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    setIsInCart(Object.keys(cart).includes(product.id.toString()));
  }, [cart, product.id]);

  return (
    <div
      className="bg-my-accent-950 rounded-lg overflow-hidden transform transition-all duration-300 ring-2 ring-transparent hover:ring-my-accent-700
    [&:hover_button[aria-label=add-to-cart]]:ring-transparent"
    >
      <Image
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-contain"
        width={300}
        height={300}
      />
      <div className="p-6 flex flex-col">
        <h2 className="text-lg font-semibold mb-2 truncate">{product.title}</h2>
        <p className="text-sm font-normal mb-4">
          {currencySymbol}
          {product.price.toFixed(2)}
        </p>
        {isInCart ? (
          <AddedToCartButton />
        ) : (
          <AddToCartButton addToCart={addToCart} product={product} />
        )}
      </div>
    </div>
  );
}

const AddToCartButton = ({
  addToCart,
  product,
}: {
  addToCart: (productId: number) => void;
  product: Product;
}) => {
  return (
    <button
      type="button"
      aria-label="add-to-cart"
      onClick={() => addToCart(product.id)}
      className="relative group mx-auto w-[40%] hover:w-full ring-[1.5px] ring-my-accent-800 bg-my-background-800 text-my-text-100 text-sm hover:text-my-text-950 px-4 py-2 rounded-full font-semibold hover:bg-my-background-600 transition-all duration-300 text-nowrap whitespace-nowrap"
    >
      Add to Cart
      <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>
    </button>
  );
};

const AddedToCartButton = () => {
  return (
    <button className="relative group mx-auto text-center w-full ring-[1.5px] ring-my-accent-800 bg-my-background-800  text-sm  px-4 py-2 rounded-full font-semibold transition-all duration-300 text-my-text-950 opacity-60 cursor-default text-nowrap whitespace-nowrap">
      Added to Cart
    </button>
  );
};
