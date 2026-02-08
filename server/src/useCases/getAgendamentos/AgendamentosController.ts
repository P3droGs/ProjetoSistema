import { Request, Response } from "express";
import { GetAgendamentosHojeUseCase } from "./GetAgendamentosHojeUseCase"

export class AgendamentosController {
  constructor(
    private getAgendamentosUseCase: GetAgendamentosHojeUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const agendamentos = await this.getAgendamentosUseCase.execute();
    return response.json(agendamentos);
  }
}
