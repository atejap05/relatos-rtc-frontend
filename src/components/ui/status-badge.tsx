import { StatusEnum } from "@/types/relato";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: StatusEnum;
  className?: string;
}

/**
 * Configuração de cores para cada status do relato.
 * Cores otimizadas para contraste WCAG AA (mínimo 4.5:1 para texto pequeno).
 *
 * Sistema de cores:
 * - ABERTA: Azul (indica início/novo)
 * - EM_ANDAMENTO: Amarelo/Laranja (indica progresso)
 * - CONCLUIDA: Verde (indica sucesso/finalizado)
 * - CANCELADA: Vermelho/Cinza (indica cancelamento)
 */
const statusConfig = {
  [StatusEnum.ABERTA]: {
    label: "Aberta",
    // Light mode: azul claro com texto azul escuro (alto contraste)
    // Dark mode: azul escuro sólido com texto azul claro (alto contraste)
    className:
      "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200 border border-blue-200 dark:border-blue-800",
  },
  [StatusEnum.EM_ANDAMENTO]: {
    label: "Em Andamento",
    // Light mode: amarelo claro com texto amarelo escuro (alto contraste)
    // Dark mode: amarelo escuro sólido com texto amarelo claro (alto contraste)
    className:
      "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200 border border-amber-200 dark:border-amber-800",
  },
  [StatusEnum.CONCLUIDA]: {
    label: "Concluída",
    // Light mode: verde claro com texto verde escuro (alto contraste)
    // Dark mode: verde escuro sólido com texto verde claro (alto contraste)
    className:
      "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-200 border border-green-200 dark:border-green-800",
  },
  [StatusEnum.CANCELADA]: {
    label: "Cancelada",
    // Light mode: vermelho claro com texto vermelho escuro (alto contraste)
    // Dark mode: vermelho escuro sólido com texto vermelho claro (alto contraste)
    className:
      "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-200 border border-red-200 dark:border-red-800",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
