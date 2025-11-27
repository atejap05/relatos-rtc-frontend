'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StatusEnum, type Relato, type RelatoCreate, type RelatoUpdate } from '@/types/relato';
import { useCreateRelato, useUpdateRelato } from '@/hooks/useRelatos';
import { useRouter } from 'next/navigation';

const relatoSchema = z.object({
  numero_demanda: z.string().min(1, 'Número da demanda é obrigatório'),
  numero_relato: z.string().min(1, 'Número do relato é obrigatório'),
  titulo_relato: z.string().min(1, 'Título é obrigatório').max(255, 'Título muito longo'),
  descricao_relato: z.string().min(1, 'Descrição é obrigatória'),
  responsavel: z.string().min(1, 'Responsável é obrigatório').max(100, 'Nome muito longo'),
  status: z.nativeEnum(StatusEnum),
});

type RelatoFormValues = z.infer<typeof relatoSchema>;

interface RelatoFormProps {
  relato?: Relato;
  mode: 'create' | 'edit';
}

export function RelatoForm({ relato, mode }: RelatoFormProps) {
  const router = useRouter();
  const createRelato = useCreateRelato();
  const updateRelato = useUpdateRelato();

  const form = useForm<RelatoFormValues>({
    resolver: zodResolver(relatoSchema),
    defaultValues: relato
      ? {
          numero_demanda: relato.numero_demanda,
          numero_relato: relato.numero_relato,
          titulo_relato: relato.titulo_relato,
          descricao_relato: relato.descricao_relato,
          responsavel: relato.responsavel,
          status: relato.status,
        }
      : {
          numero_demanda: '',
          numero_relato: '',
          titulo_relato: '',
          descricao_relato: '',
          responsavel: '',
          status: StatusEnum.ABERTA,
        },
  });

  const onSubmit = async (data: RelatoFormValues) => {
    if (mode === 'create') {
      const createData: RelatoCreate = {
        numero_demanda: data.numero_demanda,
        numero_relato: data.numero_relato,
        titulo_relato: data.titulo_relato,
        descricao_relato: data.descricao_relato,
        responsavel: data.responsavel,
        status: data.status,
      };
      createRelato.mutate(createData, {
        onSuccess: () => {
          router.push('/relatos');
        },
      });
    } else if (relato) {
      const updateData: RelatoUpdate = {
        numero_relato: data.numero_relato,
        titulo_relato: data.titulo_relato,
        descricao_relato: data.descricao_relato,
        responsavel: data.responsavel,
        status: data.status,
      };
      updateRelato.mutate(
        { numeroDemanda: relato.numero_demanda, data: updateData },
        {
          onSuccess: () => {
            router.push('/relatos');
          },
        }
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="numero_demanda"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número da Demanda</FormLabel>
                <FormControl>
                  <Input
                    placeholder="DEM-001"
                    {...field}
                    disabled={mode === 'edit'}
                  />
                </FormControl>
                <FormDescription>
                  Identificador único da demanda (não pode ser alterado)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numero_relato"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número do Relato</FormLabel>
                <FormControl>
                  <Input placeholder="RTC-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="titulo_relato"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título do Relato</FormLabel>
              <FormControl>
                <Input placeholder="Título descritivo do problema..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descricao_relato"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva detalhadamente o problema, contexto e requisitos..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="responsavel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsável</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do responsável" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={StatusEnum.ABERTA}>Aberta</SelectItem>
                    <SelectItem value={StatusEnum.EM_ANDAMENTO}>Em Andamento</SelectItem>
                    <SelectItem value={StatusEnum.CONCLUIDA}>Concluída</SelectItem>
                    <SelectItem value={StatusEnum.CANCELADA}>Cancelada</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={createRelato.isPending || updateRelato.isPending}>
            {mode === 'create' ? 'Criar' : 'Salvar'} Relato
          </Button>
        </div>
      </form>
    </Form>
  );
}

