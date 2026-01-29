

export interface FindAllBarbeirosParams {
  offset: number;
  limit: number;
}

export interface FindAllBarbeirosResponse {
  barbeiros: {
    id: string;
    nome: string;
  }[];
  total: number;
}

export interface IBarbeirosRepository {
  findAll(
    params: FindAllBarbeirosParams
  ): Promise<FindAllBarbeirosResponse>;

  remove(id: string): Promise<void>;
}



