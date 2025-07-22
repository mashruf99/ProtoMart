"use client";

import { ProductForm } from "@/components/seller/ProductForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewProductPage() {
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
        <div className="max-w-2xl mx-auto">
            <Button variant="outline" asChild className="mb-6">
                <Link href="/seller/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
                </Link>
            </Button>
            <Card className="w-full shadow-xl">
                <CardHeader>
                <CardTitle className="text-3xl font-bold text-primary">List a New Product</CardTitle>
                <CardDescription>Fill out the details below to add your product to the marketplace.</CardDescription>
                </CardHeader>
                <CardContent>
                <ProductForm />
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
