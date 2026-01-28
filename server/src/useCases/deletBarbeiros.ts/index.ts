import { db } from "../../configs/db";
import { BarbeirosRepository } from "../../repositories/implementations/BarbeirosRepository";
import { DeleteBarbeiroUseCase } from "./DeleteBarbeirosUseCase";
import { DeleteBarbeiroController } from "./DeleteBarbeirosController";

const barbeirosRepository = new BarbeirosRepository(db);

const deleteBarbeiroUseCase = new DeleteBarbeiroUseCase(barbeirosRepository);
const deleteBarbeiroController = new DeleteBarbeiroController(
  deleteBarbeiroUseCase
);

export { deleteBarbeiroController };
