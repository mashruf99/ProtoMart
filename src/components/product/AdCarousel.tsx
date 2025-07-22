"use client";

import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Link from 'next/link';

interface AdCarouselProps {
  ads: Product[]; // Using Product type for ads for simplicity
}

const AdCarousel = ({ ads }: AdCarouselProps) => {
  if (!ads || ads.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary font-headline">Featured Promotions</h2>
      <Carousel 
        className="w-full max-w-4xl mx-auto"
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        opts={{ loop: true }}
      >
        <CarouselContent>
          {ads.map((ad, index) => (
            <CarouselItem key={index}>
              <Link href={`/products/${ad.id}`} passHref>
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                  <CardContent className="flex aspect-[16/7] items-center justify-center p-0 relative">
                    <Image
                      src={ad.imageUrl}
                      alt={ad.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      priority={index === 0} // Prioritize loading the first ad image
                      data-ai-hint={ad.keywords || ad.category.toLowerCase() + " promotion"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 flex flex-col justify-end">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{ad.name}</h3>
                      <p className="text-sm md:text-md text-gray-200 hidden sm:block">{ad.description.substring(0,100)}...</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
      </Carousel>
    </section>
  );
};

export default AdCarousel;
