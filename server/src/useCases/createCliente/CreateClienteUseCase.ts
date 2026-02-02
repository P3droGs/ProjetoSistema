import { IClientesRepository } from "../../repositories/IClientesRepository";

interface CreateClienteRequest {
  nome: string;
  telefone?: string;
  email?: string;
}

export class CreateClienteUseCase {
  constructor(
    private clientesRepository: IClientesRepository
  ) {}

  async execute({ nome, telefone, email }: CreateClienteRequest): Promise<void> {
    // validação forte
    if (!nome || typeof nome !== "string") {
      throw new Error("Nome do cliente é obrigatório e deve ser uma string");
    }

    if (nome.trim().length < 2) {
      throw new Error("Nome do cliente muito curto");
    }

    await this.clientesRepository.create({
      nome: nome.trim(),
      telefone,
      email,
    });
  }
}
