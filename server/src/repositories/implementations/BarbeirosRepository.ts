import { Pool } from "pg";
import {
  IBarbeirosRepository,
  FindAllBarbeirosParams,
  FindAllBarbeirosResponse,
} from "../IBarbeirosRepository";

export class BarbeirosRepository implements IBarbeirosRepository {
  constructor(private pool: Pool) {}

  async findAll({
    offset,
    limit,
  }: FindAllBarbeirosParams): Promise<FindAllBarbeirosResponse> {
    const data = await this.pool.query(
      `
      SELECT id, nome
      FROM barbeiros
      ORDER BY nome
      OFFSET $1 LIMIT $2
      `,
      [offset, limit]
    );

    const totalResult = await this.pool.query(
      `SELECT COUNT(*) FROM barbeiros`
    );

    return {
      barbeiros: data.rows,
      total: Number(totalResult.rows[0].count),
    };
  }
}
