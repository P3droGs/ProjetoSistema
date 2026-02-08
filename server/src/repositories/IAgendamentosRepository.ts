export interface IAgendamentosRepository {
  findToday(): Promise<any[]>;
}