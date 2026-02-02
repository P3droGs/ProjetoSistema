import { db } from "../../configs/db";
import { BarbeirosRepository } from "../../repositories/implementations/BarbeirosRepository";
import { CreateBarbeiroUseCase } from "./createBarbeiroUseCase";
import { CreateBarbeiroController } from "./CreateBarbeiroController";


const barbeirosRepository = new BarbeirosRepository(db);

const createBarbeiroUseCase = new CreateBarbeiroUseCase(
  barbeirosRepository
);

const createBarbeiroController = new CreateBarbeiroController(
  createBarbeiroUseCase
);

export { createBarbeiroController };
