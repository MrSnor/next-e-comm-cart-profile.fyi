import { Product } from "@/types";

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
    <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center space-x-6">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-24 h-24 object-cover rounded-lg"
        />
        <div>
          <h2 className="text-xl font-semibold mb-1">{product.title}</h2>
          <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => updateQuantity(product.id, quantity - 1)}
          className="bg-[#ffd84d] text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl"
        >
          -
        </button>
        <span className="text-xl font-semibold">{quantity}</span>
        <button
          onClick={() => updateQuantity(product.id, quantity + 1)}
          className="bg-[#ffd84d] text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl"
        >
          +
        </button>
        <button
          onClick={() => removeItem(product.id)}
          className="text-red-500 hover:text-red-700 font-semibold"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;