import { useCart } from "../contexts/CartContext";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Product } from "../types";
import CartItem from "@/components/CartItem";
import CountUp from "react-countup";
import { Toaster, toast } from "sonner";

import { cn } from "@/lib/utils";
import { CheckIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { DeliveryChargeALert } from "@/components/DeliveryChargeALert";
import { DiscountAlert } from "@/components/DiscountAlert";
import { ClearCartButton } from "@/components/ClearCartButton";

// constants for discount types
const DISCOUNT_TYPES = {
  PERCENTAGE: "percentage",
  FLAT: "flat",
};

const discountData = [
  {
    code: "FIRSTME",
    discountType: DISCOUNT_TYPES.PERCENTAGE,
    discount: 50,
  },
  {
    code: "OFF20",
    discountType: DISCOUNT_TYPES.PERCENTAGE,
    discount: 20,
  },
  {
    code: "HBD26",
    discountType: DISCOUNT_TYPES.FLAT,
    discount: 200,
  },
];

export default function Cart() {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountCodeValid, setIsDiscountCodeValid] = useState<
    boolean | null
  >(null);
  const [cartSummary, setCartSummary] = useState({
    subTotal: 0,
    discount: 0,
    total: 0,
    deliveryCharge: 0,
  });

  const calculateSubtotal = (): number => {
    return products.reduce((total, product) => {
      return total + product.price * (cart[product.id] || 0);
    }, 0);
  };

  const applyDiscount = (subTotal: number, disCode: string = ""): number => {
    const discObj = discountData.find((item) => item.code === disCode);
    let discount = 0;

    if (discObj) {
      switch (discObj.discountType) {
        case DISCOUNT_TYPES.PERCENTAGE:
          discount = subTotal * (discObj.discount / 100);

          setIsDiscountCodeValid(true);
          break;
        case DISCOUNT_TYPES.FLAT:
          discount = discObj.discount;

          // handle if discount is greater than subTotal
          if (discount > subTotal) {
            discount = subTotal;
          }
          setIsDiscountCodeValid(true);
          break;
        default:
          discount = 0;
          break;
      }
    } else if (disCode !== "") {
      setIsDiscountCodeValid(false);
    }

    return discount;
  };

  const applyDeliveryCharge = (subTotal: number): number => {
    let deliveryCharge = 0;
    if (subTotal > 75) {
      deliveryCharge = 0;
    } else {
      deliveryCharge = 50;
    }

    return deliveryCharge;
  };

  const updateCartSummary = (disCode: string = "") => {
    const subTotal = calculateSubtotal();
    const discount = applyDiscount(subTotal, disCode);
    const deliveryCharge = applyDeliveryCharge(subTotal);
    const total = subTotal - discount + deliveryCharge;

    setCartSummary({ subTotal, discount, deliveryCharge, total });
  };

  // handle discount code updates
  const handleDiscountCodeKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      const code = e.currentTarget.value.trim().toUpperCase();

      const discObj = discountData.find((item) => item.code === code);

      switch (discObj?.discountType) {
        case DISCOUNT_TYPES.PERCENTAGE:
          toast.success(
            `Coupon successfully applied for ${discObj.discount}% 🎉!`
          );
          setIsDiscountCodeValid(true);
          break;

        case DISCOUNT_TYPES.FLAT:
          toast.success(
            `Coupon successfully applied for upto $${discObj.discount} 🎉!`
          );
          setIsDiscountCodeValid(true);
          break;

        default:
          toast.error("Invalid discount coupon!");
          setIsDiscountCodeValid(false);
          break;
      }

      setDiscountCode(code);
    }
  };

  const handleDiscountCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().toUpperCase() === "") {
      setDiscountCode("");
      setIsDiscountCodeValid(null);
    }
  };

  // fetch product data when the cart changes
  // (the dependency array needs to include cart) as to manage async nature of fetching and states
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

  // recalculate the cart total when products or discount code changes
  // Note - the above useEffect is triggered on every cart change, then it updates the products array which is a dependency in this useEffect (it can easily cause dependency loop and cause multiple re-renders)
  useEffect(() => {
    if (products.length > 0) {
      updateCartSummary(discountCode);
    }
  }, [products, discountCode]);

  return (
    <div className="min-h-screen bg-my-background-1000 text-my-text-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-4 sm:mb-12 flex flex-col sm:flex-row items-center gap-2 whitespace-nowrap justify-between">
          Your Shopping Cart
          {/* button for clearing the cart */}
          <ClearCartButton clearCart={clearCart} products={products} />
        </h1>
        {products.length === 0 ? (
          <div
            className={cn(
              ["flex flex-col gap-6 items-center justify-center"],
              products.length === 0
                ? "animate-in fade-in-0"
                : "animate-out fade-out-0"
            )}
          >
            <p className="text-xl">Your cart is empty.</p>
            <Link
              href="/"
              className="mt-4 inline-block text-white bg-my-primary-600 hover:bg-my-primary-500 px-6 py-2 rounded-full font-semibold transition-colors duration-300"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div
            className={cn(
              ["flex flex-col gap-16 lg:flex-row"],
              products.length === 0
                ? "animate-in fade-in-0"
                : "animate-out fade-out-0"
            )}
          >
            {/* cart items */}
            <div className="space-y-2 w-full lg:w-3/5 bg-my-accent-950 rounded-lg p-3 overflow-x-hidden max-h-[calc(100vh-10rem)] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar-thumb]:bg-my-primary-600 [&::-webkit-scrollbar-track]:bg-my-accent-950 ">
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
            <div className="w-full lg:w-2/5 space-y-5">
              {/* discounts available */}
              <DiscountAlert discountData={discountData} />
              {/* delivery charge info */}
              <DeliveryChargeALert
                deliveryCharge={cartSummary.deliveryCharge}
                subTotal={cartSummary.subTotal}
              />
              {/* cart summary */}
              <div className="mt-0 bg-my-background-500 p-4 md:p-8 rounded-lg shadow-lg h-max  text-lg">
                <h1 className="text-2xl font-semibold text-my-text-950 mb-4">
                  Cart Summary
                </h1>
                {/* Discount code input */}
                <div className="flex items-center justify-between mb-8 text-my-text-950 gap-4 relative">
                  <p className="font-normal whitespace-nowrap text-base">
                    Discount Code
                  </p>
                  <div className="relative">
                    <input
                      type="text"
                      onKeyDown={handleDiscountCodeKeyDown}
                      onChange={handleDiscountCodeChange}
                      placeholder="coupon code"
                      className="bg-my-background-900 text-my-text-100 px-2 md:px-4 py-1 rounded-full font-normal text-sm md:text-base uppercase placeholder:text-xs relative"
                      maxLength={10}
                    />
                    <span className="text-sm text-my-text-800 absolute right-1/2 translate-x-1/2 top-8 md:top-10 whitespace-nowrap">
                      (Press Enter to apply)
                    </span>
                  </div>
                  {/* show a tick or cross depending on whether or not the discount code is valid */}
                  {isDiscountCodeValid !== null && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xl rounded-full [&_svg]:rounded-full [&_svg]:w-5 [&_svg]:h-5 [&_svg]:p-1 ">
                      {isDiscountCodeValid ? (
                        <CheckIcon className="bg-green-600" />
                      ) : (
                        <XMarkIcon className="bg-red-600" />
                      )}
                    </span>
                  )}
                </div>

                {/* subtotal */}
                <p className="text-base mb-4 text-my-text-950 flex items-center justify-between">
                  Subtotal{" "}
                  <CountUp
                    start={0}
                    end={cartSummary.subTotal}
                    preserveValue
                    prefix="$"
                    className=""
                  />
                </p>

                {/* discount */}
                {
                  <p className="text-base mb-4 text-my-text-950 flex items-center justify-between">
                    Discount{" "}
                    <CountUp
                      start={0}
                      end={cartSummary.discount}
                      preserveValue
                      prefix={cartSummary.discount > 0 ? "-$" : "$"}
                      className=""
                    />
                  </p>
                }

                {/* delivery */}
                <p className="text-base mb-4 text-my-text-950 flex items-center justify-between">
                  Delivery{" "}
                  <CountUp
                    start={0}
                    end={cartSummary.deliveryCharge}
                    preserveValue
                    prefix="$"
                  />
                </p>

                {/* total */}
                <p className="mb-4 text-my-text-950 flex items-center justify-between text-xl">
                  Total{" "}
                  <CountUp
                    start={0}
                    end={cartSummary.total}
                    preserveValue
                    prefix="$"
                    className=""
                  />
                </p>

                {/* proceed to checkout button */}
                <button
                  className="w-full bg-black text-my-text-900 px-6 py-3 rounded-full font-semibold text-lg hover:bg-[#0c0c03] transition-colors duration-300"
                  onClick={() => {
                    toast.warning(
                      "Server is under construction. Thank you for your patience!"
                    );
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
        <Link
          href="/"
          className="mt-8 inline-block text-[#0c0c03] font-semibold hover:underline"
        >
          ← Continue Shopping
        </Link>
        <Toaster position="bottom-center" richColors />
      </div>
    </div>
  );
}
