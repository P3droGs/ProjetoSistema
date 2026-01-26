export interface FindAllBarbeirosParams {
  offset: number;
  limit: number;
}

export interface FindAllBarbeirosResponse {
  barbeiros: {
    id: number;
    nome: string;
  }[];
  total: number;
}

export interface IBarbeirosRepository {
  findAll(
    params: FindAllBarbeirosParams
  ): Promise<FindAllBarbeirosResponse>;
}
