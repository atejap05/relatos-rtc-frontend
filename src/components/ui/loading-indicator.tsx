"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export function LoadingIndicator() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [showColdStart, setShowColdStart] = useState(false);

  useEffect(() => {
    // Detecta mudança de rota
    setIsLoading(true);
    setShowColdStart(false);

    // Timeout para mostrar mensagem de cold start após 3 segundos
    const coldStartTimer = setTimeout(() => {
      setShowColdStart(true);
    }, 3000);

    // Simula o fim do loading após navegação
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setShowColdStart(false);
    }, 800);

    return () => {
      clearTimeout(coldStartTimer);
      clearTimeout(loadingTimer);
    };
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        {showColdStart && (
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">
              Conectando ao servidor...
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Isso pode levar alguns segundos após inatividade
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

