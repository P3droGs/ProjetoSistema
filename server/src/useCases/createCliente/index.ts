import { db } from "../../configs/db";
import { ClientesRepository } from "../../repositories/implementations/ClientesRepository";
import { CreateClienteUseCase } from "./CreateClienteUseCase";
import { CreateClienteController } from "./CreateClienteController";

const clientesRepository = new ClientesRepository(db);

const createClienteUseCase = new CreateClienteUseCase(
  clientesRepository
);

const createClienteController = new CreateClienteController(
  createClienteUseCase
);

export { createClienteController };
