import { IClientesRepository } from "../../repositories/IClientesRepository";

interface UpdateClienteRequest {
  id: string;
  nome?: string;
  telefone?: string;
  email?: string;
}

export class UpdateClientesUseCase {
  constructor(
    private clientesRepository: IClientesRepository
  ) {}

async execute({ id, nome, telefone, email }: UpdateClienteRequest): Promise<void> {


    if (!id) {
      throw new Error("ID do cliente é obrigatório");
    }

    if (!nome && !telefone && !email) {
  throw new Error("Informe ao menos um campo para atualizar");
}


  await this.clientesRepository.update(id, nome, telefone, email);
  }
}
