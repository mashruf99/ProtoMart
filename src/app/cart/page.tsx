"use client";

import CartItemDisplay from "@/components/cart/CartItem"; // Renamed import
import CartSummary from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, clearCart, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] text-center">
        <ShoppingBag className="h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-4 text-primary">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary font-headline">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-lg rounded-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl">Cart Items ({itemCount})</CardTitle>
              <Button variant="outline" onClick={clearCart} disabled={itemCount === 0} className="text-destructive hover:bg-destructive/10 border-destructive hover:border-destructive/50">
                <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
              </Button>
            </CardHeader>
            <CardContent className="divide-y">
              {cartItems.map(item => (
                <CartItemDisplay key={item.id} item={item} />
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
