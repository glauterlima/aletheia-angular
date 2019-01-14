
export class Sistema {
  codigo: number;
}

export class Pessoa {
  codigo: number;
  nome: string;
  ativo: true;
  endereco = new Endereco();
  dadosFuncionais = new DadosFuncionais();
}

export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class DadosFuncionais {
  matricula: string;
  cargo: string;
  email: string;
  telefone: string;
}

export class Lote {
  codigo: number;
}

export class Demanda {
  codigo: number;
  nome: string;
  sistema = new Sistema();
  pessoa = new Pessoa();
  lote = new Lote();
  plataforma: string;
  tipo: string = 'EVOLUTIVA';
  totalPfBruto: number;
  totalPfLiquido: number;
  totalPfPlataforma: number;
  data: Date;
  status: string = 'EMANALISE';
  valor: number;
  observacao: string;
}
