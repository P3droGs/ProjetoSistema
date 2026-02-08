import { db } from "../../configs/db";
import { AgendamentosRepository } from "../../repositories/implementations/AgendamentosRepository";
import { GetAgendamentosHojeUseCase } from "./GetAgendamentosHojeUseCase";
import { AgendamentosController } from "./AgendamentosController";

const agendamentosRepository = new AgendamentosRepository(db);

const getAgendamentosUseCase = new GetAgendamentosHojeUseCase (
  agendamentosRepository
);

const getAgendamentosController = new AgendamentosController(
  getAgendamentosUseCase
);

export { getAgendamentosController };
