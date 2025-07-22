import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  title?: string;
}

const ProductList = ({ products, title }: ProductListProps) => {
  if (!products || products.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground text-lg">{title ? `No ${title.toLowerCase()} available right now.` : 'No products available right now.'}</p>
      </div>
    );
  }

  return (
    <section className="py-8">
      {title && <h2 className="text-3xl font-bold mb-8 text-center text-primary font-headline">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
