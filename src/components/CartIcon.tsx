interface CartIconProps {
  itemCount: number;
}

export default function CartIcon({ itemCount }: CartIconProps) {
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <span className="absolute -top-2 -right-2 transition-all bg-my-primary-500 text-my-text-950 rounded-full w-5 h-5 aspect-square flex items-center justify-center text-xs font-bold p-2">
        {itemCount}
      </span>
    </div>
  );
}
