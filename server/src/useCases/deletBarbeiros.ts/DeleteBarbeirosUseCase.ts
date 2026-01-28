import { IBarbeirosRepository } from "../../repositories/IBarbeirosRepository";

export class DeleteBarbeiroUseCase {
  constructor(
    private barbeirosRepository: IBarbeirosRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.barbeirosRepository.remove(id);
  }
}