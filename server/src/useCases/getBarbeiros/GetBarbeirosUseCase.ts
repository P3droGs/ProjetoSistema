import { IBarbeirosRepository } from "../../repositories/IBarbeirosRepository";
import { GetBarbeirosDTO } from "./GetBarbeirosDTO";

export class GetBarbeirosUseCase {
  constructor(
    private barbeirosRepository: IBarbeirosRepository
  ) {}

  async execute(params: GetBarbeirosDTO) {
    const result = await this.barbeirosRepository.findAll({
      offset: params.offset,
      limit: params.limit,
    });

    const nextOffset = params.offset + params.limit;
    const prevOffset = Math.max(0, params.offset - params.limit);

    return {
      barbeiros: result.barbeiros,
      total: result.total,
      offset: params.offset,
      limit: params.limit,
      nextOffset,
      prevOffset,
    };
  }
}
