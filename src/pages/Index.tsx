import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Store, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { products, categories } from '@/lib/data';
import heroImage from '@/assets/hero-jewelry.jpg';

const Index = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury jewelry collection"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary animate-fadeIn">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Discover Authentic Local Jewelry</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-tight animate-fadeIn animation-delay-100">
              <span className="text-foreground">Experience</span>
              <br />
              <span className="gold-gradient-text">Genuine Jewelry</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-body animate-fadeIn animation-delay-200">
              Browse real jewelry from verified local shops. Save items you love and visit in-store for the perfect purchase.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fadeIn animation-delay-300">
              <Link to="/browse">
                <Button variant="hero" size="lg" className="group">
                  Explore Collection
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/register?role=shopkeeper">
                <Button variant="premium" size="lg">
                  <Store className="h-5 w-5 mr-2" />
                  List Your Shop
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 max-w-lg mx-auto animate-fadeIn animation-delay-400">
              <div className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground mt-1">Verified Shops</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground mt-1">Products</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground mt-1">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-primary rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-32 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              How <span className="text-primary">JewelBridge</span> Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A seamless way to discover and purchase authentic jewelry from trusted local jewelers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Store className="h-8 w-8" />,
                title: 'Browse',
                description: 'Explore genuine jewelry from verified local shops with real photos, weight, purity, and prices.',
              },
              {
                icon: <ShieldCheck className="h-8 w-8" />,
                title: 'Save & Request',
                description: 'Add items to your cart and create a Visit & Hold request. The shop will confirm and hold items for you.',
              },
              {
                icon: <MapPin className="h-8 w-8" />,
                title: 'Visit & Purchase',
                description: 'Visit the shop, see the jewelry in person, and complete your purchase with confidence.',
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative bg-card border border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors group"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold">
                  {index + 1}
                </div>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {step.icon}
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-2">
                Shop by Category
              </h2>
              <p className="text-muted-foreground">Find the perfect piece for every occasion</p>
            </div>
            <Link to="/categories">
              <Button variant="outline" className="hidden md:flex">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.value}
                to={`/browse?category=${category.value}`}
                className="group relative aspect-square bg-card border border-border rounded-xl overflow-hidden hover:border-primary transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:scale-110 transition-all">
                      <Sparkles className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <span className="font-display text-lg font-medium">{category.label}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-2">
                Featured <span className="text-primary">Collection</span>
              </h2>
              <p className="text-muted-foreground">Handpicked pieces from our verified jewelers</p>
            </div>
            <Link to="/browse">
              <Button variant="outline" className="hidden md:flex">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link to="/browse">
              <Button variant="outline">
                View All Products
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl p-8 md:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Are You a <span className="text-primary">Local Jeweler</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join JewelBridge and gain digital visibility without the complexity of full e-commerce. 
                Upload your inventory, connect with local customers, and grow your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register?role=shopkeeper">
                  <Button variant="hero" size="lg">
                    Register Your Shop
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
