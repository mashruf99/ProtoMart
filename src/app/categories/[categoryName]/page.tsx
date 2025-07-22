"use client";

import { useParams, notFound } from 'next/navigation';
import ProductList from '@/components/product/ProductList';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useProduct } from '@/contexts/ProductContext';

export default function CategoryPage() {
  const params = useParams();
  const { products: allProducts } = useProduct();
  const categoryName = params.categoryName as string;
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (categoryName) {
      const decodedCategoryName = decodeURIComponent(categoryName);
      const products = allProducts.filter(
        product => product.category.toLowerCase() === decodedCategoryName.toLowerCase()
      );
      setFilteredProducts(products);
      
      const title = decodedCategoryName.charAt(0).toUpperCase() + decodedCategoryName.slice(1);
      setCategoryTitle(title);
      setIsLoading(false);

      if (products.length === 0 && allProducts.every(p => p.category.toLowerCase() !== decodedCategoryName.toLowerCase())) {
        notFound();
      }
    }
  }, [categoryName, allProducts]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>;
  }
  
  return (
    <div className="py-8">
      <Button variant="outline" asChild className="mb-6">
        <Link href="/shop">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
        </Link>
      </Button>
      <ProductList products={filteredProducts} title={`${categoryTitle} Products`} />
      {filteredProducts.length === 0 && !isLoading && (
         <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">No products found in the "{categoryTitle}" category.</p>
            <Button asChild className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/shop">Explore Other Categories</Link>
            </Button>
         </div>
      )}
    </div>
  );
}
