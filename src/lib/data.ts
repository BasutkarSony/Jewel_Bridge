import bangles1 from '@/assets/products/bangles-1.jpg';
import earrings1 from '@/assets/products/earrings-1.jpg';
import chain1 from '@/assets/products/chain-1.jpg';
import ring1 from '@/assets/products/ring-1.jpg';
import anklets1 from '@/assets/products/anklets-1.jpg';
import bracelet1 from '@/assets/products/bracelet-1.jpg';

export type Category = 'bangles' | 'earrings' | 'chains' | 'rings' | 'anklets' | 'bracelets' | 'other';
export type MetalType = 'gold' | 'silver' | 'platinum' | 'imitation';
export type Purity = '18K' | '22K' | '24K' | '925' | 'NA';

export interface Shop {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  phone: string;
  isVerified: boolean;
  mapUrl?: string;
}

export interface Product {
  id: string;
  shopId: string;
  name: string;
  category: Category;
  metalType: MetalType;
  purity: Purity;
  weightGrams: number;
  price: number;
  stockQty: number;
  description: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface VisitRequest {
  id: string;
  customerId: string;
  shopId: string;
  items: CartItem[];
  totalEstimatedAmount: number;
  status: 'created' | 'confirmed' | 'completed' | 'expired' | 'cancelled';
  holdExpiresAt: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  rating: number;
  reviewText: string;
  createdAt: string;
}

// Mock Data
export const shops: Shop[] = [
  {
    id: 'shop-1',
    name: 'Lakshmi Gold Palace',
    city: 'Hyderabad',
    area: 'Kukatpally',
    address: '123 Main Street, Kukatpally, Hyderabad',
    phone: '+91 98765 43210',
    isVerified: true,
    mapUrl: 'https://maps.google.com',
  },
  {
    id: 'shop-2',
    name: 'Sri Ganesh Jewellers',
    city: 'Hyderabad',
    area: 'Ameerpet',
    address: '456 Temple Road, Ameerpet, Hyderabad',
    phone: '+91 98765 43211',
    isVerified: true,
  },
  {
    id: 'shop-3',
    name: 'Royal Silver Works',
    city: 'Hyderabad',
    area: 'Secunderabad',
    address: '789 Silver Lane, Secunderabad, Hyderabad',
    phone: '+91 98765 43212',
    isVerified: false,
  },
];

export const products: Product[] = [
  {
    id: 'prod-1',
    shopId: 'shop-1',
    name: 'Traditional Gold Bangles Set',
    category: 'bangles',
    metalType: 'gold',
    purity: '22K',
    weightGrams: 45,
    price: 285000,
    stockQty: 3,
    description: 'Exquisite traditional gold bangles with intricate temple design, perfect for weddings and festive occasions.',
    imageUrl: bangles1,
    isActive: true,
    createdAt: '2024-01-15',
  },
  {
    id: 'prod-2',
    shopId: 'shop-1',
    name: 'Diamond Jhumka Earrings',
    category: 'earrings',
    metalType: 'gold',
    purity: '22K',
    weightGrams: 12,
    price: 95000,
    stockQty: 5,
    description: 'Stunning jhumka earrings with diamond embellishments and traditional craftsmanship.',
    imageUrl: earrings1,
    isActive: true,
    createdAt: '2024-01-20',
  },
  {
    id: 'prod-3',
    shopId: 'shop-2',
    name: 'Royal Gold Chain Necklace',
    category: 'chains',
    metalType: 'gold',
    purity: '22K',
    weightGrams: 25,
    price: 158000,
    stockQty: 2,
    description: 'Elegant gold chain with ornate pendant, combining traditional artistry with modern elegance.',
    imageUrl: chain1,
    isActive: true,
    createdAt: '2024-02-01',
  },
  {
    id: 'prod-4',
    shopId: 'shop-2',
    name: 'Gemstone Flower Ring',
    category: 'rings',
    metalType: 'gold',
    purity: '18K',
    weightGrams: 5.5,
    price: 42000,
    stockQty: 8,
    description: 'Beautiful floral design ring with amethyst centerpiece and diamond accents.',
    imageUrl: ring1,
    isActive: true,
    createdAt: '2024-02-10',
  },
  {
    id: 'prod-5',
    shopId: 'shop-3',
    name: 'Designer Silver Anklets',
    category: 'anklets',
    metalType: 'silver',
    purity: '925',
    weightGrams: 35,
    price: 8500,
    stockQty: 15,
    description: 'Elegant silver anklets with traditional design, perfect for everyday wear.',
    imageUrl: anklets1,
    isActive: true,
    createdAt: '2024-02-15',
  },
  {
    id: 'prod-6',
    shopId: 'shop-1',
    name: 'Cuban Link Gold Bracelet',
    category: 'bracelets',
    metalType: 'gold',
    purity: '22K',
    weightGrams: 28,
    price: 178000,
    stockQty: 4,
    description: 'Bold Cuban link bracelet in 22K gold, a statement piece for the modern jewelry enthusiast.',
    imageUrl: bracelet1,
    isActive: true,
    createdAt: '2024-02-20',
  },
];

export const reviews: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    customerId: 'cust-1',
    customerName: 'Priya S.',
    rating: 5,
    reviewText: 'Absolutely stunning bangles! The craftsmanship is exceptional.',
    createdAt: '2024-02-25',
  },
  {
    id: 'rev-2',
    productId: 'prod-2',
    customerId: 'cust-2',
    customerName: 'Anita R.',
    rating: 4,
    reviewText: 'Beautiful earrings, exactly as shown. Fast response from the shop.',
    createdAt: '2024-02-28',
  },
];

export const categories: { value: Category; label: string }[] = [
  { value: 'bangles', label: 'Bangles' },
  { value: 'earrings', label: 'Earrings' },
  { value: 'chains', label: 'Chains' },
  { value: 'rings', label: 'Rings' },
  { value: 'anklets', label: 'Anklets' },
  { value: 'bracelets', label: 'Bracelets' },
  { value: 'other', label: 'Other' },
];

export const metalTypes: { value: MetalType; label: string }[] = [
  { value: 'gold', label: 'Gold' },
  { value: 'silver', label: 'Silver' },
  { value: 'platinum', label: 'Platinum' },
  { value: 'imitation', label: 'Imitation' },
];

export const cities = ['Hyderabad', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai'];

export const getShopById = (id: string): Shop | undefined => shops.find(s => s.id === id);
export const getProductsByShop = (shopId: string): Product[] => products.filter(p => p.shopId === shopId);
export const getReviewsByProduct = (productId: string): Review[] => reviews.filter(r => r.productId === productId);

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};
