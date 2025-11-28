"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ABAS, type Aba } from "@/types/relato";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const navigation = [{ name: "Dashboard", href: "/", icon: LayoutDashboard }];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Extrair a aba atual da URL se estiver em uma rota de aba
  const currentAba = pathname?.split("/")[1] as Aba | undefined;

  const navLinks = [
    ...navigation.map(item => ({
      ...item,
      href: item.href,
      isActive: pathname === item.href,
    })),
    ...ABAS.map(aba => ({
      name: aba,
      href: `/${aba}`,
      icon: FileText,
      isActive: currentAba === aba,
    })),
  ];

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-[80%] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="shrink-0">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <h1 className="text-xl font-bold text-card-foreground">
                  Relatos RTC - NFSe
                </h1>
              </Link>
            </div>
            {/* Desktop Navigation */}
            <nav className="ml-10 hidden space-x-4 md:flex">
              {navigation.map(item => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
              {ABAS.map(aba => {
                const isActive = currentAba === aba;
                return (
                  <Link
                    key={aba}
                    href={`/${aba}`}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <FileText className="h-4 w-4" />
                    {aba}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="border-t border-border py-4 md:hidden">
            <div className="space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    link.isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
