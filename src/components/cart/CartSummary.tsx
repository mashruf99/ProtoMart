"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation';
import { CreditCard } from 'lucide-react';

const CartSummary = () => {
  const { getCartTotal, itemCount } = useCart();
  const router = useRouter();

  const subtotal = getCartTotal();
  // These are placeholders, replace with actual calculations if needed
  const shipping = subtotal > 0 ? 5.00 : 0; 
  const tax = subtotal * 0.08; // Example 8% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    router.push('/checkout');
  };

  return (
    <Card className="shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal ({itemCount} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Estimated Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between font-bold text-xl text-primary">
          <span>Order Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCheckout} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg" disabled={itemCount === 0}>
          <CreditCard className="mr-2 h-5 w-5" /> Proceed to Checkout
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartSummary;
