'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusEnum, type Relato } from '@/types/relato';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const COLORS = {
  [StatusEnum.ABERTA]: '#3b82f6',
  [StatusEnum.EM_ANDAMENTO]: '#eab308',
  [StatusEnum.CONCLUIDA]: '#22c55e',
  [StatusEnum.CANCELADA]: '#ef4444',
};

const STATUS_LABELS = {
  [StatusEnum.ABERTA]: 'Abertos',
  [StatusEnum.EM_ANDAMENTO]: 'Em Andamento',
  [StatusEnum.CONCLUIDA]: 'Concluídos',
  [StatusEnum.CANCELADA]: 'Cancelados',
};

interface StatusChartProps {
  relatos: Relato[];
  isLoading?: boolean;
}

export function StatusChart({ relatos, isLoading = false }: StatusChartProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Distribuição por Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] animate-pulse rounded bg-muted" />
        </CardContent>
      </Card>
    );
  }

  const statusCount = Object.values(StatusEnum).reduce((acc, status) => {
    acc[status] = relatos.filter((r) => r.status === status).length;
    return acc;
  }, {} as Record<StatusEnum, number>);

  const data = Object.entries(statusCount)
    .filter(([_, count]) => count > 0)
    .map(([status, count]) => ({
      name: STATUS_LABELS[status as StatusEnum],
      value: count,
      status: status as StatusEnum,
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição por Status</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={isMobile ? false : (props: any) => {
                  const name = props.name || '';
                  const percent = props.percent || 0;
                  return `${name}: ${(percent * 100).toFixed(0)}%`;
                }}
                outerRadius={isMobile ? 60 : 80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry) => (
                  <Cell key={`cell-${entry.status}`} fill={COLORS[entry.status]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend 
                layout={isMobile ? 'horizontal' : 'vertical'}
                wrapperStyle={{ 
                  fontSize: isMobile ? '10px' : '12px',
                  paddingTop: isMobile ? '10px' : '0'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            Nenhum dado disponível
          </div>
        )}
      </CardContent>
    </Card>
  );
}

