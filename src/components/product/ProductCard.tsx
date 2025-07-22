"use client";

import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${i <= Math.round(rating) ? 'fill-accent text-accent' : 'fill-muted stroke-muted-foreground'}`}
        />
      );
    }
    return stars;
  };

  return (
    <Card className="flex flex-col overflow-hidden h-full rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} passHref>
          <div className="aspect-video overflow-hidden cursor-pointer">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={400}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              data-ai-hint={product.keywords || product.category.toLowerCase()}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`} passHref>
          <CardTitle className="text-lg font-semibold hover:text-primary transition-colors cursor-pointer leading-tight mb-1">
            {product.name}
          </CardTitle>
        </Link>
        <CardDescription className="text-sm text-muted-foreground h-10 overflow-hidden mb-2">
          {product.description.substring(0, 60)}...
        </CardDescription>
        <div className="flex items-center my-2">
          {renderStars(product.rating)}
          <span className="ml-2 text-xs text-muted-foreground">({product.rating.toFixed(1)})</span>
        </div>
        <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 border-t">
        {(!user || user.role === 'buyer') ? (
          <Button
            onClick={() => addToCart(product)}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-colors"
            aria-label={`Add ${product.name} to cart`}
            disabled={product.stock === 0}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        ) : (
          <Button disabled className="w-full">
            Sellers cannot purchase
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
