import { IClientesRepository } from "../../repositories/IClientesRepository";

interface UpdateClienteRequest {
  id: string;
  telefone?: string;
  email?: string;
}

export class UpdateClientesUseCase {
  constructor(
    private clientesRepository: IClientesRepository
  ) {}

  async execute({ id, telefone, email }: UpdateClienteRequest): Promise<void> {

    if (!id) {
      throw new Error("ID do cliente é obrigatório");
    }

    if (!telefone && !email) {
      throw new Error("Informe ao menos telefone ou email para atualizar");
    }

    await this.clientesRepository.update(id, telefone, email );
  }
}
