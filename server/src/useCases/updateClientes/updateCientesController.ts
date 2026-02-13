import { Request, Response } from "express";
import { UpdateClientesUseCase } from "./updateClientesUseCase";

export class UpdateClientesController {
  constructor(
    private updateClientesUseCase: UpdateClientesUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nome, email, telefone } = req.body; // ✅ AGORA VEM DO BODY

    await this.updateClientesUseCase.execute({
      id,
      nome,
      email,
      telefone
    });

    return res.status(204).send();
  }
}
