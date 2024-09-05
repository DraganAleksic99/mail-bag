import { Router } from "express";
import { listMessages } from "../controllers/messagesCtrl";

const router = Router();

router.get("/mailboxes/:mailbox", listMessages);

export default router;
