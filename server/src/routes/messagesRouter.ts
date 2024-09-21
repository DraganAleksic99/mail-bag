import { Router } from "express";
import { listMessages, listMessage } from "../controllers/messagesCtrl";

const router = Router();

router.get("/mailboxes/:mailbox", listMessages);
router.get("/mailboxes/:mailbox/:folder", listMessages);

router.route("/messages/:mailbox/:id").get(listMessage);
router.route("/messages/:mailbox/:folder/:id").get(listMessage);

export default router;
