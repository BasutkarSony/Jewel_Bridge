import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Plus, 
  Edit2, 
  Trash2, 
  CheckCircle, 
  Clock, 
  XCircle,
  LogOut,
  BarChart3,
  Store,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { products, shops, categories, metalTypes, formatPrice, Product } from '@/lib/data';
import { toast } from 'sonner';

// Mock data for dashboard
const mockRequests = [
  {
    id: 'req-1',
    customerName: 'Priya Sharma',
    items: 2,
    total: 380000,
    status: 'created',
    createdAt: '2024-03-01',
  },
  {
    id: 'req-2',
    customerName: 'Rahul Verma',
    items: 1,
    total: 95000,
    status: 'confirmed',
    createdAt: '2024-02-28',
  },
  {
    id: 'req-3',
    customerName: 'Anita Reddy',
    items: 3,
    total: 450000,
    status: 'completed',
    createdAt: '2024-02-25',
  },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'requests'>('overview');
  const [showAddProduct, setShowAddProduct] = useState(false);

  const shop = shops.find(s => s.id === user?.shopId) || shops[0];
  const shopProducts = products.filter(p => p.shopId === shop.id);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleConfirmRequest = (reqId: string) => {
    toast.success(`Request ${reqId} confirmed!`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'created':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'cancelled':
      case 'expired':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border p-6 hidden lg:block">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gold-light flex items-center justify-center">
            <span className="font-display text-primary-foreground text-xl font-bold">J</span>
          </div>
          <span className="font-display text-xl font-semibold">JewelBridge</span>
        </Link>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'overview' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
            }`}
          >
            <BarChart3 className="h-5 w-5" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'products' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
            }`}
          >
            <Package className="h-5 w-5" />
            Products
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'requests' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
            }`}
          >
            <ShoppingCart className="h-5 w-5" />
            Requests
          </button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-secondary rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3 mb-2">
              <Store className="h-5 w-5 text-primary" />
              <span className="font-medium text-sm">{shop.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">{shop.area}, {shop.city}</span>
          </div>
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 lg:p-10">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-gold-light flex items-center justify-center">
              <span className="font-display text-primary-foreground font-bold">J</span>
            </div>
          </Link>
          <div className="flex gap-2">
            <Button variant={activeTab === 'overview' ? 'default' : 'outline'} size="sm" onClick={() => setActiveTab('overview')}>
              Overview
            </Button>
            <Button variant={activeTab === 'products' ? 'default' : 'outline'} size="sm" onClick={() => setActiveTab('products')}>
              Products
            </Button>
            <Button variant={activeTab === 'requests' ? 'default' : 'outline'} size="sm" onClick={() => setActiveTab('requests')}>
              Requests
            </Button>
          </div>
        </div>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold mb-1">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'products' && 'Product Management'}
              {activeTab === 'requests' && 'Visit & Hold Requests'}
            </h1>
            <p className="text-muted-foreground">Welcome back, {user?.name || 'Shop Owner'}</p>
          </div>
          {activeTab === 'products' && (
            <Button variant="hero" onClick={() => setShowAddProduct(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          )}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Package className="h-8 w-8 text-primary" />
                  <span className="text-xs text-muted-foreground">Total</span>
                </div>
                <div className="font-display text-3xl font-bold">{shopProducts.length}</div>
                <p className="text-muted-foreground text-sm">Products Listed</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <ShoppingCart className="h-8 w-8 text-primary" />
                  <span className="text-xs text-muted-foreground">This Month</span>
                </div>
                <div className="font-display text-3xl font-bold">{mockRequests.length}</div>
                <p className="text-muted-foreground text-sm">Visit Requests</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  <span className="text-xs text-green-500">+12%</span>
                </div>
                <div className="font-display text-3xl font-bold">156</div>
                <p className="text-muted-foreground text-sm">Product Views</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                  <span className="text-xs text-muted-foreground">Completed</span>
                </div>
                <div className="font-display text-3xl font-bold">8</div>
                <p className="text-muted-foreground text-sm">Successful Visits</p>
              </div>
            </div>

            {/* Recent Requests */}
            <div className="bg-card border border-border rounded-xl">
              <div className="p-6 border-b border-border">
                <h2 className="font-display text-xl font-semibold">Recent Requests</h2>
              </div>
              <div className="divide-y divide-border">
                {mockRequests.slice(0, 3).map((req) => (
                  <div key={req.id} className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(req.status)}
                      <div>
                        <p className="font-medium">{req.customerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {req.items} items • {formatPrice(req.total)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm capitalize px-2 py-1 rounded ${
                        req.status === 'completed' ? 'bg-green-500/20 text-green-500' :
                        req.status === 'confirmed' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-yellow-500/20 text-yellow-500'
                      }`}>
                        {req.status}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">{req.createdAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-card border border-border rounded-xl">
              <div className="p-6 border-b border-border">
                <h2 className="font-display text-xl font-semibold">Top Products</h2>
              </div>
              <div className="divide-y divide-border">
                {shopProducts.slice(0, 3).map((product, index) => (
                  <div key={product.id} className="p-6 flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary">
                      {index + 1}
                    </span>
                    <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded object-cover" />
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                    </div>
                    <span className="text-sm text-muted-foreground">{45 - index * 12} views</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Bulk Upload Banner */}
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Upload className="h-10 w-10 text-primary" />
                <div>
                  <h3 className="font-display font-semibold text-lg">Bulk Image Upload</h3>
                  <p className="text-muted-foreground">Upload up to 100 images and let AI classify them automatically</p>
                </div>
              </div>
              <Button variant="outline">
                Try Bulk Upload
              </Button>
            </div>

            {/* Products Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Product</th>
                      <th className="text-left p-4 font-medium">Category</th>
                      <th className="text-left p-4 font-medium">Price</th>
                      <th className="text-left p-4 font-medium">Stock</th>
                      <th className="text-right p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {shopProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded object-cover" />
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">{product.metalType} • {product.purity}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 capitalize">{product.category}</td>
                        <td className="p-4">{formatPrice(product.price)}</td>
                        <td className="p-4">
                          <span className={product.stockQty <= 3 ? 'text-destructive' : ''}>{product.stockQty}</span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Customer</th>
                      <th className="text-left p-4 font-medium">Items</th>
                      <th className="text-left p-4 font-medium">Total</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Date</th>
                      <th className="text-right p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {mockRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-secondary/30 transition-colors">
                        <td className="p-4 font-medium">{req.customerName}</td>
                        <td className="p-4">{req.items} items</td>
                        <td className="p-4">{formatPrice(req.total)}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(req.status)}
                            <span className="capitalize">{req.status}</span>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">{req.createdAt}</td>
                        <td className="p-4 text-right">
                          {req.status === 'created' && (
                            <Button size="sm" onClick={() => handleConfirmRequest(req.id)}>
                              Confirm
                            </Button>
                          )}
                          {req.status === 'confirmed' && (
                            <Button size="sm" variant="outline" onClick={() => toast.success('Marked as completed!')}>
                              Complete
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Add Product Modal */}
        {showAddProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowAddProduct(false)} />
            <div className="relative bg-card border border-border rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scaleIn">
              <h2 className="font-display text-2xl font-bold mb-6">Add New Product</h2>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); toast.success('Product added!'); setShowAddProduct(false); }}>
                <div>
                  <label className="block text-sm font-medium mb-2">Product Name</label>
                  <Input placeholder="e.g., Traditional Gold Bangles" className="bg-secondary" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select>
                      <SelectTrigger className="bg-secondary">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Metal Type</label>
                    <Select>
                      <SelectTrigger className="bg-secondary">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {metalTypes.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Purity</label>
                    <Input placeholder="e.g., 22K" className="bg-secondary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Weight (g)</label>
                    <Input type="number" placeholder="0" className="bg-secondary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Stock</label>
                    <Input type="number" placeholder="0" className="bg-secondary" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Price (₹)</label>
                  <Input type="number" placeholder="0" className="bg-secondary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea 
                    className="w-full bg-secondary border border-border rounded-md p-3 min-h-[100px] resize-none"
                    placeholder="Describe your product..."
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setShowAddProduct(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="hero" className="flex-1">
                    Add Product
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
