export interface FindAllClientesParams {
  offset: number;
  limit: number;
}

export interface FindAllClientesResponse {
  clientes: {
    id: number;
    nome: string;
    telefone: string;
  }[];
  total: number;
}

export interface IClientesRepository {
  findAll(
    params: FindAllClientesParams
  ): Promise<FindAllClientesResponse>;
}
