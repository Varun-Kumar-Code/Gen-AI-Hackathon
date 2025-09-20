import React from "react";
import { Home, Heart, Grid3x3, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function BottomNavigation() {
  const [location] = useLocation();

  const navItems = [
    { Icon: Home, label: "Home", path: "/" },
    { Icon: Heart, label: "Favorites", path: "/favorites" },
    { Icon: Grid3x3, label: "Categories", path: "/categories" },
    { Icon: ShoppingCart, label: "Cart", path: "/cart" },
    { Icon: User, label: "Profile", path: "/user" },
  ];

  return (
    <nav className="bp-bottom-nav" role="navigation" aria-label="Main navigation">
      <div className="bp-bottom-nav-inner">
        {navItems.map(({ Icon, label, path }) => {
          const isActive = location === path;
          return (
            <Link
              key={path}
              href={path}
              className={`bp-nav-item ${isActive ? "active" : ""}`}
              aria-current={isActive ? "page" : undefined}
              title={label}
            >
              <Icon className="bp-icon" />
              <span className="bp-label">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}