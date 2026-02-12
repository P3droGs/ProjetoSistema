export interface FindAllClientesParams {
  offset: number;
  limit: number;
}

export interface FindAllClientesResponse {
  clientes: {
    id: string;
    nome: string;
    telefone: string | null;
    email?: string | null;
  }[];
  total: number;
}

export interface CreateClienteDTO {
  nome: string;
  telefone?: string;
  email?: string;
}

export interface IClientesRepository {
  findAll(
    params: FindAllClientesParams
  ): Promise<FindAllClientesResponse>;

  create(
    data: CreateClienteDTO
  ): Promise<void>;

  remove(id: string): Promise<void>;

  update(id:string, telefone?:string, email?:string): Promise<void>;
}
