import { Router } from "express";
import {
  listMessages,
  listMessage,
  deleteMessage,
} from "../controllers/messagesCtrl";

const router = Router();

router.get("/mailboxes/:mailbox", listMessages);
router.get("/mailboxes/:mailbox/:folder", listMessages);

router.route("/messages/:mailbox/:id")
  .get(listMessage)
  .delete(deleteMessage);
  
router
  .route("/messages/:mailbox/:folder/:id")
  .get(listMessage)
  .delete(deleteMessage);

export default router;
