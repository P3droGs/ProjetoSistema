import { IClientesRepository } from "../../repositories/IClientesRepository";
import { GetClientesDTO } from "./GetClientesDTO";

export class GetClientesUseCase {
  constructor(
    private clientesRepository: IClientesRepository
  ) {}

  async execute(params: GetClientesDTO) {
    const result = await this.clientesRepository.findAll({
      offset: params.offset,
      limit: params.limit,
    });

    const nextOffset = params.offset + params.limit;
    const prevOffset = Math.max(0, params.offset - params.limit);

    return {
      clientes: result.clientes,
      total: result.total,
      offset: params.offset,
      limit: params.limit,
      nextOffset,
      prevOffset,
    };
  }
}
