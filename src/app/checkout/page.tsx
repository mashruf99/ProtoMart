"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useCart } from '@/contexts/CartContext';
import { useRouter } from 'next/navigation'; // Correct import
import { useEffect } from 'react';

export default function CheckoutPage() {
  const { itemCount, getCartTotal } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (itemCount === 0) {
      router.replace('/cart'); // Use replace to avoid back button to empty checkout
    }
  }, [itemCount, router]);

  if (itemCount === 0) {
    // This state should be brief as the effect will redirect.
    // You can show a loader or minimal message.
    return (
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
        <p>Redirecting to cart...</p>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-2xl mx-auto">
        <Button variant="outline" asChild className="mb-6">
          <Link href="/cart">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
          </Link>
        </Button>
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <ShieldCheck className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <CardTitle className="text-3xl font-bold text-primary">Secure Checkout</CardTitle>
            <CardDescription>Payment gateway integration is not implemented in this scaffold.</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-lg">
              This is where the payment process would take place. For now, consider your order placed!
            </p>
            <p className="text-2xl font-semibold">
              Order Total: <span className="text-primary">${(getCartTotal() + 5.00 + getCartTotal() * 0.08).toFixed(2)}</span>
            </p>
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md text-left">
              <p className="font-bold">Thank You for Your Simulated Purchase!</p>
              <p>In a real application, you would be redirected to a payment provider or an order confirmation page.</p>
            </div>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
