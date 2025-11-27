'use client';

import { KPICards } from '@/components/dashboard/kpi-cards';
import { StatusChart } from '@/components/dashboard/status-chart';
import { ResponsavelChart } from '@/components/dashboard/responsavel-chart';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500">Visão geral dos relatos de testes RTC</p>
      </div>

      <KPICards />

      <div className="grid gap-4 md:grid-cols-2">
        <StatusChart />
        <ResponsavelChart />
      </div>
    </div>
  );
}
