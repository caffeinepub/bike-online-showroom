import { Search, X, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export interface FilterState {
  search: string;
  category: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
}

interface BikeFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categories: string[];
  brands: string[];
}

export default function BikeFilters({ filters, onFiltersChange, categories, brands }: BikeFiltersProps) {
  const hasActiveFilters =
    filters.search !== '' ||
    filters.category !== '' ||
    filters.brand !== '' ||
    filters.minPrice !== '' ||
    filters.maxPrice !== '';

  const update = (key: keyof FilterState, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const reset = () => {
    onFiltersChange({ search: '', category: '', brand: '', minPrice: '', maxPrice: '' });
  };

  return (
    <div className="bg-card border border-border rounded-sm p-4">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="w-4 h-4 text-primary" />
        <h2 className="font-display font-700 text-sm tracking-widest uppercase text-foreground">
          Filter Bikes
        </h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            className="ml-auto text-muted-foreground hover:text-foreground h-7 px-2 text-xs font-display tracking-wider uppercase"
          >
            <X className="w-3 h-3 mr-1" />
            Reset
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search */}
        <div className="lg:col-span-2">
          <Label className="text-xs font-display tracking-widest uppercase text-muted-foreground mb-1.5 block">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search bikes..."
              value={filters.search}
              onChange={(e) => update('search', e.target.value)}
              className="pl-9 bg-background border-border rounded-sm font-body text-sm"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <Label className="text-xs font-display tracking-widest uppercase text-muted-foreground mb-1.5 block">
            Category
          </Label>
          <Select value={filters.category} onValueChange={(v) => update('category', v === 'all' ? '' : v)}>
            <SelectTrigger className="bg-background border-border rounded-sm font-body text-sm">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border rounded-sm">
              <SelectItem value="all" className="font-body">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat} className="font-body">{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Brand */}
        <div>
          <Label className="text-xs font-display tracking-widest uppercase text-muted-foreground mb-1.5 block">
            Brand
          </Label>
          <Select value={filters.brand} onValueChange={(v) => update('brand', v === 'all' ? '' : v)}>
            <SelectTrigger className="bg-background border-border rounded-sm font-body text-sm">
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border rounded-sm">
              <SelectItem value="all" className="font-body">All Brands</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand} className="font-body">{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-xs font-display tracking-widest uppercase text-muted-foreground mb-1.5 block">
            Price Range
          </Label>
          <div className="flex items-center gap-1">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => update('minPrice', e.target.value)}
              className="bg-background border-border rounded-sm font-body text-sm w-full"
              min={0}
            />
            <span className="text-muted-foreground text-xs">–</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => update('maxPrice', e.target.value)}
              className="bg-background border-border rounded-sm font-body text-sm w-full"
              min={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
