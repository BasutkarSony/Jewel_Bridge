import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories, metalTypes, cities, Category, MetalType } from '@/lib/data';
import { Slider } from '@/components/ui/slider';

interface FilterState {
  search: string;
  category: Category | 'all';
  metalType: MetalType | 'all';
  city: string;
  priceRange: [number, number];
}

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onFiltersChange({
      search: '',
      category: 'all',
      metalType: 'all',
      city: 'all',
      priceRange: [0, 500000],
    });
  };

  const hasActiveFilters = 
    filters.search || 
    filters.category !== 'all' || 
    filters.metalType !== 'all' || 
    filters.city !== 'all' ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 500000;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
        <Select
          value={filters.category}
          onValueChange={(value) => updateFilter('category', value as Category | 'all')}
        >
          <SelectTrigger className="w-full bg-secondary border-border">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Metal Type */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Metal Type</label>
        <Select
          value={filters.metalType}
          onValueChange={(value) => updateFilter('metalType', value as MetalType | 'all')}
        >
          <SelectTrigger className="w-full bg-secondary border-border">
            <SelectValue placeholder="All Metals" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Metals</SelectItem>
            {metalTypes.map((metal) => (
              <SelectItem key={metal.value} value={metal.value}>
                {metal.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">City</label>
        <Select
          value={filters.city}
          onValueChange={(value) => updateFilter('city', value)}
        >
          <SelectTrigger className="w-full bg-secondary border-border">
            <SelectValue placeholder="All Cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-medium text-foreground mb-4 block">
          Price Range: ₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()}
        </label>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
          max={500000}
          min={0}
          step={5000}
          className="w-full"
        />
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={resetFilters}>
          Reset Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search jewelry... (e.g., 22K gold bangles under 50 grams)"
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10 bg-secondary border-border h-12"
          />
        </div>
        <Button
          variant="outline"
          className="lg:hidden"
          onClick={() => setShowMobileFilters(true)}
        >
          <SlidersHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-display text-lg font-semibold mb-6">Filters</h3>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-card border-l border-border p-6 overflow-y-auto animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-lg font-semibold">Filters</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMobileFilters(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
}

export type { FilterState };
