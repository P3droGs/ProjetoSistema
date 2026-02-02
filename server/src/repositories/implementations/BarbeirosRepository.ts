import { Pool } from "pg";
import {
  IBarbeirosRepository,
  FindAllBarbeirosParams,
  FindAllBarbeirosResponse,
  CreateBarbeiroDTO,
} from "../IBarbeirosRepository";

export class BarbeirosRepository implements IBarbeirosRepository {
  constructor(private pool: Pool) {}

  async findAll({ offset, limit }: FindAllBarbeirosParams)
    : Promise<FindAllBarbeirosResponse> {

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

  async remove(id: string): Promise<void> {
    await this.pool.query(
      `DELETE FROM barbeiros WHERE id = $1`,
      [id]
    );
  }

  async create({ nome }: CreateBarbeiroDTO): Promise<void> {
    await this.pool.query(
      `INSERT INTO barbeiros (nome) VALUES ($1)`,
      [nome]
    );
  }
}
