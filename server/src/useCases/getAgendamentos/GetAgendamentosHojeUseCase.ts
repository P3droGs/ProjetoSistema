import { IAgendamentosRepository } from "../../repositories/IAgendamentosRepository";

export class GetAgendamentosHojeUseCase {
  constructor(
    private agendamentosRepository: IAgendamentosRepository
  ) {}

  async execute() {
    const agendamentos =
      await this.agendamentosRepository.findToday();

    return agendamentos;
  }
}
