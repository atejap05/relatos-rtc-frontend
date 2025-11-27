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
    className:
      "bg-blue-50 text-blue-700 border border-blue-200",
  },
  [StatusEnum.EM_ANDAMENTO]: {
    label: "Em Andamento",
    className:
      "bg-amber-50 text-amber-700 border border-amber-200",
  },
  [StatusEnum.CONCLUIDA]: {
    label: "Concluída",
    className:
      "bg-green-50 text-green-700 border border-green-200",
  },
  [StatusEnum.CANCELADA]: {
    label: "Cancelada",
    className:
      "bg-red-50 text-red-700 border border-red-200",
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
