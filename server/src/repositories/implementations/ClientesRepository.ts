import { Pool } from "pg";
import {
  IClientesRepository,
  FindAllClientesParams,
  FindAllClientesResponse,
} from "..//iClientesRepository";

export class ClientesRepository implements IClientesRepository {
  constructor(private pool: Pool) {}

  async findAll({
    offset,
    limit,
  }: FindAllClientesParams): Promise<FindAllClientesResponse> {
    const data = await this.pool.query(
      `
      SELECT id, nome, telefone
      FROM clientes
      ORDER BY nome
      OFFSET $1 LIMIT $2
      `,
      [offset, limit]
    );

    const totalResult = await this.pool.query(
      `SELECT COUNT(*) FROM clientes`
    );

    return {
      clientes: data.rows,
      total: Number(totalResult.rows[0].count),
    };
  }
}
