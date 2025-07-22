"use client";

import Link from 'next/link';
import { ShoppingCart, User as UserIcon, LogIn, LogOut, Search, Menu, Settings, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from 'react';

const Header = () => {
  const { user, logout, isLoading } = useAuth();
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const buyerLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/categories/electronics", label: "Electronics" },
    { href: "/categories/apparel", label: "Apparel" },
    { href: "/categories/home", label: "Home Goods" },
  ];

  const sellerLinks = [
    { href: "/seller/dashboard", label: "Dashboard" },
    { href: "/seller/products/new", label: "Add Product" },
  ];

  const navLinks = user?.role === 'seller' ? sellerLinks : buyerLinks;

  const UserActions = () => {
    if (isLoading) {
      return <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />;
    }
    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`https://avatar.vercel.sh/${user.email}.png`} alt={user.name} />
                <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email} ({user.role})
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={user.role === 'seller' ? "/seller/dashboard" : "/profile"} className="flex items-center">
                <Settings className="mr-2 h-4 w-4" />
                {user.role === 'seller' ? 'Dashboard' : 'Profile'}
              </Link>
            </DropdownMenuItem>
            {user.role === 'buyer' && (
              <DropdownMenuItem disabled>
                <Package className="mr-2 h-4 w-4" />
                Orders
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer flex items-center">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost">
                <LogIn className="mr-2 h-5 w-5" /> Login
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end" forceMount>
            <DropdownMenuItem asChild>
                <Link href="/login">As a Buyer</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/seller/login">As a Seller</Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const DesktopNav = () => (
    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
          {link.label}
        </Link>
      ))}
    </nav>
  );
  
  const MobileNav = () => (
    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Link href="/" className="text-2xl font-bold text-primary" onClick={() => setMobileMenuOpen(false)}>
              Elysian Commerce
            </Link>
          </div>
          <nav className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto p-4 border-t">
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <MobileNav />
          <Link href="/" className="hidden md:flex items-center space-x-2 mr-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-primary">
              <path d="M12 .75a8.25 8.25 0 00-6.065 2.686L12 11.455l6.065-8.019A8.25 8.25 0 0012 .75zm0 3a5.234 5.234 0 01.477.025L12 4.098l-.477-.323A5.234 5.234 0 0112 3.75zm-4.01 1.31a5.25 5.25 0 018.02 0L12 9.466 7.99 5.06zm0 0l-1.87 2.478A8.25 8.25 0 003.75 12c0 4.556 3.694 8.25 8.25 8.25s8.25-3.694 8.25-8.25a8.25 8.25 0 00-2.37-5.462L16.01 5.06zM12 22.5A10.5 10.5 0 1122.5 12 10.512 10.512 0 0112 22.5zm0-1.5a9 9 0 10-9-9 9.01 9.01 0 009 9z"/>
            </svg>
            <span className="font-bold text-xl">Elysian Commerce</span>
          </Link>
          <DesktopNav />
        </div>

        <div className="flex-1 mx-4 md:mx-8 max-w-md hidden sm:block">
          <form className="relative">
            <Input
              type="search"
              placeholder="Search products..."
              className="h-10 w-full rounded-lg pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </form>
        </div>
        
        <Link href="/" className="md:hidden text-lg font-bold text-primary">
          Elysian
        </Link>


        <div className="flex items-center space-x-3">
          <UserActions />
          {(!user || user.role === 'buyer') && (
            <Button asChild variant="ghost" size="icon" className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {itemCount}
                  </span>
                )}
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
