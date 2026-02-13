import { Pool } from "pg";
import {
  IClientesRepository,
  FindAllClientesParams,
  FindAllClientesResponse,
  CreateClienteDTO,
} from "../IClientesRepository";

export class ClientesRepository implements IClientesRepository {
  constructor(private pool: Pool) {}

  async findAll({
    offset,
    limit,
  }: FindAllClientesParams): Promise<FindAllClientesResponse> {
    const data = await this.pool.query(
      `
      SELECT id, nome, telefone, email
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

  async create({ nome, telefone, email }: CreateClienteDTO): Promise<void> {
    await this.pool.query(
      `
      INSERT INTO clientes (nome, telefone, email)
      VALUES ($1, $2, $3)
      `,
      [nome, telefone ?? null, email ?? null]
    );
  }

  async remove(id: string): Promise<void> {
    await this.pool.query(
      `DELETE FROM clientes WHERE id = $1`,
      [id]
    );
  }

 async update(id: string, nome?: string, telefone?: string, email?: string): Promise<void> {
    
  const fields: string[] = [];
  const values: any[] = [];
  let index = 1;

  if (nome !== undefined) {
    fields.push(`nome = $${index}`);
    values.push(nome);
    index++;
  }

  if (telefone !== undefined) {
    fields.push(`telefone = $${index}`);
    values.push(telefone);
    index++;
  }

  if (email !== undefined) {
    fields.push(`email = $${index}`);
    values.push(email);
    index++;
  }

  if (fields.length === 0) {
    return;
  }

  const query = `
    UPDATE clientes
    SET ${fields.join(", ")}
    WHERE id = $${index}
  `;

  values.push(id);

  await this.pool.query(query, values);
}
}