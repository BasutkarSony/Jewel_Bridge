import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, User, Store, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

type UserRole = 'customer' | 'shopkeeper';

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [role, setRole] = useState<UserRole>(
    (searchParams.get('role') as UserRole) || 'customer'
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password, role);
      if (success) {
        toast.success('Login successful!');
        navigate(role === 'shopkeeper' ? '/dashboard' : '/browse');
      }
    } catch {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your JewelBridge account</p>
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-secondary border-border h-12"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-muted-foreground mt-8">
            Don't have an account?{' '}
            <Link to={`/register?role=${role}`} className="text-primary hover:underline font-medium">
              Create account
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
              ? 'Manage your jewelry inventory and connect with local customers.'
              : 'Discover authentic jewelry from verified local shops near you.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
