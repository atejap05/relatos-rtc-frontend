'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RelatoForm } from '@/components/relatos/relato-form';

const ABA_PADRAO = 'Leiaute-RTC';

export default function NovoRelatoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Novo Relato - {ABA_PADRAO}</h1>
        <p className="text-muted-foreground">Crie um novo relato de teste RTC na aba {ABA_PADRAO}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Relato</CardTitle>
        </CardHeader>
        <CardContent>
          <RelatoForm mode="create" aba={ABA_PADRAO} />
        </CardContent>
      </Card>
    </div>
  );
}

