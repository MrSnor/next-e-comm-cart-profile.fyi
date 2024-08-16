import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface CartContextType {
  cart: { [key: number]: number };
  addToCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  // check if localStorage is not undefined
  if (typeof window !== "undefined") {
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart =
        localStorage.getItem("cart") === null
          ? "{}"
          : (localStorage.getItem("cart") as string);

      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localCart = JSON.parse(localStorage.getItem("cart") as string);

      localStorage.setItem(
        "cart",
        // by having "cart" before "localCart", it will prevent adding existing products when clicked on "Add to cart"
        JSON.stringify({
          ...cart,
          ...localCart,
        })
      );
    }
  }, [cart]);

  const addToCart = (productId: number) => {
    try {
      setCart((prevCart) => ({
        ...prevCart,
        [productId]: (prevCart[productId] || 0) + 1,
      }));
      toast.success("Product added to cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product to cart");
    }
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (quantity <= 0) {
        // filter out the product
        const filteredCart = Object.fromEntries(
          Object.entries(updatedCart).filter(
            ([key]) => key !== productId.toString()
          )
        );

        localStorage.setItem("cart", JSON.stringify(filteredCart));
        return filteredCart;
      } else {
        const newCart = {
          ...updatedCart,
          [productId]: quantity,
        };

        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      }
    });
  };

  const removeItem = (productId: number) => {
    try {
      setCart((prevCart) => {
        const { [productId]: _, ...rest } = prevCart;

        localStorage.setItem("cart", JSON.stringify(rest));
        return rest;
      });

      toast.success("Product removed from cart");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product from cart");
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
