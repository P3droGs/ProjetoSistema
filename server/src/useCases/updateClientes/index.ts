import { db } from "../../configs/db";
import { ClientesRepository } from "../../repositories/implementations/ClientesRepository";
import { UpdateClientesController } from "./updateCientesController";
import { UpdateClientesUseCase } from "./updateClientesUseCase";

const clientesRepository = new ClientesRepository(db);

const updateClientesUseCase = new UpdateClientesUseCase(
    clientesRepository
);
const updateClientesController = new UpdateClientesController(
    updateClientesUseCase
);

export {updateClientesController}