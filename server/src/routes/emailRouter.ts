import { Router } from "express";
import { summarizeEmail } from "../controllers/emailCtrl";
const router = Router();

router.post("/email/summary", summarizeEmail);

export default router;