'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RelatoForm } from '@/components/relatos/relato-form';

export default function NovoRelatoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Novo Relato</h1>
        <p className="text-gray-500">Crie um novo relato de teste RTC</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Relato</CardTitle>
        </CardHeader>
        <CardContent>
          <RelatoForm mode="create" />
        </CardContent>
      </Card>
    </div>
  );
}

