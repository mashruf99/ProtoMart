"use client";

import React, { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { ProductProvider } from '@/contexts/ProductContext';

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          {children}
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default AppProviders;
