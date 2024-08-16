import { Product } from "@/types";
// import { TrashIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/20/solid";
import CountUp from "react-countup";

const CartItem = ({
  product,
  quantity,
  updateQuantity,
  removeItem,
}: {
  product: Product;
  quantity: number;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
}) => {
  return (
    <div className="flex items-center justify-between bg-my-accent-950 p-6 py-2 rounded-lg shadow-md hover:shadow transition">
      <div className="flex items-center space-x-6">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div>
          <h2 className="text-lg font-medium mb-1">{product.title}</h2>
          {/* cost of the product (with quantity) */}
          <p className="text-sm">
            <CountUp
              start={0}
              end={product.price * quantity}
              preserveValue
              prefix="$"
              delay={0}
            />
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4 text-my-text-300">
        <button
          onClick={() => updateQuantity(product.id, quantity - 1)}
          className="bg-my-primary-800 hover:bg-my-primary-600 transition-colors duration-300  hover:text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xl disabled:opacity-50  disabled:hover:bg-my-primary-800 disabled:hover:text-my-text-100"
          disabled={quantity === 1}
        >
          -
        </button>
        <span className="text-sm font-semibold">{quantity}</span>
        <button
          onClick={() => updateQuantity(product.id, quantity + 1)}
          className="bg-my-primary-800 hover:bg-my-primary-600 transition-colors duration-300  hover:text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xl"
        >
          +
        </button>
        <button
          onClick={() => removeItem(product.id)}
          className=" hover:text-red-500 font-semibold transition-colors duration-300"
        >
          <TrashIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
