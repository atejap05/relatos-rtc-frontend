'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RelatoForm } from '@/components/relatos/relato-form';
import { useParams, notFound } from 'next/navigation';
import { ABAS, type Aba } from '@/types/relato';

export default function NovoRelatoPage() {
  const params = useParams();
  const aba = params.aba as string;
  
  // Validar se a aba existe
  if (!ABAS.includes(aba as Aba)) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Novo Relato - {aba}</h1>
        <p className="text-muted-foreground">Crie um novo relato de teste RTC na aba {aba}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Relato</CardTitle>
        </CardHeader>
        <CardContent>
          <RelatoForm mode="create" aba={aba} />
        </CardContent>
      </Card>
    </div>
  );
}

