"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Verifica se estamos no cliente
    if (typeof window === "undefined") return;

    const media = window.matchMedia(query);
    
    // Define o valor inicial
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Cria o listener
    const listener = () => setMatches(media.matches);
    
    // Adiciona o listener
    if (media.addEventListener) {
      media.addEventListener("change", listener);
    } else {
      // Fallback para navegadores antigos
      media.addListener(listener);
    }

    // Remove o listener na limpeza
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", listener);
      } else {
        media.removeListener(listener);
      }
    };
  }, [matches, query]);

  return matches;
}

