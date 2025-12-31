import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Store } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { getShopById, formatPrice, shops } from '@/lib/data';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, createVisitRequest } = useCart();

  // Group items by shop
  const itemsByShop = cartItems.reduce((acc, item) => {
    const shopId = item.product.shopId;
    if (!acc[shopId]) {
      acc[shopId] = [];
    }
    acc[shopId].push(item);
    return acc;
  }, {} as Record<string, typeof cartItems>);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center py-20">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="font-display text-3xl font-bold mb-4">Your Cart is Empty</h1>
              <p className="text-muted-foreground mb-8">
                Browse our collection and add items to your cart to get started.
              </p>
              <Link to="/browse">
                <Button variant="hero" size="lg">
                  Start Shopping
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl font-bold mb-8">
            Your <span className="text-primary">Cart</span>
          </h1>

          <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-8">
            {/* Cart Items by Shop */}
            <div className="space-y-6">
              {Object.entries(itemsByShop).map(([shopId, items]) => {
                const shop = getShopById(shopId) || shops[0];
                const shopTotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

                return (
                  <div key={shopId} className="bg-card border border-border rounded-xl overflow-hidden">
                    {/* Shop Header */}
                    <div className="bg-secondary/50 px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Store className="h-5 w-5 text-primary" />
                        <span className="font-display font-semibold">{shop.name}</span>
                        <span className="text-muted-foreground text-sm">({shop.area})</span>
                      </div>
                      <Button
                        variant="hero"
                        size="sm"
                        onClick={() => createVisitRequest(shopId)}
                      >
                        Visit & Hold
                      </Button>
                    </div>

                    {/* Items */}
                    <div className="divide-y divide-border">
                      {items.map((item) => (
                        <div key={item.product.id} className="p-6 flex gap-4">
                          {/* Image */}
                          <Link to={`/product/${item.product.id}`} className="shrink-0">
                            <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted">
                              <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </Link>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <Link to={`/product/${item.product.id}`}>
                              <h3 className="font-display font-semibold hover:text-primary transition-colors line-clamp-1">
                                {item.product.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground mt-1">
                              {item.product.metalType} • {item.product.purity} • {item.product.weightGrams}g
                            </p>
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center border border-border rounded">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                                  disabled={item.quantity >= item.product.stockQty}
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              <span className="font-display font-semibold text-primary">
                                {formatPrice(item.product.price * item.quantity)}
                              </span>
                            </div>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Shop Total */}
                    <div className="bg-secondary/30 px-6 py-4 flex items-center justify-between">
                      <span className="text-muted-foreground">Shop Subtotal</span>
                      <span className="font-display font-semibold text-lg">{formatPrice(shopTotal)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="mt-8 lg:mt-0">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-28">
                <h2 className="font-display text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4 pb-6 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items ({cartItems.length})</span>
                    <span>{formatPrice(getCartTotal())}</span>
                  </div>
                </div>

                <div className="flex justify-between py-6 text-lg">
                  <span className="font-display font-semibold">Estimated Total</span>
                  <span className="font-display font-bold text-primary">{formatPrice(getCartTotal())}</span>
                </div>

                <div className="bg-accent/30 border border-accent/50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-muted-foreground">
                    Click "Visit & Hold" on each shop section to create a request. 
                    The shop will confirm and hold items for your visit.
                  </p>
                </div>

                <Link to="/browse">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
