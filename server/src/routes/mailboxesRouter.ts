import { Router } from "express";
import { listMailboxes } from "../controllers/mailboxesCtrl";

const router = Router();

router.get("/mailboxes", listMailboxes);

export default router;