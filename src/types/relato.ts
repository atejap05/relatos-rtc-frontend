export enum StatusEnum {
  ABERTA = 'ABERTA',
  EM_ANDAMENTO = 'EM_ANDAMENTO',
  CONCLUIDA = 'CONCLUIDA',
  CANCELADA = 'CANCELADA',
}

export enum ResponsavelEnum {
  JOEL_ALVES = 'Joel Alves',
  RAFAEL_GUTZLAFF = 'Rafael Gutzlaff',
  ELISANE_RODOVANSKI = 'Elisane Rodovanski',
  HERMANO_TOSCANO = 'Hermano Toscano',
  THIAGO_PEREZ = 'Thiago Perez',
}

export enum AmbienteEnum {
  HOMOLOGACAO = 'Homologação',
  PRODUCAO = 'Produção',
}

export enum TipoRelatoEnum {
  ERRO = 'Erro',
  DUVIDA = 'Dúvida',
  SUGESTAO = 'Sugestão',
}

export interface Relato {
  numero_demanda: string;
  numero_relato: string;
  tipo_relato?: TipoRelatoEnum | null;
  ambiente?: AmbienteEnum | null;
  titulo_relato: string;
  descricao_relato: string;
  responsavel: ResponsavelEnum;
  status: StatusEnum;
  data_abertura: string;
  data_encerramento: string | null;
}

export interface RelatoCreate {
  numero_demanda?: string;
  numero_relato: string;
  tipo_relato?: TipoRelatoEnum;
  ambiente?: AmbienteEnum;
  titulo_relato: string;
  descricao_relato: string;
  responsavel: ResponsavelEnum;
  status?: StatusEnum;
}

export interface RelatoUpdate {
  numero_relato?: string;
  tipo_relato?: TipoRelatoEnum;
  ambiente?: AmbienteEnum;
  titulo_relato?: string;
  descricao_relato?: string;
  responsavel?: ResponsavelEnum;
  status?: StatusEnum;
  data_encerramento?: string | null;
}

export type Aba = 'Leiaute-RTC' | 'NFSe-Via' | 'Calculadora' | 'MAN';

export const ABAS: Aba[] = ['Leiaute-RTC', 'NFSe-Via', 'Calculadora', 'MAN'];

