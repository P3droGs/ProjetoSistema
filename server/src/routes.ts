import { Router, Request, Response } from "express";
import { getBarbeirosController } from "./useCases/getBarbeiros";
import { getClientesController } from "./useCases/getClientes";
import { deleteBarbeiroController } from "./useCases/deletBarbeiros.ts";
import { createBarbeiroController } from "./useCases/createBarbeiro";
import { createClienteController } from "./useCases/createCliente";
import { removeClienteController } from "./useCases/removeCliente";
const router = Router();

router.delete("/barbeiros/:id", (req, res) =>
  deleteBarbeiroController.handle(req, res)
);
router.get("/barbeiros", (req: Request, res: Response) => {
  return getBarbeirosController.handle(req, res);
});
router.get("/clientes", (req: Request, res: Response) => {
  return getClientesController.handle(req, res);
});
router.post("/barbeiros", (req, res) =>
  createBarbeiroController.handle(req, res)
);
router.post("/clientes", (req, res) => {
  return createClienteController.handle(req, res);
});
router.delete("/clientes/:id", (req, res) =>
  removeClienteController.handle(req, res)
);
export default router;