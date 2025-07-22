"use client";

import AdCarousel from "@/components/product/AdCarousel";
import ProductList from "@/components/product/ProductList";
import { Separator } from "@/components/ui/separator";
import { useProduct } from "@/contexts/ProductContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShopPage() {
  const { products, isLoading } = useProduct();

  if (isLoading) {
    return (
        <div className="space-y-12">
            <Skeleton className="w-full max-w-4xl mx-auto h-[350px] rounded-lg" />
             <Separator className="my-8 md:my-12 bg-border/70" />
            <div>
                <Skeleton className="h-8 w-48 mx-auto mb-8" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-[400px] w-full" />)}
                </div>
            </div>
             <Separator className="my-8 md:my-12 bg-border/70" />
            <div>
                <Skeleton className="h-8 w-48 mx-auto mb-8" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-[400px] w-full" />)}
                </div>
            </div>
        </div>
    );
  }

  const ads = products.filter(p => p.isAd || p.id === '1');
  const hotDeals = products.filter(p => p.isHotDeal);
  const newArrivals = products.filter(p => !p.isHotDeal && !p.isAd);

  return (
    <div className="space-y-12">
      <AdCarousel ads={ads} />
      
      <Separator className="my-8 md:my-12 bg-border/70" />

      <ProductList products={hotDeals} title="🔥 Hot Deals" />

      <Separator className="my-8 md:my-12 bg-border/70" />
      
      <ProductList products={newArrivals} title="New Arrivals" />
    </div>
  );
}
