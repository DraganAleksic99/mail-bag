import { Router } from "express";
import { listContacts, createContact } from "../controllers/contactsCtrl";

const router = Router();

router.route("/contacts").get(listContacts).post(createContact);

export default router;
