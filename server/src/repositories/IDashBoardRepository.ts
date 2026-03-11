export interface ProximoAgendamento {
  hora: string
  cliente: string
  servico: string
}

export interface DashboardResponse {
  total_clientes: number
  total_barbeiros: number
  total_agendamentos_hoje: number
  proximos_agendamentos: ProximoAgendamento[]
}

export interface IDashboardRepository {
  getDashboard(): Promise<DashboardResponse>
}