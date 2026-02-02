import { db } from "../../configs/db";
import { ClientesRepository } from "../../repositories/implementations/ClientesRepository";
import { RemoveClienteUseCase } from "./RemoveClienteUseCase";
import { RemoveClienteController } from "./RemoveClienteController";

const clientesRepository = new ClientesRepository(db);

const removeClienteUseCase = new RemoveClienteUseCase(
  clientesRepository
);

const removeClienteController = new RemoveClienteController(
  removeClienteUseCase
);

export { removeClienteController };
