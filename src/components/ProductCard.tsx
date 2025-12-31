import { Link } from 'react-router-dom';
import { ShieldCheck, Heart } from 'lucide-react';
import { Product, getShopById, formatPrice } from '@/lib/data';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const shop = getShopById(product.shopId);
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="product-card group">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <Button
              variant="hero"
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Wishlist Button */}
        <button
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            isWishlisted
              ? 'bg-primary text-primary-foreground'
              : 'bg-background/80 text-foreground hover:bg-primary hover:text-primary-foreground'
          }`}
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-background/80 backdrop-blur-sm text-xs font-medium rounded-full capitalize">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <Link to={`/product/${product.id}`} className="block p-4">
        <div className="space-y-2">
          <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="capitalize">{product.metalType}</span>
            <span>•</span>
            <span>{product.purity}</span>
            <span>•</span>
            <span>{product.weightGrams}g</span>
          </div>

          {shop && (
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-muted-foreground">{shop.name}</span>
              {shop.isVerified && (
                <ShieldCheck className="h-4 w-4 text-primary" />
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className="price-tag">{formatPrice(product.price)}</span>
            {product.stockQty <= 3 && (
              <span className="text-xs text-destructive">Only {product.stockQty} left</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
