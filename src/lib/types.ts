
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  stock: number;
  isHotDeal?: boolean;
  isAd?: boolean;
  keywords?: string; // For data-ai-hint
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller';
  address?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
