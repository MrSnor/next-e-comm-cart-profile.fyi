import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  addToCart: (productId: number) => void;
}

const currencySymbol = "$";

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <div
      className="bg-cm-primary/10 rounded-lg overflow-hidden transform transition-all duration-300 ring-2 ring-transparent hover:ring-black/40 
    [&:hover_button[aria-label=add-to-cart]]:ring-0"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-contain"
      />
      <div className="p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-2 truncate">{product.title}</h2>
        <p className="text-lg font-normal mb-4">
          {currencySymbol}
          {product.price.toFixed(2)}
        </p>
        <button
          type="button"
          aria-label="add-to-cart"
          onClick={() => addToCart(product.id)}
          className="relative group mx-auto w-[40%] hover:w-full ring-1 ring-black/70 bg-black/10 text-black hover:text-cm-background px-4 py-2 rounded-full font-semibold hover:bg-cm-primary transition-all duration-300"
        >
          Add to Cart
          <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
      </div>
    </div>
  );
}
