"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, User, PlusCircle, LayoutGrid } from "lucide-react";
import Link from "next/link";

export default function SellerDashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'seller')) {
      router.replace('/seller/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary font-headline">Welcome, {user.name}!</h1>
            <p className="text-xl text-muted-foreground mt-2">This is your Seller Dashboard.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/profile" passHref>
                <Card className="hover:shadow-lg hover:border-primary transition-all cursor-pointer h-full">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <User className="w-8 h-8 text-primary"/>
                        <CardTitle>Manage Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>Update your personal information and seller details.</CardDescription>
                    </CardContent>
                </Card>
            </Link>

            <Link href="/seller/products/new" passHref>
                <Card className="hover:shadow-lg hover:border-primary transition-all cursor-pointer h-full">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <PlusCircle className="w-8 h-8 text-primary"/>
                        <CardTitle>Add New Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>List a new item in the marketplace for buyers to see.</CardDescription>
                    </CardContent>
                </Card>
            </Link>
            
            <Card className="hover:shadow-lg hover:border-primary transition-all cursor-pointer h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                    <LayoutGrid className="w-8 h-8 text-primary"/>
                    <CardTitle>View My Products</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>See all your listed products and manage your inventory. (Coming soon)</CardDescription>
                </CardContent>
            </Card>

        </div>
        <div className="mt-12 text-center">
            <Button asChild variant="outline">
                <Link href="/shop">Go to Buyer View</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
