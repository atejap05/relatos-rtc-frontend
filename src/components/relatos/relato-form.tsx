"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  StatusEnum,
  ResponsavelEnum,
  AmbienteEnum,
  TipoRelatoEnum,
  type Relato,
  type RelatoCreate,
  type RelatoUpdate,
} from "@/types/relato";
import { useCreateRelato, useUpdateRelato } from "@/hooks/useRelatos";
import { useRouter } from "next/navigation";

const relatoSchema = z.object({
  numero_demanda: z.string().optional(),
  numero_relato: z.string().min(1, "Número do relato é obrigatório"),
  tipo_relato: z.nativeEnum(TipoRelatoEnum).optional(),
  ambiente: z.nativeEnum(AmbienteEnum).optional(),
  titulo_relato: z
    .string()
    .min(1, "Título é obrigatório")
    .max(255, "Título muito longo"),
  descricao_relato: z.string().min(1, "Descrição é obrigatória"),
  responsavel: z.nativeEnum(ResponsavelEnum),
  status: z.nativeEnum(StatusEnum),
});

type RelatoFormValues = z.infer<typeof relatoSchema>;

interface RelatoFormProps {
  relato?: Relato;
  mode: "create" | "edit";
  aba: string;
}

export function RelatoForm({ relato, mode, aba }: RelatoFormProps) {
  const router = useRouter();
  const createRelato = useCreateRelato(aba);
  const updateRelato = useUpdateRelato(aba);

  const form = useForm<RelatoFormValues>({
    resolver: zodResolver(relatoSchema),
    defaultValues: relato
      ? {
          numero_demanda: relato.numero_demanda,
          numero_relato: relato.numero_relato,
          tipo_relato: relato.tipo_relato || TipoRelatoEnum.ERRO,
          ambiente: relato.ambiente || AmbienteEnum.HOMOLOGACAO,
          titulo_relato: relato.titulo_relato,
          descricao_relato: relato.descricao_relato,
          responsavel: relato.responsavel,
          status: relato.status,
        }
      : {
          numero_demanda: "",
          numero_relato: "",
          tipo_relato: TipoRelatoEnum.ERRO,
          ambiente: AmbienteEnum.HOMOLOGACAO,
          titulo_relato: "",
          descricao_relato: "",
          responsavel: ResponsavelEnum.JOEL_ALVES,
          status: StatusEnum.ABERTA,
        },
  });

  const onSubmit = async (data: RelatoFormValues) => {
    if (mode === "create") {
      const createData: RelatoCreate = {
        numero_demanda: data.numero_demanda && data.numero_demanda.trim() !== "" ? data.numero_demanda : undefined,
        numero_relato: data.numero_relato,
        tipo_relato: data.tipo_relato || TipoRelatoEnum.ERRO,
        ambiente: data.ambiente || AmbienteEnum.HOMOLOGACAO,
        titulo_relato: data.titulo_relato,
        descricao_relato: data.descricao_relato,
        responsavel: data.responsavel,
        status: data.status,
      };
      createRelato.mutate(createData, {
        onSuccess: () => {
          router.push(`/${aba}`);
        },
      });
    } else if (relato) {
      const updateData: RelatoUpdate = {
        numero_relato: data.numero_relato,
        tipo_relato: data.tipo_relato || undefined,
        ambiente: data.ambiente,
        titulo_relato: data.titulo_relato,
        descricao_relato: data.descricao_relato,
        responsavel: data.responsavel,
        status: data.status,
      };
      updateRelato.mutate(
        { numeroRelato: relato.numero_relato, data: updateData },
        {
          onSuccess: () => {
            router.push(`/${aba}`);
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
                    disabled={mode === "edit"}
                  />
                </FormControl>
                <FormDescription>
                  Identificador único da demanda (opcional - será gerado automaticamente se não informado)
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

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="tipo_relato"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo do Relato</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={TipoRelatoEnum.ERRO}>Erro</SelectItem>
                    <SelectItem value={TipoRelatoEnum.DUVIDA}>
                      Dúvida
                    </SelectItem>
                    <SelectItem value={TipoRelatoEnum.SUGESTAO}>
                      Sugestão
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ambiente"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ambiente</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o ambiente" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={AmbienteEnum.HOMOLOGACAO}>
                      Homologação
                    </SelectItem>
                    <SelectItem value={AmbienteEnum.PRODUCAO}>
                      Produção
                    </SelectItem>
                  </SelectContent>
                </Select>
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
                <Input
                  placeholder="Título descritivo do problema..."
                  {...field}
                />
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o responsável" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={ResponsavelEnum.JOEL_ALVES}>
                      Joel Alves
                    </SelectItem>
                    <SelectItem value={ResponsavelEnum.RAFAEL_GUTZLAFF}>
                      Rafael Gutzlaff
                    </SelectItem>
                    <SelectItem value={ResponsavelEnum.ELISANE_RODOVANSKI}>
                      Elisane Rodovanski
                    </SelectItem>
                    <SelectItem value={ResponsavelEnum.HERMANO_TOSCANO}>
                      Hermano Toscano
                    </SelectItem>
                    <SelectItem value={ResponsavelEnum.THIAGO_PEREZ}>
                      Thiago Perez
                    </SelectItem>
                  </SelectContent>
                </Select>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={StatusEnum.ABERTA}>Aberta</SelectItem>
                    <SelectItem value={StatusEnum.EM_ANDAMENTO}>
                      Em Andamento
                    </SelectItem>
                    <SelectItem value={StatusEnum.CONCLUIDA}>
                      Concluída
                    </SelectItem>
                    <SelectItem value={StatusEnum.CANCELADA}>
                      Cancelada
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={createRelato.isPending || updateRelato.isPending}
          >
            {mode === "create" ? "Criar" : "Salvar"} Relato
          </Button>
        </div>
      </form>
    </Form>
  );
}
