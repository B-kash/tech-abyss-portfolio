"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import MobileMenu from "../shared/MobileMenu";
import MobileMenuButton from "../shared/MobileMenuButton";
import Logo from "./Logo";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/#overview" },
    { name: "Services", href: "/#services" },
    { name: "Works", href: "/projects" },
    { name: "Process", href: "/#approach" },
    { name: "Profile", href: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "services", "approach"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= 300;
        }
        return false;
      });

      if (currentSection) {
        setActiveItem(`/#${currentSection}`);
      } else {
        setActiveItem(pathname);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/projects" && pathname === "/projects") return true;
    if (href === "/about" && pathname === "/about") return true;
    return activeItem === href;
  };

  return (
    <header className="fixed top-0 w-full z-30 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="w-full px-8 py-6 flex items-center">
        <Link href="/" className="lg:order-first flex items-center gap-3 group">
          <Logo />
          <span className="text-xl font-bold tracking-tight font-bricolage bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:to-purple-400 transition-all duration-300">
            TECH ABYSS
          </span>
        </Link>

        <nav className="hidden lg:flex items-center ml-6 gap-12">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-foreground hover:text-sky-500  transition-colors text-sm font-medium uppercase tracking-widest relative group py-2 font-bricolage ${isActive(item.href) ? 'text-accent' : ''}`}
            >
              {item.name}
              <span className={`absolute bottom-0 left-0 h-px bg-sky-500 transition-all duration-300 ${isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
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
