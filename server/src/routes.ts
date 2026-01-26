import { Router, Request, Response } from "express";
import { getBarbeirosController } from "./useCases/getBarbeiros";
import { getClientesController } from "./useCases/getClientes";

const router = Router();

router.get("/barbeiros", (req: Request, res: Response) => {
  return getBarbeirosController.handle(req, res);
});
router.get("/clientes", (req: Request, res: Response) => {
  return getClientesController.handle(req, res);
});


export default router;