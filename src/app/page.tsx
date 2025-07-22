import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function RoleSelectionPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)]">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-primary font-headline">Welcome to Elysian Commerce</h1>
        <p className="text-xl text-muted-foreground mt-4">Your one-stop destination for buying and selling.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="items-center text-center">
            <ShoppingBag className="h-16 w-16 text-primary mb-4" />
            <CardTitle className="text-2xl">I am a Buyer</CardTitle>
            <CardDescription>Browse and purchase amazing products from our collection.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="items-center text-center">
            <Users className="h-16 w-16 text-accent mb-4" />
            <CardTitle className="text-2xl">I am a Seller</CardTitle>
            <CardDescription>List your products and reach thousands of customers.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/seller/dashboard">Go to Seller Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
