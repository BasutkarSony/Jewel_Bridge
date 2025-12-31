import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Phone, ExternalLink, Star, Minus, Plus, ShoppingBag, Heart, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { VerifiedBadge } from '@/components/VerifiedBadge';
import { Button } from '@/components/ui/button';
import { products, getShopById, getReviewsByProduct, formatPrice } from '@/lib/data';
import { useCart } from '@/context/CartContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const shop = product ? getShopById(product.shopId) : null;
  const reviews = product ? getReviewsByProduct(product.id) : [];
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product || !shop) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-16 container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Product Not Found</h1>
          <Link to="/browse">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const similarProducts = products
    .filter(
      (p) =>
        p.id !== product.id &&
        p.category === product.category &&
        p.metalType === product.metalType
    )
    .slice(0, 4);

  const averageRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/browse" className="hover:text-primary transition-colors">Browse</Link>
            <span>/</span>
            <span className="text-foreground capitalize">{product.category}</span>
          </nav>

          {/* Product Section */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 mb-16">
            {/* Image */}
            <div className="relative mb-8 lg:mb-0">
              <div className="aspect-square rounded-2xl overflow-hidden bg-card border border-border">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isWishlisted
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background/80 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Category Badge */}
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full capitalize">
                {product.category}
              </span>

              <h1 className="font-display text-3xl md:text-4xl font-bold">{product.name}</h1>

              {/* Rating */}
              {reviews.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= averageRating ? 'text-primary fill-current' : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">({reviews.length} reviews)</span>
                </div>
              )}

              {/* Price */}
              <div className="price-tag text-3xl">{formatPrice(product.price)}</div>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-border">
                <div>
                  <span className="text-muted-foreground text-sm">Metal Type</span>
                  <p className="font-medium capitalize">{product.metalType}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">Purity</span>
                  <p className="font-medium">{product.purity}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">Weight</span>
                  <p className="font-medium">{product.weightGrams} grams</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">Stock</span>
                  <p className={`font-medium ${product.stockQty <= 3 ? 'text-destructive' : ''}`}>
                    {product.stockQty} available
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-lg leading-relaxed">{product.description}</p>

              {/* Disclaimer */}
              <div className="bg-accent/30 border border-accent/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> Final price may vary based on gold/silver market rates on the day of purchase.
                </p>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQty, quantity + 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <Button
                  variant="hero"
                  size="lg"
                  className="flex-1"
                  onClick={() => addToCart(product, quantity)}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>

              {/* Shop Info */}
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold">{shop.name}</h3>
                    {shop.isVerified && <VerifiedBadge className="mt-2" />}
                  </div>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{shop.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>{shop.phone}</span>
                  </div>
                </div>
                {shop.mapUrl && (
                  <a
                    href={shop.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    View on Map
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          {reviews.length > 0 && (
            <section className="mb-16">
              <h2 className="font-display text-2xl font-bold mb-6">Customer Reviews</h2>
              <div className="grid gap-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">{review.customerName}</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating ? 'text-primary fill-current' : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.reviewText}</p>
                    <p className="text-sm text-muted-foreground/60 mt-2">{review.createdAt}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <section>
              <h2 className="font-display text-2xl font-bold mb-6">Similar Items</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
