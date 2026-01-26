import { db } from "../../configs/db";
import { ClientesRepository } from "../../repositories/implementations/ClientesRepository";
import { GetClientesUseCase } from "./GetClientesUseCase";
import { GetClientesControler } from "./GetClientesController";

const clientesRepository = new ClientesRepository(db);
const getClientesUseCase = new GetClientesUseCase(clientesRepository);
const getClientesController = new GetClientesControler(
  getClientesUseCase
);

export { getClientesController };
