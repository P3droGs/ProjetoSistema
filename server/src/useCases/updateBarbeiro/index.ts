import { db } from "../../configs/db";
import { BarbeirosRepository } from "../../repositories/implementations/BarbeirosRepository";
import { UpdateBarbeirosController } from "./updateBarbeiroController";
import { UpdateBarbeirosUseCase } from "./updateBarbeiroUseCase";

const barbeirosRepository = new BarbeirosRepository(db);

const updateBarbeiroUseCase = new UpdateBarbeirosUseCase(
    barbeirosRepository
);
const updateBarbeiroController = new UpdateBarbeirosController(
    updateBarbeiroUseCase
);

export {updateBarbeiroController}