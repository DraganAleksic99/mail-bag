import { Router } from "express";
import { listContacts, createContact, deleteContact } from "../controllers/contactsCtrl";

const router = Router();

router.route("/contacts").get(listContacts).post(createContact);
router.delete("/contacts/:id", deleteContact);

export default router;
