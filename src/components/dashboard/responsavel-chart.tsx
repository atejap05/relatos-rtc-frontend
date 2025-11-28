'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type Relato } from '@/types/relato';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useMediaQuery } from '@/hooks/useMediaQuery';

interface ResponsavelChartProps {
  relatos: Relato[];
  isLoading?: boolean;
}

export function ResponsavelChart({ relatos, isLoading = false }: ResponsavelChartProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Relatos por Responsável</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] animate-pulse rounded bg-muted" />
        </CardContent>
      </Card>
    );
  }

  const responsavelCount = relatos.reduce((acc, relato) => {
    const responsavel = relato.responsavel || 'Não definido';
    acc[responsavel] = (acc[responsavel] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(responsavelCount)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10); // Top 10

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relatos por Responsável</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 500}>
            <BarChart data={data} margin={isMobile ? { top: 10, right: 5, left: 0, bottom: 60 } : { top: 25, right: 30, left: 20, bottom: 100 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={isMobile ? -90 : -45} 
                textAnchor="end" 
                height={isMobile ? 80 : 100}
                tick={{ fontSize: isMobile ? 10 : 12 }}
                interval={0}
              />
              <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: isMobile ? '10px' : '12px' }} />
              <Bar dataKey="value" fill="#3b82f6" name="Quantidade" />
            </BarChart>
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

