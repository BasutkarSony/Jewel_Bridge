import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { ProductFilters, FilterState } from '@/components/ProductFilters';
import { products, getShopById } from '@/lib/data';

const Browse = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    metalType: 'all',
    city: 'all',
    priceRange: [0, 500000],
  });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.metalType.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }

      // Metal type filter
      if (filters.metalType !== 'all' && product.metalType !== filters.metalType) {
        return false;
      }

      // City filter
      if (filters.city !== 'all') {
        const shop = getShopById(product.shopId);
        if (shop?.city !== filters.city) return false;
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
              Browse <span className="text-primary">Jewelry</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover authentic pieces from verified local jewelers
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
            {/* Filters Sidebar */}
            <aside className="mb-6 lg:mb-0">
              <ProductFilters filters={filters} onFiltersChange={setFilters} />
            </aside>

            {/* Products Grid */}
            <div>
              {/* Results Count */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="text-foreground font-medium">{filteredProducts.length}</span> products
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-card border border-border rounded-xl">
                  <div className="text-muted-foreground text-lg">
                    No products found matching your criteria.
                  </div>
                  <p className="text-muted-foreground mt-2">
                    Try adjusting your filters or search term.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Browse;
