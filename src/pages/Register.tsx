import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, User, Store, ArrowLeft } from 'lucide-react';
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
import { cities } from '@/lib/data';
import { toast } from 'sonner';

type UserRole = 'customer' | 'shopkeeper';

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [role, setRole] = useState<UserRole>(
    (searchParams.get('role') as UserRole) || 'customer'
  );
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    area: '',
    phone: '',
    shopName: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role,
        city: formData.city,
        area: formData.area,
        phone: formData.phone,
        shopName: formData.shopName,
      });
      
      if (success) {
        toast.success('Registration successful!');
        navigate(role === 'shopkeeper' ? '/dashboard' : '/browse');
      }
    } catch {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join JewelBridge today</p>
          </div>

          {/* Role Toggle */}
          <div className="flex gap-2 p-1 bg-secondary rounded-lg mb-8">
            <button
              type="button"
              onClick={() => setRole('customer')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md transition-all ${
                role === 'customer'
                  ? 'bg-card text-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <User className="h-4 w-4" />
              Customer
            </button>
            <button
              type="button"
              onClick={() => setRole('shopkeeper')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md transition-all ${
                role === 'shopkeeper'
                  ? 'bg-card text-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Store className="h-4 w-4" />
              Shopkeeper
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                required
                className="bg-secondary border-border h-12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                required
                className="bg-secondary border-border h-12"
              />
            </div>

            {role === 'shopkeeper' && (
              <div>
                <label className="block text-sm font-medium mb-2">Shop Name</label>
                <Input
                  type="text"
                  placeholder="Enter your shop name"
                  value={formData.shopName}
                  onChange={(e) => updateField('shopName', e.target.value)}
                  required
                  className="bg-secondary border-border h-12"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <Select value={formData.city} onValueChange={(v) => updateField('city', v)}>
                  <SelectTrigger className="bg-secondary border-border h-12">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Area</label>
                <Input
                  type="text"
                  placeholder="Your area"
                  value={formData.area}
                  onChange={(e) => updateField('area', e.target.value)}
                  className="bg-secondary border-border h-12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                required={role === 'shopkeeper'}
                className="bg-secondary border-border h-12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  required
                  className="bg-secondary border-border h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                required
                className="bg-secondary border-border h-12"
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-muted-foreground mt-8">
            Already have an account?{' '}
            <Link to={`/login?role=${role}`} className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/20 to-accent/20 items-center justify-center p-8">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-gold-light flex items-center justify-center mx-auto mb-8">
            <span className="font-display text-primary-foreground text-4xl font-bold">J</span>
          </div>
          <h2 className="font-display text-3xl font-bold mb-4">JewelBridge</h2>
          <p className="text-muted-foreground text-lg">
            {role === 'shopkeeper'
              ? 'List your jewelry inventory and reach more local customers digitally.'
              : 'Browse authentic jewelry from trusted local shops and purchase with confidence.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
