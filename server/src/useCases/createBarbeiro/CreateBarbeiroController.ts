import { Request, Response } from "express";
import { CreateBarbeiroUseCase } from "./createBarbeiroUseCase";
import "dotenv/config";

export class CreateBarbeiroController {
  constructor(
    private createBarbeiroUseCase: CreateBarbeiroUseCase
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { nome } = req.body;

      await this.createBarbeiroUseCase.execute({ nome });

      return res.status(201).send();
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}
