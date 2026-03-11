import { Pool } from "pg"
import {
  IDashboardRepository,
  DashboardResponse
} from "../IDashBoardRepository"

export class DashboardRepository implements IDashboardRepository {

  constructor(private pool: Pool) {}

  async getDashboard(): Promise<DashboardResponse> {

    const result = await this.pool.query(`
      SELECT
        (SELECT COUNT(*) FROM clientes) AS total_clientes,

        (SELECT COUNT(*) FROM barbeiros WHERE ativo = true)
        AS total_barbeiros,

        (SELECT COUNT(*) FROM agendamentos
         WHERE data = CURRENT_DATE)
        AS total_agendamentos_hoje,

        (
          SELECT json_agg(
            json_build_object(
              'hora', a.hora_inicio,
              'cliente', c.nome,
              'servico', s.nome
            )
          )
          FROM agendamentos a
          LEFT JOIN clientes c
            ON c.id = a.cliente_id
          LEFT JOIN servicos s
            ON s.id = a.servico_id
          WHERE a.data = CURRENT_DATE
          ORDER BY a.hora_inicio
        ) AS proximos_agendamentos
    `)

    const row = result.rows[0]

    return {
      total_clientes: Number(row.total_clientes),
      total_barbeiros: Number(row.total_barbeiros),
      total_agendamentos_hoje: Number(row.total_agendamentos_hoje),
      proximos_agendamentos: row.proximos_agendamentos ?? []
    }
  }
}