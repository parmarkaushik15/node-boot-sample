import { Service } from "node-boot-core";

@Service("UserService")
export class UserService {
  public name(params: any) {
    return params;
  }
}
