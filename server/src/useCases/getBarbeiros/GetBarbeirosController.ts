import { Request, Response } from "express";
import { GetBarbeirosUseCase } from "../../useCases/getBarbeiros/GetBarbeirosUseCase";

export class GetBarbeirosController {
  constructor(
    private getBarbeirosUseCase: GetBarbeirosUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const offset = Number(req.query.offset) || 0;
      const limit = Number(req.query.limit) || 10;

      const result = await this.getBarbeirosUseCase.execute({
        offset,
        limit,
      });

      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Erro ao buscar barbeiros",
      });
    }
  }
}
