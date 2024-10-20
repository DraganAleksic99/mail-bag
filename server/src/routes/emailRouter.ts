import { Router } from "express";
import { summarizeEmail, composeEmail } from "../controllers/emailCtrl";
const router = Router();

router.post("/email/summary", summarizeEmail);
router.post("/email/compose", composeEmail);

export default router;