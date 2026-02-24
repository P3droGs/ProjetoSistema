import { Request, Response } from "express";
import { UpdateBarbeirosUseCase } from "./updateBarbeiroUseCase";


export class UpdateBarbeirosController {
  constructor(
    private updateBarbeiroUseCase: UpdateBarbeirosUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nome } = req.body; 

    await this.updateBarbeiroUseCase.execute({
      id,
      nome,

    });

    return res.status(204).send();
  }
}
