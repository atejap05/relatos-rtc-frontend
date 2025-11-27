'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, LayoutDashboard, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ABAS, type Aba } from '@/types/relato';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
];

export function Header() {
  const pathname = usePathname();
  
  // Extrair a aba atual da URL se estiver em uma rota de aba
  const currentAba = pathname?.split('/')[1] as Aba | undefined;
  const isAbaRoute = currentAba && ABAS.includes(currentAba);

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-xl font-bold text-card-foreground">
                  Relatos RTC - NFSe
                </h1>
              </Link>
            </div>
            <nav className="ml-10 flex space-x-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
              {ABAS.map((aba) => {
                const isActive = currentAba === aba;
                return (
                  <Link
                    key={aba}
                    href={`/${aba}`}
                    className={cn(
                      'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <FileText className="h-4 w-4" />
                    {aba}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {isAbaRoute && (
              <Link href={`/${currentAba}/novo`}>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Relato
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

