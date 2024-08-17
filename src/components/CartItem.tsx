import { Product } from "@/types";
// import { TrashIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/20/solid";
import CountUp from "react-countup";
import { Transition } from "@headlessui/react";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
    <Transition show={quantity > 0} appear>
      <div
        className={cn([
          // Base styles
          "flex items-center justify-between bg-white p-6 py-2 rounded-lg shadow-md hover:shadow transition ease-in-out duration-300",
          // Shared closed styles
          "data-[closed]:opacity-0",
          // Entering styles
          "data-[enter]:duration-100 data-[enter]:data-[closed]:translate-x-full",
          // Leaving styles
          "data-[leave]:duration-300 data-[leave]:data-[closed]:translate-x-full",
        ])}
      >
        <div className="flex items-center space-x-6">
          <Image
            src={product.thumbnail}
            alt={product.title}
            className="w-16 h-16 object-cover rounded-lg"
            width={64}
            height={64}
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
    </Transition>
  );
};

export default CartItem;
