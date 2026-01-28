import { Request, Response } from "express";
import { DeleteBarbeiroUseCase } from "./DeleteBarbeirosUseCase";

export class DeleteBarbeiroController {
  constructor(
    private deleteBarbeiroUseCase: DeleteBarbeiroUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      await this.deleteBarbeiroUseCase.execute(id);

      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Erro ao remover barbeiro",
      });
    }
  }
}
