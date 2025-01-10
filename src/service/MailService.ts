import { Service } from "node-boot-core";
import { BootMail } from "node-boot-mail";

@Service("MailService")
export class MailService extends BootMail{
  constructor() {
    super()
  }
}
