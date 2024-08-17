import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Product } from "@/types";

export function ClearCartButton({
  clearCart,
  products,
}: {
  clearCart: () => void;
  products: Product[];
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="ml-auto w-max bg-my-background-100 hover:bg-red-500 text-my-text-900 hover:text-white px-4 py-2 rounded-full font-semibold text-base transition-colors duration-300 disabled:opacity-50 disabled:cursor-default disabled:hover:bg-my-background-100 disabled:hover:text-my-text-900"
          disabled={products.length === 0}
        >
          Clear Cart
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear Cart</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to clear your cart?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-my-background-100 text-my-text-100 hover:text-my-text-950 px-6 py-2 rounded-full font-semibold transition-colors duration-300">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={clearCart}
            className="bg-my-primary-600 hover:bg-my-primary-500 px-6 py-2 rounded-full font-semibold transition-colors duration-300"
          >
            Clear
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
