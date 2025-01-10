import { Repository } from "node-boot-core";
import { BaseRepository, commonAttributes } from "../database";
import { Contact } from "../model/Contact";

@Repository("ContactRepository")
export class ContactRepository extends BaseRepository<Contact> {
  constructor() {
    super(Contact);
  }

  attributes = [
    ...commonAttributes,
    "contactName",
    "contactEmail",
    "contactPhone",
    "contactWebsite",
    "contactSubject",
    "contactMessage",
  ];
}
