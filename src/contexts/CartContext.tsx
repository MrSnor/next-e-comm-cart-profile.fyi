import React, { createContext, useContext, useState, useEffect } from "react";

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
        JSON.stringify({
          ...localCart,
          ...cart,
        })
      );
    }
  }, [cart]);

  const addToCart = (productId: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
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
    setCart((prevCart) => {
      const { [productId]: _, ...rest } = prevCart;

      localStorage.setItem("cart", JSON.stringify(rest));
      return rest;
    });
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
