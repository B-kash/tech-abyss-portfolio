"use client";

import { useState } from "react";
import Link from "next/link";
import MobileMenu from "../shared/MobileMenu";
import MobileMenuButton from "../shared/MobileMenuButton";
import Logo from "./Logo";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navItems = [
    { name: "Overview", href: "#overview" },
    { name: "Services", href: "#services" },
    { name: "Works", href: "/projects" },
    { name: "Process", href: "#approach" },
    { name: "Profile", href: "/about" },
  ];

  return (
    <header className="fixed top-0 w-full z-30 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="w-full px-8 py-6 flex items-center">
        <Link href="/" className="mr-12">
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-12">
          {navItems.map((item) => (
            item.href.startsWith('/') ? (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-accent transition-colors text-sm font-medium uppercase tracking-widest"
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-accent transition-colors text-sm font-medium uppercase tracking-widest"
              >
                {item.name}
              </a>
            )
          ))}
        </nav>

        <div className="lg:hidden ml-auto">
          <MobileMenuButton
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}

export default Header;
