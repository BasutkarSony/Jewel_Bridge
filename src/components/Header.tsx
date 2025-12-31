import { Link } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const cartCount = getCartCount();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary to-gold-light flex items-center justify-center">
              <span className="font-display text-primary-foreground text-lg md:text-xl font-bold">J</span>
            </div>
            <span className="font-display text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
              JewelBridge
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/browse" className="text-foreground/80 hover:text-primary transition-colors font-body text-lg">
              Browse
            </Link>
            <Link to="/categories" className="text-foreground/80 hover:text-primary transition-colors font-body text-lg">
              Categories
            </Link>
            {isAuthenticated && user?.role === 'shopkeeper' && (
              <Link to="/dashboard" className="text-foreground/80 hover:text-primary transition-colors font-body text-lg">
                Dashboard
              </Link>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-muted-foreground text-sm">{user?.name}</span>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fadeIn">
            <nav className="flex flex-col gap-3">
              <Link
                to="/browse"
                className="px-4 py-2 text-foreground hover:bg-primary/10 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse
              </Link>
              <Link
                to="/categories"
                className="px-4 py-2 text-foreground hover:bg-primary/10 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Categories
              </Link>
              {isAuthenticated && user?.role === 'shopkeeper' && (
                <Link
                  to="/dashboard"
                  className="px-4 py-2 text-foreground hover:bg-primary/10 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <div className="border-t border-border pt-3 mt-2">
                {isAuthenticated ? (
                  <Button variant="outline" className="w-full" onClick={logout}>
                    Logout
                  </Button>
                ) : (
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      <User className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
