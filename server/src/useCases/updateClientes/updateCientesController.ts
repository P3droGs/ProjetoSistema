import { Request, Response } from "express";
import { UpdateClientesUseCase } from "./updateClientesUseCase";


export class UpdateClientesController{
    constructor(
        private updateClientesUseCase: UpdateClientesUseCase
    ){}

    async handle (req: Request, res:Response): Promise <Response>{
         const { id } = req.params;
         const {email} = req.params;
         const {telefone} = req.params

          await this.updateClientesUseCase.execute({id, email, telefone});

    return res.status(204).send();
    }}