"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface Product {
  productId: string;
  name: string;
  slug: string;
  imageUrl?: string;
  quantity: number;
}

interface CheckoutContextType {
  checkoutProducts: Product[];
  isLoading: boolean;
  addToCheckout: (
    product: Omit<Product, "quantity"> | Omit<Product, "quantity">[]
  ) => void;

  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCheckout: (productId: string) => void;
  clearCheckout: () => void;
  getProduct: (productId: string) => Product | undefined;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const STORAGE_KEY = "checkout_products";

  const [checkoutProducts, setCheckoutProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && typeof saved === "string") {
        try {
          setCheckoutProducts(JSON.parse(saved));
        } catch (error) {
          console.error("Failed to parse localStorage data:", error);
          setCheckoutProducts([]);
        }
      }
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checkoutProducts));
    }
  }, [checkoutProducts]);

  // Add product(s) to checkout
  const addToCheckout = useCallback(
    (input: Omit<Product, "quantity"> | Omit<Product, "quantity">[]) => {
      setCheckoutProducts((prev) => {
        // Handle single product
        if (!Array.isArray(input)) {
          const existingProduct = prev.find(
            (p) => p.productId === input.productId
          );
          if (existingProduct) {
            return prev.map((p) =>
              p.productId === input.productId
                ? { ...p, quantity: p.quantity + 1 }
                : p
            );
          }
          return [...prev, { ...input, quantity: 1 }];
        }

        // Handle array of products
        let updatedProducts = [...prev];
        input.forEach((product) => {
          const existingProduct = updatedProducts.find(
            (p) => p.productId === product.productId
          );
          if (existingProduct) {
            updatedProducts = updatedProducts.map((p) =>
              p.productId === product.productId
                ? { ...p, quantity: p.quantity + 1 }
                : p
            );
          } else {
            updatedProducts = [...updatedProducts, { ...product, quantity: 1 }];
          }
        });
        return updatedProducts;
      });
    },
    []
  );

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCheckout(productId);
      return;
    }

    setCheckoutProducts((prev) =>
      prev.map((p) => (p.productId === productId ? { ...p, quantity } : p))
    );
  }, []);

  const removeFromCheckout = useCallback((productId: string) => {
    setCheckoutProducts((prev) =>
      prev.filter((p) => p.productId !== productId)
    );
  }, []);

  const clearCheckout = useCallback(() => {
    setCheckoutProducts([]);
  }, []);

  const getProduct = useCallback(
    (productId: string): Product | undefined => {
      return checkoutProducts.find((p) => p.productId === productId);
    },
    [checkoutProducts]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        const newData = event.newValue ? JSON.parse(event.newValue) : [];
        setCheckoutProducts(newData);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  return (
    <CheckoutContext.Provider
      value={{
        checkoutProducts,
        isLoading,
        addToCheckout,
        updateQuantity,
        removeFromCheckout,
        clearCheckout,
        getProduct,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};
