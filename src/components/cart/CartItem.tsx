"use client";

import Image from 'next/image';
import type { CartItem as CartItemType } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

interface CartItemProps {
  item: CartItemType;
}

const CartItemDisplay = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="flex items-center space-x-4 py-4 border-b">
      <Link href={`/products/${item.id}`} passHref>
        <div className="w-20 h-20 relative rounded-md overflow-hidden cursor-pointer">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover"
            data-ai-hint={item.keywords || item.category.toLowerCase()}
          />
        </div>
      </Link>
      <div className="flex-grow">
        <Link href={`/products/${item.id}`} passHref>
          <h3 className="font-semibold text-md hover:text-primary transition-colors cursor-pointer">{item.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.quantity - 1)} aria-label="Decrease quantity">
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
          className="h-8 w-12 text-center hide-arrows"
          min="1"
          aria-label="Item quantity"
        />
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.quantity + 1)} aria-label="Increase quantity">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <p className="font-semibold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} aria-label="Remove item from cart">
        <X className="h-5 w-5 text-destructive" />
      </Button>
      <style jsx global>{`
        .hide-arrows::-webkit-outer-spin-button,
        .hide-arrows::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .hide-arrows[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
};

export default CartItemDisplay; // Renamed to avoid conflict if CartItem type exists here
