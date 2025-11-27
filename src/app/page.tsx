"use client";

import { useState, useMemo } from "react";
import { KPICards } from "@/components/dashboard/kpi-cards";
import { StatusChart } from "@/components/dashboard/status-chart";
import { ResponsavelChart } from "@/components/dashboard/responsavel-chart";
import { useAllRelatos } from "@/hooks/useRelatos";
import { ABAS, type Relato } from "@/types/relato";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DashboardPage() {
  const { data: allRelatos = [], isLoading } = useAllRelatos();
  const [selectedAba, setSelectedAba] = useState<string>("Todas");

  // Filtra relatos baseado na aba selecionada
  const filteredRelatos = useMemo(() => {
    if (selectedAba === "Todas") {
      return allRelatos;
    }
    return allRelatos.filter(relato => relato.aba === selectedAba);
  }, [allRelatos, selectedAba]);

  // Remove a propriedade 'aba' dos relatos antes de passar para os componentes
  const relatosForComponents: Relato[] = useMemo(() => {
    return filteredRelatos.map(relato => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { aba, ...relatoWithoutAba } = relato;
      return relatoWithoutAba;
    });
  }, [filteredRelatos]);

  // Estatísticas por aba
  const statsByAba = useMemo(() => {
    const stats: Record<string, number> = {};
    ABAS.forEach(aba => {
      stats[aba] = allRelatos.filter(r => r.aba === aba).length;
    });
    stats["Todas"] = allRelatos.length;
    return stats;
  }, [allRelatos]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Visão geral dos relatos de testes RTC
            {selectedAba !== "Todas" && (
              <span className="ml-2 font-medium text-foreground">
                - Aba: {selectedAba}
              </span>
            )}
          </p>
        </div>
        <Select value={selectedAba} onValueChange={setSelectedAba}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filtrar por aba" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todas">
              Todas ({statsByAba["Todas"] || 0})
            </SelectItem>
            {ABAS.map(aba => (
              <SelectItem key={aba} value={aba}>
                {aba} ({statsByAba[aba] || 0})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <KPICards relatos={relatosForComponents} isLoading={isLoading} />

      <div className="grid gap-4 md:grid-cols-2">
        <StatusChart relatos={relatosForComponents} isLoading={isLoading} />
        <ResponsavelChart
          relatos={relatosForComponents}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
