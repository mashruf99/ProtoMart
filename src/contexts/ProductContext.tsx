"use client";

import type { Product } from '@/lib/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ProductContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'imageUrl'>) => void;
  isLoading: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://dummyjson.com/products?limit=20');
        const data = await response.json();
        const formattedProducts: Product[] = data.products.map((p: any) => ({
          id: p.id.toString(),
          name: p.title,
          description: p.description,
          price: p.price,
          imageUrl: p.thumbnail,
          category: p.category,
          rating: p.rating,
          stock: p.stock,
          keywords: p.category,
          isHotDeal: p.discountPercentage > 15,
          isAd: p.tags?.includes('summer')
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'imageUrl'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      imageUrl: 'https://placehold.co/600x400.png',
    };
    setProducts(prevProducts => [newProduct, ...prevProducts]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, isLoading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
