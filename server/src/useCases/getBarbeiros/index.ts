import { db } from "../../configs/db";
import { BarbeirosRepository } from "../../repositories/implementations/BarbeirosRepository";
import { GetBarbeirosUseCase } from "./GetBarbeirosUseCase";
import { GetBarbeirosController } from "../../useCases/getBarbeiros/GetBarbeirosController";

const barbeirosRepository = new BarbeirosRepository(db);
const getBarbeirosUseCase = new GetBarbeirosUseCase(barbeirosRepository);
const getBarbeirosController = new GetBarbeirosController(
  getBarbeirosUseCase
);

export { getBarbeirosController };
