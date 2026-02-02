import { Request, Response } from "express";
import { RemoveClienteUseCase } from "./RemoveClienteUseCase";

export class RemoveClienteController {
  constructor(
    private removeClienteUseCase: RemoveClienteUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await this.removeClienteUseCase.execute(id);

    return res.status(204).send();
  }
}
