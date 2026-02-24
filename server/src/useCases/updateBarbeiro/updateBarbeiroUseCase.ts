import { IBarbeirosRepository } from "../../repositories/IBarbeirosRepository"

interface UpdateBarbeirosRequest {
  id: string;
  nome: string;
}

export class UpdateBarbeirosUseCase {
  constructor(
    private barbeirosRepository: IBarbeirosRepository
  ) {}

  async execute({ id, nome }: UpdateBarbeirosRequest): Promise<void> {

    if (!id) {
      throw new Error("ID do cliente é obrigatório");
    }

    if (!nome) {
      throw new Error("Informe ao menos um campo para atualizar");
    }

    await this.barbeirosRepository.update(id, nome);
  }
}