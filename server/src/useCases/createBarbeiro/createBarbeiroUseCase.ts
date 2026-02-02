import { IBarbeirosRepository } from "../../repositories/IBarbeirosRepository";

interface CreateBarbeiroDTO {
  nome: string;
}

export class CreateBarbeiroUseCase {
  constructor(
    private barbeirosRepository: IBarbeirosRepository
  ) {}

  async execute({ nome }: CreateBarbeiroDTO) {
    if (!nome || nome.trim() === "") {
      throw new Error("Nome é obrigatório");
    }

    await this.barbeirosRepository.create({ nome });
  }
}
