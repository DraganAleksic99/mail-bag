import { Router } from "express";
import { listMessages } from "../controllers/messagesCtrl";

const router = Router();

router.get("/mailboxes/:mailbox", listMessages);
router.get("/mailboxes/:mailbox/:folder", listMessages);

export default router;
