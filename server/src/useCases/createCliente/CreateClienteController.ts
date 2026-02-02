import { Request, Response } from "express";
import { CreateClienteUseCase } from "./CreateClienteUseCase";

export class CreateClienteController {
  constructor(
    private createClienteUseCase: CreateClienteUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { nome, telefone, email } = request.body;

      await this.createClienteUseCase.execute({
        nome,
        telefone,
        email,
      });

      return response.status(201).send();
    } catch (error: any) {
      return response.status(400).json({
        message: error.message ?? "Erro ao criar cliente",
      });
    }
  }
}
