import { Router } from "express";
import * as BruxoController from '../controllers/bruxoController.js'

const router = Router();

//Rota GetAll em /
router.get("/", BruxoController.listarTodos)
//Rota GetById em /:id
router.get("/:id", BruxoController.listarUm)


export default router;