"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRelatos } from "@/hooks/useRelatos";
import { StatusEnum } from "@/types/relato";
import { FileText, CheckCircle2, Clock, Users } from "lucide-react";

export function KPICards() {
  const { data: relatos = [], isLoading } = useRelatos();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Carregando...
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 animate-pulse rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const total = relatos.length;
  const abertos = relatos.filter(r => r.status === StatusEnum.ABERTA).length;
  const emAndamento = relatos.filter(
    r => r.status === StatusEnum.EM_ANDAMENTO
  ).length;
  const concluidos = relatos.filter(
    r => r.status === StatusEnum.CONCLUIDA
  ).length;
  const responsaveisUnicos = new Set(relatos.map(r => r.responsavel)).size;

  const kpis = [
    {
      title: "Total de Relatos",
      value: total,
      icon: FileText,
      description: "Todos os relatos cadastrados",
    },
    {
      title: "Abertos",
      value: abertos,
      icon: Clock,
      description: "Aguardando início",
      className: "text-blue-600",
    },
    {
      title: "Em Andamento",
      value: emAndamento,
      icon: Clock,
      description: "Em desenvolvimento",
      className: "text-yellow-600",
    },
    {
      title: "Concluídos",
      value: concluidos,
      icon: CheckCircle2,
      description: "Finalizados",
      className: "text-green-600",
    },
    {
      title: "Responsáveis",
      value: responsaveisUnicos,
      icon: Users,
      description: "Pessoas envolvidas",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {kpis.map(kpi => (
        <Card key={kpi.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            <kpi.icon
              className={`h-4 w-4 ${kpi.className || "text-muted-foreground"}`}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className="text-xs text-muted-foreground">{kpi.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
