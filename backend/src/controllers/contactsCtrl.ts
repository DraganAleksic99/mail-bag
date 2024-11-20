import { Request, Response } from "express";
import * as Contacts from "../lib/Contacts";
import { IContact } from "../lib/Contacts";

const listContacts = async (_req: Request, res: Response) => {
  try {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contacts: IContact[] = await contactsWorker.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(400).json({ error: `Error: \n ${error}` });
  }
};

const createContact = async (req: Request, res: Response) => {
  try {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    const contact: IContact = await contactsWorker.addContact(req.body);
    res.status(200).json({
      message: "Contact created successfully!",
    });
  } catch (error) {
    res.status(400).json({ error: `Error: \n ${error}` });
  }
};

const deleteContact = async (req: Request, res: Response) => {
  try {
    const contactsWorker: Contacts.Worker = new Contacts.Worker();
    await contactsWorker.deleteContact(req.params.id);
    res.status(200).json({
      message: "Contact deleted successfully!"
    });
  } catch (error) {
    res.status(400).json({ error: `Error: \n ${error}` });
  }
};

export { listContacts, createContact, deleteContact };
