import * as path from "path";
const Datastore = require("nedb");

export interface IContact {
  _id?: number;
  name: string;
  email: string;
}

export class Worker {
  private db: Nedb;
  constructor() {
    this.db = new Datastore({
      filename: path.join(__dirname, "contacts.db"),
      autoload: true,
    });
  }

  public listContacts(): Promise<IContact[]> {
    return new Promise((resolve, reject) => {
      this.db.find({}, (error: Error, docs: IContact[]) => {
        if (error) {
          reject(error);
        } else {
          resolve(docs);
        }
      });
    });
  }

  public addContact(contact: IContact): Promise<IContact> {
    return new Promise((resolve, reject) => {
      this.db.insert(contact, (error: Error | null, newDoc: IContact) => {
        if (error) {
          reject(error);
        } else {
          resolve(newDoc);
        }
      });
    });
  }

  public deleteContact(ID: string): Promise<string | void> {
    return new Promise((resolve, reject) => {
      this.db.remove(
        { _id: ID },
        {},
        (error: Error | null, numRemoved: number) => {
          if (error) {
            reject(error);
          } else {
            resolve(String(numRemoved));
          }
        }
      );
    });
  }
}
