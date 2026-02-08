import { Pool } from "pg";
import { IAgendamentosRepository } from "../IAgendamentosRepository";

export class AgendamentosRepository implements IAgendamentosRepository {
  constructor(private db: Pool) {}

  async findToday(): Promise<any[]> {
    const { rows } = await this.db.query(`
      SELECT
        a.id,
        a.data,
        a.hora_inicio,
        a.hora_fim,
        a.status,

        c.nome AS cliente,
        b.nome AS barbeiro,
        s.nome AS servico,
        s.preco

      FROM agendamentos a
      LEFT JOIN clientes c ON c.id = a.cliente_id
      LEFT JOIN barbeiros b ON b.id = a.barbeiro_id
      LEFT JOIN servicos s ON s.id = a.servico_id

      WHERE a.data = CURRENT_DATE
        AND a.status <> 'cancelado'
      ORDER BY a.hora_inicio
    `);

    return rows;
  }
}
