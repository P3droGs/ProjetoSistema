import { IClientesRepository } from "../../repositories/IClientesRepository";


export class RemoveClienteUseCase {
  constructor(
    private clientesRepository: IClientesRepository
  ) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error("ID do cliente é obrigatório");
    }

    await this.clientesRepository.remove(id);
  }
}
