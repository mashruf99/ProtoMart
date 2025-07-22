"use client";

import type { Product } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, ShoppingCart, ArrowLeft, CheckCircle, ShieldAlert, MessageSquare } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import ProductList from '@/components/product/ProductList';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import { useProduct } from '@/contexts/ProductContext';


const ProductDetailPage = () => {
  const params = useParams();
  const id = params.id as string;
  const { products: allProducts } = useProduct();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      const foundProduct = allProducts.find(p => p.id === id);
      setProduct(foundProduct || null);
    }
  }, [id, allProducts]);
  
  if (product === undefined) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]"><svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg></div>;
  }

  if (product === null) {
    notFound();
    return null;
  }


  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-5 w-5 ${i <= Math.round(rating) ? 'fill-accent text-accent' : 'fill-muted stroke-muted-foreground'}`}
        />
      );
    }
    return stars;
  };

  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="py-8">
      <Button variant="outline" asChild className="mb-6">
        <Link href="/shop">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Link>
      </Button>
      <Card className="overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-2 md:p-0">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={800}
              height={600}
              className="object-cover w-full h-full aspect-[4/3] rounded-md"
              data-ai-hint={product.keywords || product.category.toLowerCase()}
            />
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-3xl lg:text-4xl font-bold text-primary font-headline">{product.name}</CardTitle>
              <div className="flex items-center mt-2">
                {renderStars(product.rating)}
                <span className="ml-2 text-sm text-muted-foreground">({product.rating.toFixed(1)} rating)</span>
                <Separator orientation="vertical" className="h-4 mx-3" />
                <span className="text-sm text-green-600 font-medium flex items-center">
                  {product.stock > 0 ? <CheckCircle className="h-4 w-4 mr-1" /> : <ShieldAlert className="h-4 w-4 mr-1 text-red-500" />}
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                </span>
              </div>
            </CardHeader>
            <CardDescription className="text-md text-foreground/80 mb-6 flex-grow">
              {product.description}
            </CardDescription>
            <div className="mb-6">
              <span className="text-4xl font-bold text-accent">${product.price.toFixed(2)}</span>
              {product.price > 100 && <span className="ml-2 text-sm text-muted-foreground line-through">${(product.price * 1.2).toFixed(2)}</span>}
            </div>
            {(!user || user.role === 'buyer') ? (
              <Button
                onClick={() => addToCart(product)}
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-colors py-3 text-lg"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-6 w-6" />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            ) : (
              <Button disabled size="lg" className="w-full py-3 text-lg">
                Sellers cannot purchase
              </Button>
            )}
          </div>
        </div>
      </Card>

      <Tabs defaultValue="description" className="mt-12">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 max-w-lg mx-auto">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="shipping" className="hidden md:inline-flex">Shipping & Returns</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6 p-6 border rounded-md bg-card">
          <h3 className="text-xl font-semibold mb-4">Product Details</h3>
          <p className="text-foreground/80 whitespace-pre-line">{product.description}</p>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6 p-6 border rounded-md bg-card">
          <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="border-b pb-4">
                <div className="flex items-center mb-1">
                  {renderStars(Math.random()*2+3)} 
                  <span className="ml-2 font-semibold">User {i}</span>
                </div>
                <p className="text-sm text-muted-foreground">This product is amazing! Highly recommended.</p>
              </div>
            ))}
            <Button variant="outline"><MessageSquare className="mr-2 h-4 w-4" /> Write a review</Button>
          </div>
        </TabsContent>
        <TabsContent value="shipping" className="mt-6 p-6 border rounded-md bg-card">
          <h3 className="text-xl font-semibold mb-4">Shipping & Returns</h3>
          <p className="text-foreground/80 mb-2">Standard shipping: 3-5 business days. Express shipping available.</p>
          <p className="text-foreground/80">Free returns within 30 days of purchase. Item must be in original condition.</p>
        </TabsContent>
      </Tabs>

      {relatedProducts.length > 0 && (
        <>
          <Separator className="my-12" />
          <ProductList products={relatedProducts} title="Related Products" />
        </>
      )}
    </div>
  );
};

export default ProductDetailPage;
